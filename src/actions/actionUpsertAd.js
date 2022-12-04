import gql from "../utils/gql";
import { actionPromise } from "./actionPromise";

const actionUpsertAd = (Ad) =>
  async (dispatch) => {
    const gqlQuery = `mutation upsertAd($Ad: AdInput) {
      upsertAd(ad:$Ad) 
      {
        id title tags price 
        images { id url originalname }
        user { id login }
      }
    }`;
    const gqlPromise = gql(gqlQuery, { Ad });
    const action = actionPromise('newAd', gqlPromise);
    const resolved = await dispatch(action);
    return resolved;
  }

export default actionUpsertAd;
