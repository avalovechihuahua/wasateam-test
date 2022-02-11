import req from "@/plugins/axios";

const QUERY = "pet";

export default async function (path = "", params = {}) {
  const url = QUERY + path;
  const { data } = await req.get(url, params);
  return data.contents;
}
