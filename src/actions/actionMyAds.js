import gql from "../utils/gql";
import { actionPromise } from "./actionPromise";

const actionMyAds = (ownerID) => {
  const gqlQuery = gql(
    `query SearchMyAds ($queryID: ID) {
      userAdFind (id: $queryID) {
        id title price description createdAt tags address
        images {id url originalname}
        user {id login phones}
      }
    }`,
    { queryID: ownerID }
  );
  
  return actionPromise("myAds", gqlQuery);
}

export default actionMyAds;
