import { env } from "@/env.config";
import { userSchema, userUpdatePassword } from "../schemas";
import { generalMiddleware, sessionMiddleware } from "@/lib/middlwares";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";

const app = new Hono()
  .get("/", sessionMiddleware, generalMiddleware, async (c) => {
    try {
      const database = c.get("databases");
      const auth = c.get("users");

      const users = await database.listDocuments(
        env.DATABASE_ID,
        env.USERS_ID,
        []
      );

      const registeredUsers = await auth.list();

      users.documents = users.documents.map((user) => {
        const matchingUser = registeredUsers.users.find(
          (registeredUser) => registeredUser.$id === user.user_id
        );

        return {
          ...user,
          labels: matchingUser ? matchingUser.labels : [],
        };
      });

      return c.json({ users: users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return c.json({ success: false, message: (error as Error).message }, 500);
    }
  })
  .get("/current", sessionMiddleware, async (c) => {
    const user = c.get("user");

    const database = c.get("databases");
    const response = await database.listDocuments(
      env.DATABASE_ID,
      env.USERS_ID,
      [Query.equal("user_id", user.$id)]
    );

    return c.json({ users: response.documents });
  })
  .post(
    "/update-image",
    sessionMiddleware,
    zValidator("form", userSchema),
    async (c) => {
      try {
        const { image } = c.req.valid("form");
        const storage = c.get("storage");
        const user = c.get("user");
        const databases = c.get("databases");

        let uploadedImageId: string | undefined;

        if (image instanceof File) {
          const fileExt = image.name.split(".").at(-1) ?? "png";
          const fileName = `${ID.unique()}.${fileExt}`;

          const renamedImage = new File([image], fileName, {
            type: image.type,
          });
          const file = await storage.createFile(
            env.IMAGES_BUCKET_ID,
            ID.unique(),
            renamedImage
          );

          uploadedImageId = file.$id;

          const document = await databases.listDocuments(
            env.DATABASE_ID,
            env.USERS_ID,
            [Query.equal("user_id", user.$id)]
          );

          // Delete previous image
          if (document.documents[0].imageId) {
            await storage.deleteFile(
              env.IMAGES_BUCKET_ID, // bucketId
              document.documents[0].imageId // fileId
            );
          }

          await databases.updateDocument(
            env.DATABASE_ID,
            env.USERS_ID,
            document.documents[0].$id,
            {
              imageId: uploadedImageId,
            }
          );
        }

        return c.json({ success: true });
      } catch (error) {
        if ((error as { code?: number }).code === 401) {
          return c.json(
            {
              success: false,
              message: "User not authenticated. Please log in.",
            },
            401
          );
        }
        return c.json(
          { success: false, message: (error as Error).message },
          500
        );
      }
    }
  )
  .post(
    "/update-name",
    sessionMiddleware,
    zValidator("json", userSchema),
    async (c) => {
      try {
        const { name } = c.req.valid("json");
        const account = c.get("account");
        await account.updateName(name);

        return c.json({ success: true });
      } catch (error) {
        if ((error as { code?: number }).code === 401) {
          return c.json(
            {
              success: false,
              message: "User not authenticated. Please log in.",
            },
            401
          );
        }
        return c.json(
          { success: false, message: (error as Error).message },
          500
        );
      }
    }
  )
  .post(
    "/update-email",
    sessionMiddleware,
    zValidator("json", userSchema),
    async (c) => {
      try {
        const { email, password } = c.req.valid("json");
        const account = c.get("account");

        await account.updateEmail(email, password);

        return c.json({ success: true });
      } catch (error) {
        if ((error as { code?: number }).code === 401) {
          return c.json(
            {
              success: false,
              message: "User not authenticated. Please log in.",
            },
            401
          );
        }
        return c.json(
          { success: false, message: (error as Error).message },
          500
        );
      }
    }
  )
  .post(
    "/update-password",
    sessionMiddleware,
    zValidator("json", userUpdatePassword),
    async (c) => {
      try {
        const { currentPassword, newPassword } = c.req.valid("json");
        const account = c.get("account");

        await account.updatePassword(newPassword, currentPassword);

        return c.json({ success: true });
      } catch (error) {
        if ((error as { code?: number }).code === 401) {
          return c.json(
            {
              success: false,
              message: "User not authenticated. Please log in.",
            },
            401
          );
        }
        return c.json(
          { success: false, message: (error as Error).message },
          500
        );
      }
    }
  )
  .post(
    "/update-document",
    sessionMiddleware,
    zValidator("json", userSchema),
    async (c) => {
      try {
        const { name, email } = c.req.valid("json");
        const user = c.get("user");
        const databases = c.get("databases");

        const document = await databases.listDocuments(
          env.DATABASE_ID, // databaseId
          env.USERS_ID, // collectionId
          [
            Query.equal("user_id", user.$id), // query (optional)
          ] // queries (optional)
        );

        await databases.updateDocument(
          env.DATABASE_ID, // databaseId
          env.USERS_ID, // collectionId
          document.documents[0].$id, // documentId
          {
            name: name,
            email: email,
          }
        );

        return c.json({ success: true });
      } catch (error) {
        if ((error as { code?: number }).code === 401) {
          return c.json(
            {
              success: false,
              message: "User not authenticated. Please log in.",
            },
            401
          );
        }
        return c.json(
          { success: false, message: (error as Error).message },
          500
        );
      }
    }
  )
  .get("/find-user-document", sessionMiddleware, async (c) => {
    try {
      const user = c.get("user"); // Usuario autenticado
      const database = c.get("databases");

      // Buscar el documento del usuario en la colección `users`
      const response = await database.listDocuments(
        env.DATABASE_ID, // ID de la base de datos
        env.USERS_ID, // ID de la colección `users`
        [Query.equal("user_id", user.$id)] // Buscar por `user_id`
      );

      if (response.documents.length === 0) {
        return c.json(
          { success: false, message: "User document not found" },
          404
        );
      }

      // Devolver el primer documento encontrado (asumiendo que `user_id` es único)
      return c.json({
        success: true,
        documentId: response.documents[0].$id,
        document: response.documents[0],
      });
    } catch (error) {
      console.error("Error fetching user document:", error);
      return c.json({ success: false, message: (error as Error).message }, 500);
    }
  });

export default app;
