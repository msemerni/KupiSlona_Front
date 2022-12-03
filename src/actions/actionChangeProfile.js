import gql from "../utils/gql";
import { actionPromise } from "./actionPromise";
import actionUser from "./actionUser";
import store from '../reducers/store';
import history from "../utils/history";

const actionChangeProfile = (myProfile) =>
  async (dispatch) => {


    /////// ДОБАВИТЬ АВАТАРКУ
    
    const gqlQuery = `mutation ChangeProfile($myProfile: UserInput) {
      userUpdate(myProfile: $myProfile) {
        id, createdAt, login, nick, phones, address
        }
      }`
    const gqlPromise = gql(gqlQuery, { myProfile });
    const action = actionPromise('newProfile', gqlPromise);
    const resolved = await dispatch(action);
    dispatch(actionUser(store.getState().auth.payload.id));
    history.push("./dashboard");
    return resolved;
  }

export default actionChangeProfile;
