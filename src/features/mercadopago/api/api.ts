import { MercadoPagoConfig, PreApproval } from "mercadopago";
import { env } from "@/env.config";
import { activateUserPlan } from "@/features/plans/actions";

interface User {
  id: number;
  name: string;
  suscription: string | null;
  authorized: boolean;
  email: string;
}

export const mercadopago = new MercadoPagoConfig({
  accessToken: env.MP_ACCESS_TOKEN,
});

const api = {
  user: {
    async suscribe(plan: string, email: string, price: number) {
      const suscription = await new PreApproval(mercadopago).create({
        body: {
          back_url: env.HOSTNAME,
          reason: `Suscripción a Mangoes ${plan}`,
          auto_recurring: {
            frequency: 1,
            frequency_type: "months",
            transaction_amount: price,
            currency_id: "ARS",
          },
          payer_email: email,
          status: "pending",
        },
      });

      return { url: suscription.init_point!, suscription };
    },
    async update(data: Partial<User>) {
      if (data.suscription && data.authorized) {
        await activateUserPlan(data.suscription, data.authorized);
      }
    },

    // Método para obtener un usuario por su correo electrónico
    async getByEmail(email: string) {
      const suscription = await new PreApproval(mercadopago).search({
        options: {
          q: email,
        },
      });

      return suscription;
    },
  },
};

export default api;
