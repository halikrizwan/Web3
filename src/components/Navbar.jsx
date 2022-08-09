import React, { useEffect } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = (props) => {
  const [toggleMenu, setToggleMenu] = React.useState(false)

  useEffect(()=>{
    console.log(props.data)
  },[props.data])

  return (
    <nav className={`w-full justify-start items-start py-5 ${props.data>767 ? "px-20" : "px-5"}`}>
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="" style={{width:200,height:50}} />
      </div>
      <div className="flex relative">
      </div>
    </nav>
  );
};

export default Navbar;
