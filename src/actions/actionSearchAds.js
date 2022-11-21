import gql from "../utils/gql";
import { actionPromise } from "./actionPromise";

const actionSearchAds = (searchString) => {
  const gqlQuery = gql(`query SearchAds ($query: String) {
      AdFind (query: $query) {
        id title price description createdAt tags comments {id text} address user {id login} images {id url}
      }
    }`,
    {
      query: JSON.stringify(
        [
          { $or: [{ title: `/${searchString}/` }, { description: `/${searchString}/` }] },
          { sort: [{ id: -1 }] }
        ]
      )
    }
  )
  return actionPromise("searchAds", gqlQuery);
}

export default actionSearchAds;
