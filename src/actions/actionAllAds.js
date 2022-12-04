import { actionFulfilled } from "./actionPromise";
import gql from "../utils/gql";

const actionAllAds = () =>
  async (dispatch, getState) => {

    let skipAdsCount;
    const uploadedAds = getState().info?.allAds?.payload || [];
    uploadedAds ? skipAdsCount = uploadedAds.length : skipAdsCount = 0;

    const gqlQuery = await gql(`
    query allAds ($settings: String) {
      getAds (settings: $settings) {
        id title price description createdAt tags address
        images {id url originalname}
        user {id login phones}
      }
    }
    `
  ,
  {
    settings: JSON.stringify(
      // [
      //   {}, 
        { order:[["id","DESC"]], offset:(skipAdsCount), limit : 5 }
      // ]
    )
  })

    const updateAD = await gqlQuery;
    dispatch(actionFulfilled("allAds", [...uploadedAds, ...updateAD]));
  }

export default actionAllAds;
