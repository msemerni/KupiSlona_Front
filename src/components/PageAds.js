import React, { useEffect } from 'react';
import AdCardDetailed from './AdCardDetailed';
import Loader from './Loader';
import actionAdById from '../actions/actionAdById';
// import actionDelAd from '../actions/actionDelAd';

import { connect } from 'react-redux';

const PageAds = ({ match: { params: { id } }, onIdChange, onDelete, ad }) => {
    useEffect(() => {
        onIdChange(id)
    }, [id])

    // useEffect(() => {
    //     onDelete()
    //   }, [])


    console.log("AD: ", ad);
    return (
        ad ? <AdCardDetailed key={ad.id} ad={ad} /> : <Loader />
    )
}
const CPageAds = connect(state => ({ ad: state.info?.goodById?.payload }), 
                                { onIdChange: actionAdById, 
                                    // onDelete: actionDelAd 
                                })(PageAds);

export default CPageAds;
