import gql from "../utils/gql";
import { actionPromise } from "./actionPromise";

const actionSearchAds = (queryString) => {
  const gqlQuery = gql(`query SearchAds ($queryString: String) {
    AdSearch (queryString: $queryString) {
      id title price description createdAt tags address 
      images { id url originalname }
      user {id login}
    }
  }`,
  { queryString }
  )
  return actionPromise("searchAds", gqlQuery);
}

export default actionSearchAds;
