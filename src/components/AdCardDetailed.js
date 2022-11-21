import SliderImages from './SliderImages';
import store from '../reducers/store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link, Route } from 'react-router-dom';
import actionDelAd from '../actions/actionDelAd';
import history from '../utils/history.js';


const AdCardDetailed = ({ ad: { title, images, price, description, address } }) => {
  return (
    <div className='card' style={{ width: 100 + "%" }}>
      {images && <SliderImages imgArray={images} />}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">Price: $<strong>{price}</strong></p>
        <p>{description}</p>
        <address>{address}</address>
        <p>{"тут телефоны"}</p>

        {store.getState().info.userProfile?.payload?.id !== store.getState().info.goodById?.payload?.user?.id &&
          <div className="text-center">
            <button className='btn btn-outline-info' onClick={() => alert("Write your message from Telegram/Viber")}>Write message</button>
          </div>
        }
      </div>

      {store.getState().info.userProfile?.payload?.id === store.getState().info.goodById?.payload?.user?.id &&
        <div className="d-flex justify-content-end">
          <Link to={`/dashboard`}>
            <FontAwesomeIcon icon={faFilePen} style={{ padding: 0.5 + "em", fontSize: 2 + "em" }} />
          </Link>
          <FontAwesomeIcon icon={faTrashCan}
            style={{ padding: 0.5 + "em", fontSize: 2 + "em", color: "#dc3545", cursor: "pointer" }}
            onClick={() => {
              let adIdToDel = store.getState().info.goodById?.payload?.id;
              console.log("ADD TO DELETE (ID): ", adIdToDel);
              actionDelAd(adIdToDel);
              history.push("/ads");
              // alert("ad deleted")
              }
            } />
        </div>
      }

    </div>
  )
}

export default AdCardDetailed;
