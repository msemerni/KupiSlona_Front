import { actionFulfilled } from "./actionPromise";
import gql from "../utils/gql";

const actionAllAds = () =>
  async (dispatch, getState) => {

    let skipAdsCount;
    const uploadedAds = getState().info?.allAds?.payload || [];
    uploadedAds ? skipAdsCount = uploadedAds.length : skipAdsCount = 0;


    // query allAds ($settings: String) {
    //   getAds (query: $settings) {
    //     id title price description createdAt tags address
    //     user {id login nick} 
    //     images{ id }
    //   }
    // }

    const gqlQuery = await gql(`
    query allAds ($settings: String) {
      getAds (settings: $settings) {
        id title price description createdAt tags address
        user {id login nick} 
        images{ id }
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
  }
      // {
      //   query: JSON.stringify(
      //     [
      //       {},
      //       {
      //         // sort: [{ id: -1 }],
      //         // limit: [5],
      //         // skip: [skipAdsCount],

      //         order:[["id","DESC"]],
      //         offset:(skipAdsCount),
      //         limit : 5,
      //       }
      //     ]
      //   )
      // }
    )

    const updateAD = await gqlQuery;
    dispatch(actionFulfilled("allAds", [...uploadedAds, ...updateAD]));
  }

export default actionAllAds;
