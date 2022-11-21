import gql from "../utils/gql";
import { actionPromise } from "./actionPromise";

const actionDelAd = (id) => {
  const queryPromise = gql(
    `mutation deleteAd ($id: ID) {
        deleteAd (id: $id) {
          id title
        }
      }`,
    { id });

  return actionPromise('delGoodById', queryPromise);
}

export default actionDelAd;