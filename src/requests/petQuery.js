import req from "@/plugins/axios";
// import axios from "axios";

const QUERY = "pet";

export default async function (path = "", params = {}) {
  const url = QUERY + path;
  const { data } = await req.get(url, params);
  // console.log("data");
  // console.log(data);
  // console.log("contents");
  // console.log(data.contents);

  return data.contents;
}

// export default function (path = "", params = {}) {
//   const url = QUERY + path;
//   return req.get(url, params).then((res) => res.contents);
// }
