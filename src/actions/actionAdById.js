import gql from "../utils/gql";
import { actionPromise } from "./actionPromise";

const actionAdById = (id) => {
  const queryPromise = gql(
    `query Good ($id: ID) {
      AdFindOne (id: $id) {
        id title price description createdAt tags address user {id login phones}
      }
    }`,
    { id });

  return actionPromise('goodById', queryPromise);
}

export default actionAdById;
