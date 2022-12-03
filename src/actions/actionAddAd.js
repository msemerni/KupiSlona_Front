import gql from "../utils/gql";
import { actionPromise } from "./actionPromise";

const actionAddAd = (Ad) =>
  async (dispatch) => {
    const gqlQuery = `mutation upsertAd($Ad: AdInput) {
      upsertAd(ad:$Ad) 
      {
        user {login} id title
      }
    }`;
    const gqlPromise = gql(gqlQuery, { Ad });
    const action = actionPromise('newAd', gqlPromise);
    const resolved = await dispatch(action);
    return resolved;
  }

export default actionAddAd;
