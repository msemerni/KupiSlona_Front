import { BACKEND_URL_UPLOAD } from "../constants/constants";
import { actionPromise } from "./actionPromise";

const actionImgeriesUpload = (acceptedFiles) =>
  async (dispatch) => {
    const uploadImg = (oneImagery) => {

      const myFormData = new FormData();
      myFormData.append("dropZone", oneImagery);

      return fetch(BACKEND_URL_UPLOAD, {
        method: "POST",
        headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
        body: myFormData
      })
        .then(res => res.json())
        .then(json => json)
    }
    const allPromiseImg = [];

    for (let i = 0; i < acceptedFiles.length; i++) {
      allPromiseImg.push(uploadImg(acceptedFiles[i]))
    }
    const allUploadedImageries = actionPromise("allUploadedImageries", Promise.all(allPromiseImg).then(result => result));
    await dispatch(allUploadedImageries);
  }

export default actionImgeriesUpload;
