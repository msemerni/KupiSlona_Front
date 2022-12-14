import gql from "../utils/gql";
import { actionPromise } from "./actionPromise";

const actionAdById = (id) => {
  const queryPromise = gql(
    `query FindAdByID ($id: ID) {
      AdFindOne (id: $id) {
        id title price description createdAt tags address 
        images {id url originalname}
        user {id login phones}
      }
    }`,
    { id });

  return actionPromise('adById', queryPromise);
}

export default actionAdById;
