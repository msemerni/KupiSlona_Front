import gql from "../utils/gql";
import { actionPromise } from "./actionPromise";

const actionMyAds = (ownerID) => {
  const gqlQuery = gql(
    `query SearchMyAds ($queryID: ID) {
      userAdFind (id: $queryID) {
        id title price description createdAt tags address user {id login}
      }
    }`,
    { queryID: ownerID }
  );
  
  return actionPromise("myAds", gqlQuery);
}

export default actionMyAds;
