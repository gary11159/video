import React from "react";
import LoadingImg from '../public/loading.gif';
export const Spinner = (props) => {
  return (
      <div id="loader-wrapper" style={{ opacity: '1' }}>
        <div id="loader"><img src={LoadingImg} alt="" /></div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>
  );
};

export default Spinner;