import { Env } from "bun"
import { app } from "./routes/app"
import { Context } from "elysia"

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: Context,
    
  ): Promise<Response> {

    console.log({app})
    return await app.fetch(request)
  },
}