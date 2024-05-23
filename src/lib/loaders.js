import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];

  const parsedQuery = new URLSearchParams(query);
  const estateType = parsedQuery.get("estateType");

  parsedQuery.delete("estateType");
  const newQuery = parsedQuery.toString();
  const postPromise = apiRequest(`/posts/${estateType}?&currentPage=1&${newQuery}`);
  console.log(`/posts/${estateType}?${newQuery}`);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/saved-posts");
  console.log(postPromise);
  return defer({
    postResponse: postPromise,
  });
};
