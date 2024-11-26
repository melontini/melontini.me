export const prerender = false;

import rss from "@astrojs/rss";
import { listPosts } from "../at.agent";

//TODO maybe insert content?
export async function GET(context: any) {
  return rss({
    title: "the melonscript",
    description: "What is bro yapping about?",
    site: context.site,
    items: (await listPosts()).map((post: any) => ({
      link: `/manuscript/${post.rkey}/`,
      title: post.record.title,
      pubDate: new Date(post.record.createdAt),
    })),
  });
}
