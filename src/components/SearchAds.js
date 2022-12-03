import Loader from "./Loader";
import AdsCategory from "./AdsCategory";
import {connect} from 'react-redux';
import actionSearchAds from '../actions/actionSearchAds';

const SearchAds = ({ ads = [], status}) => {
    return (
      status === 'PENDING' || !status ?
      <Loader /> :
      <div className="row" style={{justifyContent: "center"}}>
        { ads.length > 0? 
          ads.map(ad => <AdsCategory ad={ad} key={ad.id}/>) : "Nothing found" }
      </div>
    )
  }
  
const CSearchAds = connect(state => ({ads: state.info?.searchAds?.payload, 
                                       status: state.info?.searchAds?.status}), 
                                      {actionSearchAds})(SearchAds);
  
export default CSearchAds;
