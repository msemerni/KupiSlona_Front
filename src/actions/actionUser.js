import gql from "../utils/gql.js";
import { actionPromise } from './actionPromise';

///////////// ДОБАВИТЬ АВАТАРКУ
///////////
const actionUser = (id) => {
  const gqlQuery = `query thisUser ($ID: ID) {
    getUser (id: $ID) {
      id login nick createdAt phones address avatar{
        id
      }
    }
  }`;

  const gqlPromise = gql(gqlQuery, { ID: id });
  return actionPromise("userProfile", gqlPromise);
}

export default actionUser;

// const gqlQuery = `query UserInfo ($ID: String) {
//   UserFindOne (query: $ID) {
//     _id login nick createdAt phones address avatar{
//       _id url originalFileName
//     }
//   }
// }`;
// const gqlPromise = gql(gqlQuery, { ID: JSON.stringify([{ _id }]) });