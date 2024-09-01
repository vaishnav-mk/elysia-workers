import Elysia from "elysia";
import { scrapeController } from "./scrape.ts";

console.log({ scrapeController });
export const app = new Elysia({ aot: false })
  .onError(({ code, error }) => {
    return new Response(JSON.stringify({ error: error.toString() ?? code }), {
      status: 500,
    });
  })
  .use(scrapeController);

app.get("/", () => "Hello from Elysia 🦊");
