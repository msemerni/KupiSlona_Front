import { actionFulfilled } from "./actionPromise";
import gql from "../utils/gql";

const actionAllAds = () =>
  async (dispatch, getState) => {

    let skipAdsCount;
    const uploadedAds = getState().info?.allAds?.payload || [];
    uploadedAds ? skipAdsCount = uploadedAds.length : skipAdsCount = 0;


  //   const gqlQuery = await gql(`query SearchAds ($query: String) {
  //   AdFind (query: $query) {
  //     id title price description createdAt tags comments {id text} address user {id login phones address} images {id url}
  //   }
  // }`
    const gqlQuery = await gql(`query allAds {
    getAds {
      id title price description createdAt tags address
      user {id login nick} 
      images{
      	id 
    	}
    }
}`
  ,
      {
        query: JSON.stringify(
          [
            {},
            {
              // sort: [{ id: -1 }],
              // limit: [5],
              // skip: [skipAdsCount],
              order:[["id","DESC"]],
              offset:(skipAdsCount),
              limit : 5,
            }
          ]
        )
      }
    )

    const updateAD = await gqlQuery;
    dispatch(actionFulfilled("allAds", [...uploadedAds, ...updateAD]));
  }

export default actionAllAds;
