import * as cheerio from "cheerio";
import { Elysia } from "elysia";

export const scrapeController = new Elysia({ prefix: "/scrape" }).get(
  "/",
  async (context) => {
    const response = await fetch("http://books.toscrape.com");
    if (response.status !== 200) {
      throw new Error(await response.text());
    }
    const html = await response.text();

    const $ = cheerio.load(html);

    const books = [];

    $(".product_pod").each((index, element) => {
      const title = $(element).find("h3 a").attr("title");
      const price = $(element).find(".price_color").text();
      const availability = $(element).find(".availability").text().trim();
      const rating = $(element).find("p").attr("class");

      books.push({ title, price, availability, rating });
    });

    return new Response(JSON.stringify({ books }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);
