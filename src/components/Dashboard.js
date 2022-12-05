import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {BACKEND_URL, tagList} from '../constants/constants.js';
import actionImgeriesUpload from '../actions/actionImgeriesUpload';
import actionUpsertAd from '../actions/actionUpsertAd.js';
import history from '../utils/history.js';

const BtnMyAds = () => {
    return (
      <Link to={`/myads`} className="text-decoration-none text-black">
        <button className='btn btn-secondary btn-sm'>My Ads</button>
      </Link>
    )
  }
  
  const BtnMyProfile = () => {
    return (
      <Link to={`/profile`} className="text-decoration-none text-black">
        <button className='btn btn-dark btn-sm'>User Profile</button>
      </Link>
    )
  }

const Dashboard  = ({ newImg, onUpload, onNewAd, adForEdit: {id, title, description, price, address, tags, images} = {}}) => {
    // const id = "62fde8f0c1b7470e6a893178";
    // const id = null;   ////////// сделать динамический айди
    const [thisTitle, setTitle] = useState(title || "");
    const [thisDescription, setDescription] = useState(description || "");
    const [thisPrice, setPrice] = useState(price || "");
    const [thisAddress, setAddress] = useState(address || "");
    const [thisTags, setTags] = useState(tags || "");
    // const [thisImg, setImg] = useState([]);
    const [thisImg, setImg] = useState([]);
    const addNewAd = () => {
      
      const images = [];
  
      if (thisImg) {
        for (const img of thisImg) {
          const newImg = img.id;
          images.push(newImg);
        }
      }

      const Ad = {
        id: id,
        // ...(id ? {id: id} : {}),
        ///////// ...(images.length ? {images: images[0].url} : {}), /// для аватара
        // ...(images.length ? {images: images} : {}), ///  для объяв
        images: images, ///  для объяв
        title: thisTitle,
        description: thisDescription,
        tags: thisTags,
        address: thisAddress,
        price: +thisPrice,
        }
  
      onNewAd(Ad);
    }
    
    useEffect (() => {
      if(newImg) {
        setImg(newImg);
      }
    },[newImg])
  
     return (
      <>
        <div className="m-2 d-flex justify-content-between">
          <BtnMyAds/>
          <BtnMyProfile/>
        </div>
        <form className='mx-auto px-5 col-12 text-center bg-light'>
  
          <h5>Add new/Edit advertisement</h5>
  
          <div className="mb-1">
            <label className="form-label w-75">Title:
              <input type="text" className="form-control" value={thisTitle} onChange={e => setTitle(e.target.value)} />
            </label>
          </div>
  
          <div className="mb-1">
            <label className="form-label w-75">Category(Tags):
              <select className="form-select" defaultValue={"0"} required onChange={e => { setTags(e.target.value) }}>
                <option disabled value="0">Choose category...</option>
                {tagList.map((item) => {
                  return (<option key={item}>{item}</option>)
                })}
              </select>
            </label>
          </div>
  
          <div className="mb-1">
            <label className="form-label w-75">Description:
              <textarea className="form-control" value={thisDescription} onChange={e => setDescription(e.target.value)} />
            </label>
          </div>
  
          <div className="mb-1">
            <label className="form-label w-75">Price ($):
              <input type="number" className="form-control" value={thisPrice} onChange={e => setPrice(e.target.value)} />
            </label>
          </div>
  
          <Dropzone name='dropZone' onDrop={(acceptedFiles) => { onUpload(acceptedFiles) }}>
            {({ getRootProps, getInputProps }) => (
              <section className="container" style={{ border: "dashed 1px", width: 75 + "%" }}>
                <div style={{ textAlign: "center" }} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop images here, or click to select from disk</p>
                </div>
                <div className="d-flex flex-row justify-content-center p-1">
                    {
                      thisImg.map(img => { return <img style={{ display: "flex", width: 50 + "px", margin: 0.5+"em"}} key={img.id} src={`${BACKEND_URL}${img.url}`} /> })
                    }
                </div>
              </section>
            )}
          </Dropzone>
  
          <div className="mb-1">
            <label className="form-label w-75">Address:
              <input type="text" className="form-control" value={thisAddress} onChange={e => setAddress(e.target.value)} />
            </label>
          </div>
          <button type="button" className="btn btn-outline-success mb-2"
                  onClick={(e) => {
                           addNewAd();
                           e.preventDefault();
                           history.push("/ads");
                          }}>Apply</button>
        </form>
      </>
    )
  }

const CDashboard = connect(state => ({ newImg: state.info?.allUploadedImageries?.payload, 
                                         adForEdit: state.info?.adById?.payload}),
                                        { onUpload: actionImgeriesUpload, onNewAd: actionUpsertAd})(Dashboard);

export default CDashboard;
