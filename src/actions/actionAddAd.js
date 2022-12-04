import gql from "../utils/gql";
import { actionPromise } from "./actionPromise";

const actionAddAd = (Ad) =>
  async (dispatch) => {
    const gqlQuery = `mutation upsertAd($Ad: AdInput) {
      upsertAd(ad:$Ad) 
      {
        user {id login} id title tags price images {id url}
      }
    }`;
    const gqlPromise = gql(gqlQuery, { Ad });
    const action = actionPromise('newAd', gqlPromise);
    const resolved = await dispatch(action);
    return resolved;
  }

export default actionAddAd;
