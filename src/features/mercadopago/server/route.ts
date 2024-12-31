import { PreApproval } from "mercadopago";
import api, { mercadopago } from "@/features/mercadopago/api/api";
import { Hono } from "hono";

const app = new Hono();

// Ruta POST para manejar las notificaciones del webhook de MercadoPago
app.post("/", async (ctx) => {
  try {
    // Obtenemos el cuerpo de la petición que incluye el tipo de notificación
    const body: { data: { id: string }; type: string } = await ctx.req.json();

    // Solo nos interesan las notificaciones de suscripciones
    if (body.type === "subscription_preapproval") {
      // Obtenemos la suscripción
      const preapproval = await new PreApproval(mercadopago).get({
        id: body.data.id,
      });

      // Si se aprueba, actualizamos el usuario con el id de la suscripción
      if (preapproval.status === "authorized") {
        // Actualizamos el usuario con el id de la suscripción
        await api.user.update({
          suscription: preapproval.id,
          authorized: true,
        });
      }
    }

    // Respondemos con un estado 200 para indicar que la notificación fue recibida correctamente
    return ctx.json({ message: "Notificación recibida correctamente" }, 200);
  } catch (error) {
    console.error("Error al procesar el webhook:", error);
    return ctx.json(
      { error: "Hubo un error al procesar la notificación" },
      500
    );
  }
});

app.get("/check-subscription/:email", async (ctx) => {
  const { email } = ctx.req.param(); // Obtener el correo electrónico desde los parámetros de la URL

  try {
    // Buscar el usuario por email en la base de datos (ajusta esto a tu implementación)
    const user = await api.user.getByEmail(email);

    return ctx.json(user);
  } catch (error) {
    console.error("Error al verificar la suscripción:", error);
    return ctx.json(
      { error: "Hubo un error al verificar la suscripción" },
      500
    );
  }
});

export default app;
