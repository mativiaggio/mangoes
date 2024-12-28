import { env } from "@/env.config";
import { sessionMiddleware } from "@/lib/middlwares";
import { Hono } from "hono";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const storage = c.get("storage");

    const files = await storage.listFiles(env.IMAGES_BUCKET_ID);

    return c.json({ files: files });
  })
  .get("/get-file-preview/:id", sessionMiddleware, async (c) => {
    try {
      const storage = c.get("storage");
      const fileId = c.req.param("id");

      let imageUrl: string | undefined = undefined;
      const arrayBuffer = await storage.getFileView(
        env.IMAGES_BUCKET_ID,
        fileId
      );
      imageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString(
        "base64"
      )}`;

      return c.json({ fileUrl: imageUrl });
    } catch (error) {
      console.error("Error getting file url:", error);
      return c.json({ success: false, message: (error as Error).message }, 500);
    }
  });

export default app;
