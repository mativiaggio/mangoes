import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";
import { env } from "../env.config";

export const client = hc<AppType>(env.PUBLIC_URL);
