import React from "react";

import logo from "../../images/logo.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">If you have any questions, please don't hesitate to contact us. </p>
      <div style={{flex:1,display:'flex',flexDirection:'row'}}>
        <p className="text-white text-sm text-center font-medium mt-2">info@oxemeta.io</p>
        <p className="text-white text-sm text-center font-medium mt-2" style={{marginLeft:2,marginRight:2}}>{"-"}</p>
        <p className="text-white text-sm text-center font-medium mt-2">
          <a href="https://linktr.ee/oxemeta" target="_blank">{" Follow Us"}</a>
        </p>
      </div>
      
           
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@OxeMETA 2022</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;
