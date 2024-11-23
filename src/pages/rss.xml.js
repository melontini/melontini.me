import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

//TODO maybe insert content?
export async function GET(context) {
  const posts = await getCollection("manuscript");
  return rss({
    title: "the melonscript",
    description: "What is bro yapping about?",
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/manuscript/${post.slug}/`,
    })),
  });
}
