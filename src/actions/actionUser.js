import gql from "../utils/gql.js";
import { actionPromise } from './actionPromise';

const actionUser = (id) => {
  const gqlQuery = `query thisUser ($ID: ID) {
    getUser (id: $ID) {
      id login nick createdAt phones address avatar {id url originalname}
    }
  }`;

  const gqlPromise = gql(gqlQuery, { ID: id });
  return actionPromise("userProfile", gqlPromise);
}

export default actionUser;
