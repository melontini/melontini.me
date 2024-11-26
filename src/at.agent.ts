import { AtpAgent } from "@atproto/api";
//This is based on blug https://github.com/haileyok/blug which serves a similar purpose.

export const ATP_HANDLE = "did:plc:omyyplzrooemhqoqz5myy5sg";
export const ATP_SERVICE = "https://puffball.us-east.host.bsky.network/";

export const atpAgent = new AtpAgent({
  service: ATP_SERVICE,
});

export interface WhtwndBlogEntryRecord {
  $type: "com.whtwnd.blog.entry";
  content?: string;
  createdAt: string;
  theme?: string;
  title: string;
  ogp?: {
    height: number | null;
    url: string | null;
    width: number | null;
  };
  visibility: string;
}

export interface WhtwndBlogEntryView {
  rkey: string;
  cid: string;
  record: WhtwndBlogEntryRecord;
}

export const uriToRkey = (uri: string): string => {
  const rkey = uri.split("/").pop();
  if (!rkey) {
    throw new Error("Failed to get rkey from uri.");
  } else {
    return rkey;
  }
};

export async function listPosts(): Promise<WhtwndBlogEntryView[]> {
  const res = await atpAgent.com.atproto.repo.listRecords({
    collection: "com.whtwnd.blog.entry",
    repo: ATP_HANDLE,
  });

  if (!res.success) {
    throw new Error("Failed to get posts.");
  }

  const posts = res.data.records.map((data: any) => {
    return {
      rkey: uriToRkey(data.uri),
      cid: data.cid?.toString() ?? "",
      record: data.value as WhtwndBlogEntryRecord,
    };
  }) as WhtwndBlogEntryView[];

  return posts
    .filter((p) => p.record.visibility == "public")
    .sort(
      (a, b) =>
        new Date(b.record.createdAt).valueOf() -
        new Date(a.record.createdAt).valueOf()
    )
    .map((p) => {
      p.record.content = undefined;
      return p;
    });
}
