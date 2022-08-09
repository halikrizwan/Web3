import React, { useEffect,useState,useContext } from "react";
import { Navbar, Welcome, Footer, Dashboard, Login } from "./components";
import { TransactionContext } from "./context/TransactionContext";
import { Buffer } from 'buffer'
import { sidebarData } from "./sidebarData";
import "./components/sidebar.css"
import './dash/dash.css'
import MainDash from './dash/components/MainDash/MainDash';
import RightSide from './dash/components/RigtSide/RightSide';
import Sidebar from './dash/components/Sidebar';
import Cards from "./dash/components/Cards/Cards";
import Table from "./dash/components/Table/Table";
import "./dash/components/MainDash/MainDash.css";
import "./dash/components/Sidebar.css";
import "./dash/components/Card/Card.css";
import "./dash/components/Cards/Cards.css";
import Logo from "../images/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "./dash/Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { Loader } from "./components";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.css';
import Card from "./dash/components/Card/Card";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Modal from 'react-modal';

globalThis.Buffer = Buffer


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";



const Input = ({ placeholder, name, type, value, handleChange, editable }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    disabled={editable}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const App = () => {
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [color, setColor] = React.useState("blue");

  const { currentAccount, transactions, transactionsNew,walletCon,setWalletCon,chooseWallet, setChooseWallet, tokenOxUsdt,claim, tokenOx,tokenOXEUsdt,tokenOXE,tokenUSDT,tokenBUSD,handleChange, sendTransaction, formData, isLoading, colors, alertsOne, connection, setAlertOne, oxeAmountTot, oxeCon, getTOKENBalanceOf } = useContext(TransactionContext);

  const [selected, setSelected] = useState(0);

  const [selectedName, setSelectedName] = useState('Overview');

  const [expanded, setExpaned] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    console.log('open')
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      // top: '50%',
      // left: '50%',
      // right: 'auto',
      // bottom: 'auto',
      // marginRight: '-50%',
      // transform: 'translate(-50%, -50%)',
      height:windowDimenion.winWidth<768 ? "34%" :'25%',
      width: windowDimenion.winWidth<768 ? '90%' :'35%',
      marginLeft: windowDimenion.winWidth<768 ? '5%' :'35%',
      marginTop:windowDimenion.winWidth<768 ? "35%" :'10%'
    },
  };

  function isMobileDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  }

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }

  const toFix = (x) =>{
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  
   }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [hide, setHide] = useState(false);
  const [alerts, setAlerts] = useState('Minimum Contribution $50, Maximum Contribution $2000');

  const handleSubmit = (e) => {
    const { amount, message, token } = formData;
    if( Number(amount)>=Number(50) && Number(amount)<=Number(2000)){
      e.preventDefault();
      if (!amount) return;
      setAlerts('Minimum Contribution $50, Maximum Contribution $2000');
      sendTransaction();
      console.log('if')
    }else{
      setAlerts('Minimum Contribution $50, Maximum Contribution $2000');
      setAlertOne('');
      console.log('else')
    }
  };

  const myFunction = async() => {
    console.log('start')
  /* Get the text field */
  var copyText = "0xB98f77BA3Ea0fF38B7B8FFAfE9777405f3D01bFA";
   /* Copy the text inside the text field */
  // navigator.clipboard.writeText(copyText);
  await navigator.clipboard.writeText("0xB98f77BA3Ea0fF38B7B8FFAfE9777405f3D01bFA");
  /* Alert the copied text */
  // alert("Copied the text: " + copyText);
}

  useEffect(() => {
    window.addEventListener('resize', detectSize)
    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimenion])
  return(
    <div className="min-h-screen">
    
      {!currentAccount ?
      <div className="gradient-bg-welcome">
        <Login />
        <Footer />
      </div>
      :
      <div className="Appss">
        <div className="AppGlass">
        {/* sidebar start */}
        <div style={{position:'absolute',right:20,top:20,flexDirection:'row',flex:1,display:'flex',backgroundColor:'#49add2',borderRadius:29,padding:4}}>
          <div style={{color:'#fff',marginTop:7,marginRight:10,paddingLeft:'2%'}}>{String(currentAccount).slice(0,16)+"..."}</div>
          <img src="../images/icon.png" style={{borderRadius:20,height:37,width:40,paddingRight:'2%'}} />
        </div>
        <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" style={{height:50,width:170}}/>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
           item.heading=='Staking' ? <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
             
            >
              <item.icon />
              <span>{item.heading}<span style={{color:'#49add2'}}>{"(Soon)"}</span></span>
            </div>
            : item.heading=='Follow Us' ?
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => {
                window.open("https://linktr.ee/oxemeta", "_blank")
                }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
            :item.heading=='Email Us' ?
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => {
                var link = "mailto:info@oxemeta.io";
                window.location.href = link;
                }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
            :
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => {
                setSelected(index);
                console.log(item.heading,'work')
                setSelectedName(item.heading)
                setExpaned(false)
                }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem">
          {/* <UilSignOutAlt /> */}
        </div>
      </div>
    </motion.div>
    </>
    {/* sidebar end */}
    {/* dashboard start */}
    {selectedName=="Overview" ? 
    <div className="MainDash" style={{width:'80vw'}}>
    <h1 style={{color:'#fff',fontSize:25,fontWeight:'bold',marginTop:windowDimenion.winWidth<768 ? "20%" : "6%",paddingLeft:30}} className="">{"Overview"}</h1>
      <br/>
  
      <div className="flex w-full justify-start items-start" style={{marginLeft:'3%',width:'100%',marginTop:'-5%'}}>
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">

          <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">

            <div className=" justify-start blue-glassmorphismNew p-5" style={{width:windowDimenion.winWidth<768 ?windowDimenion.winWidth-60 :'100%'}}>
            <div style={{color:'#fff',fontSize:22,fontWeight:'bold'}}>OXE TOKEN</div><br/>

              {/* <img src="../images/icon.png" style={{height:100,width:100,position:'fixed',marginLeft:'75%',marginTop:'-4%'}}/> */}

              <div style={{color:'#fff',fontSize:17,textAlign:'initial'}}>OXE is a utility token based on Binance Smart Chain (BSC) network.<br/><br/>
It is a digital asset which will acquire it's value over-time with the project growth.<br/>
The token will be used in the OXE decentralized payment ecosystem.<br/>
The token OWNers will get access to a vast array of services and products offered in the OWNERverse, NFT marketplace and even become the first LandOWNERs.</div><br/>
            </div>
            <br/>
            <div style={{flex:1,display:'flex',flexDirection:windowDimenion.winWidth<768 ? 'column' : 'row'}}>
              <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphism " style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 240,height:windowDimenion.winWidth<768 ? '0%' :70,justifyContent:'center',alignItems:'center',marginBottom:'2%',marginRight:'2%'}}>
                <div style={{color:'#fff',fontSize:17,fontWeight:'bold'}}>Token Name</div>
                <div style={{color:'#fff',fontSize:14}}>OXEMETA</div>
              </div>
              
              <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphism " style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 240,height:windowDimenion.winWidth<768 ? '0%' :70,justifyContent:'center',alignItems:'center',marginBottom:'2%',marginRight:'2%'}}>
                <div style={{color:'#fff',fontSize:17,fontWeight:'bold'}}>Token Symbol</div>
                <div style={{color:'#fff',fontSize:14}}>OXE</div>
              </div>
              <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphism " style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 240,height:windowDimenion.winWidth<768 ? '0%' :70,justifyContent:'center',alignItems:'center'}}>
                <div style={{color:'#fff',fontSize:17,fontWeight:'bold'}}>TOTAL SUPPLY</div>
                <div style={{color:'#fff',fontSize:14}}>170,000,000</div>
              </div>
            </div>
            <br/>
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start blue-glassmorphism" style={{width: windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 :720}}>
              <div style={{color:'#fff',fontSize:22,fontWeight:'bold'}}>Why investing in OXEMETA TOKEN?</div><br/>
              <div style={{color:'#fff',fontSize:17}}>OXEMETA allows all participants to invest in the project by buying OXE Tokens. Instructions for participation will be announced closer to the date of public sale. Based on our extensive business and financial plans, we have allocated a total supply of 170,000,000 OXE Tokens with $0.1 as a listing price.</div>
            </div>
          </div>

          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <div style={{flex:1,display:'flex',flexDirection:'column'}}>
              <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphismButton cursor-pointer" onClick={()=>{
                setSelected(1);
                setSelectedName('Buy OXE Token')
              }} style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 350,height:windowDimenion.winWidth<768 ? '0%' :70,justifyContent:'center',alignItems:'initial',marginBottom:'2%'}}>
                <div style={{color:'#fff'}}>Buy OXE Token <br/>Private Sale Round 1 Price $0.08</div>
              </div>
              <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphism " style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 350,height:windowDimenion.winWidth<768 ? '0%' :70,justifyContent:'center',alignItems:'initial',marginBottom:'2%'}}>
                <div style={{color:'#fff'}}>August 2022: Private Sale Round 2<br/>Token Sale Price: $0.09</div>
              </div>
              <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphism " style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 350,height:windowDimenion.winWidth<768 ? '0%' :70,justifyContent:'center',alignItems:'initial',marginBottom:'2%'}}>
                <div style={{color:'#fff'}}>TBA: Public Sale (IDO)<br/>Token Sale Price: TBA</div>
              </div>
              <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphism " style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 350,height:windowDimenion.winWidth<768 ? '0%' :70,justifyContent:'center',alignItems:'initial',marginBottom:'2%'}}>
                <div style={{color:'#fff'}}>October 2022: Land and Property Sale </div>
              </div>
           
              <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphism " style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 350,height:windowDimenion.winWidth<768 ? '0%' :230,justifyContent:'center',alignItems:'initial',marginBottom:'2%'}}>
              <div style={{color:'#fff',fontSize:22,fontWeight:'bold'}}>Rewards Scheme</div><br/>
                <div style={{color:'#fff'}}>$50 - $499 +5% Bonus</div><br/>
                <div style={{color:'#fff'}}>$500 - $999 +10% Bonus</div><br/>
                <div style={{color:'#fff'}}>$1000 - $1999 +15% Bonus</div><br/>
                <div style={{color:'#fff'}}>$2000 +20% Bonus</div>
              </div>
            
            </div>
          </div>

        </div>
      </div>
    </div>
    : selectedName=="Buy OXE Token" ?
    <div className="MainDash" style={{width:'80vw'}}>
      <h1 style={{color:'#fff',fontSize:25,fontWeight:'bold',marginTop:windowDimenion.winWidth<768 ? "20%" : "6%",paddingLeft:30}}>{selectedName}</h1>
      {/* <div style={{marginTop:'3%',marginLeft:'3%',width:'100%'}}>
        <div style={{flex:1,display:'flex',flexDirection:'row',width:'100%'}}>
          <div style={{color:'#fff',width:'89%',fontWeight:'bold'}}>Private Sale Round</div>
          <div style={{color:'#fff',fontWeight:'bold'}}>0 / 5,100,000</div>
        </div>
        <ProgressBar striped variant="success" now={0} />
      </div> */}
      <div className="flex w-full justify-start items-start" style={{marginLeft:'3%',width:'100%'}}>
      
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>

        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4" style={{marginTop:'-4%'}}>
          <div style={{flex:1,display:'flex',flexDirection:windowDimenion.winWidth<768 ? 'column' : 'row'}}>
              <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphismNew " style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 320,height:windowDimenion.winWidth<768 ? '0%' :120,justifyContent:'center',alignItems:'center',marginBottom:'2%',marginRight:'2%'}}>
                <div style={{color:'#fff',fontSize:15,fontWeight:'bold',marginBottom:10,marginLeft:'30%'}}>Total USDT Raised</div>
                <div style={{flex:1,display:'flex',flexDirection:'row',width:'100%'}}>
                  <div style={{width: windowDimenion.winWidth<768 ? windowDimenion.winWidth-70 :'55%'}}>
                    <img src="../images/USDT.png" style={{height:60,width:60}}/>
                  </div>
                  <div style={{justifyContent:'center',marginTop:'5%'}}>
                    <div style={{color:'#fff',fontSize:22,textAlign:'center'}}>{" "+( String(tokenUSDT))}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphismNew " style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 320,height:windowDimenion.winWidth<768 ? '0%' :120,justifyContent:'center',alignItems:'center',marginBottom:'2%',marginRight:'2%'}}>
                <div style={{color:'#fff',fontSize:15,fontWeight:'bold',marginBottom:10,marginLeft:'30%'}}>Total BUSD Raised</div>
                <div style={{flex:1,display:'flex',flexDirection:'row',width:'100%'}}>
                  <div style={{width: windowDimenion.winWidth<768 ? windowDimenion.winWidth-70 :'55%'}}>
                    <img src="../images/BUSD.png" style={{height:60,width:60}}/>
                  </div>
                  <div style={{justifyContent:'center',marginTop:'5%'}}>
                    <div style={{color:'#fff',fontSize:22,textAlign:'center'}}>{" "+( String(tokenBUSD))}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphismNew " style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 320,height:windowDimenion.winWidth<768 ? '0%' :120,justifyContent:'center',alignItems:'center'}}>
                <div style={{color:'#fff',fontSize:15,fontWeight:'bold',marginBottom:10,marginLeft:'30%'}}>Total OXE Sold</div>
                <div style={{flex:1,display:'flex',flexDirection:'row',width:'100%'}}>
                  <div style={{width: windowDimenion.winWidth<768 ? windowDimenion.winWidth-70 :'55%'}}>
                    <img src="../images/icon.png" style={{height:60,width:60}}/>
                  </div>
                  <div style={{justifyContent:'center',marginTop:'5%'}}>
                    <div style={{color:'#fff',fontSize:22,textAlign:'center'}}>{" "+( String(tokenOXE))}</div>
                  {(Number(tokenOXE)!=0 || Number(tokenOXE)!=0.0) &&<div style={{color:'#fff',fontSize:14}}>{"$"+( String(tokenOXEUsdt))}</div>}
                  </div>
                </div>
              </div>
            </div>
        </div>

      <div className={`flex mf:flex-row flex-col items-start justify-between ${windowDimenion.winWidth<768 ? "md:p-20 py-12 px-4" : ""}`} style={{marginTop:windowDimenion.winWidth<768 ? '0%' : '-5%'}}>
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-2">
        
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start  blue-glassmorphism" style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 : 500}}>
            <div style={{display:'flex',flex:1,flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}}>
              <h1 style={{fontSize:25,color:'#fff',fontWeight:'bold',textAlign:'initial',width:'80%'}}>Private Sale Round-1</h1>
              <div style={{color:'#49add2',borderWidth:1,borderRadius:18,borderColor:'#49add2',padding:5,width:70,fontSize:12,textAlign:'center',alignItems:'center',justifyContent:'center'}}>On Sale</div>
            </div>
            <div style={{width:'100%',borderWidth:1,borderColor:'#e7e7e7',marginTop:'3%'}}></div>
            <br/>
            <div style={{display:'flex',flex:1,flexDirection:'row',width:'100%'}}>
                <div style={{width:'60%'}}>
                  <div style={{color:'#e7e7e7',fontSize:16}}>Start</div>
                  <div style={{color:'#fff',fontSize:20}}>01/07/2022</div>
                </div>
                <div>
                <div style={{color:'#e7e7e7',fontSize:16}}>Offer Price</div>
                  <div style={{color:'#fff',fontSize:20}}>$0.08</div>
                </div>
            </div>
            <br/>
            <div style={{display:'flex',flex:1,flexDirection:'row',width:'100%'}}>
                <div style={{width:'60%'}}>
                  <div style={{color:'#e7e7e7',fontSize:16}}>End</div>
                  <div style={{color:'#fff',fontSize:20}}>30/07/2022</div>
                </div>
                <div>
                <div style={{color:'#e7e7e7',fontSize:16}}>Session Supply</div>
                  <div style={{color:'#fff',fontSize:20}}>2,550,000</div>
                </div>
            </div>
          </div>
          <br/>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start  blue-glassmorphism" style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 :500}}>
            <h1 style={{fontSize:25,color:'#fff',fontWeight:'bold',textAlign:'initial'}}>Private Sale Round-2</h1>
            <div style={{width:'100%',borderWidth:1,borderColor:'#e7e7e7'}}></div>
            <br/>
            <div style={{display:'flex',flex:1,flexDirection:'row',width:'100%'}}>
                <div style={{width:'60%'}}>
                  <div style={{color:'#e7e7e7',fontSize:16}}>Start</div>
                  <div style={{color:'#fff',fontSize:20}}>01/08/2022</div>
                </div>
                <div>
                <div style={{color:'#e7e7e7',fontSize:16}}>Offer Price</div>
                  <div style={{color:'#fff',fontSize:20}}>$0.09</div>
                </div>
            </div>
            <br/>
            <div style={{display:'flex',flex:1,flexDirection:'row',width:'100%'}}>
                <div style={{width:'60%'}}>
                  <div style={{color:'#e7e7e7',fontSize:16}}>End</div>
                  <div style={{color:'#fff',fontSize:20}}>30/08/2022</div>
                </div>
                <div>
                <div style={{color:'#e7e7e7',fontSize:16}}>Session Supply</div>
                  <div style={{color:'#fff',fontSize:20}}>2,550,000</div>
                </div>
            </div>
          </div>
          <br/> <br/> <br/> <br/>
        </div>
        
        <div className="flex flex-col flex-1 items-start justify-start w-full mf:mt-0 mt-10">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism" style={{width:windowDimenion.winWidth<768 ? windowDimenion.winWidth-60 :550}}>
            {alerts!='' && <div style={{color:'#49add2',textAlign:'left',width:'100%'}}>{alerts}</div>}
            <Input placeholder="Amount" name="amount" type="number" handleChange={handleChange} />
            {/* <Input placeholder="Select Token" name="token" type="number" handleChange={handleChange} /> */}
            <div className="p-1.5 sm:w-94 w-full flex flex-col justify-start items-center blue-glassmorphism" style={{height:43,justifyContent:'center',borderRadius:2,borderColor:'transparent'}}>
            <select  name="select" onChange={(e) => handleChange(e, 'select')} style={{borderWidth:0,borderRadius:2,width:'100%',opacity:0.7,color:'#fff',elevation:-5,backgroundColor:'transparent',height:40,}}>
              <option value={'USDT'}>USDT</option>
              <option value={'BUSD'}>BUSD</option>
              {/* <option value={'BNB'}>BNB</option> */}
            </select>
            </div>
           
            <Input placeholder="OXE Amount" editable={true} value={`${Number(formData.message)!=0 ? formData.message+ " + " : "OXE Amount" }${Number(formData.message)!=0 ? (oxeCon==1 ? "5% Reward = " : oxeCon==2 ? "10% Reward = " : oxeCon==3 ? "15% Reward = " : oxeCon==4 ? "20% Reward = " : "0% Reward = ") : "" }${Number(formData.message)!=0 ? oxeAmountTot : ""}`} name="message" type="text" handleChange={handleChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {alertsOne!='' && <div style={{color:colors,width:'100%',textAlign:'left'}}>{alertsOne}</div>}
            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={connection==true ? true : false}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#49add2] hover:bg-[#49add2] rounded-full cursor-pointer"
                >
                  Buy OXE Token
                </button>
              )}
          </div>
        </div>

      </div>
      </div>
      
      </div>
    </div>
    : selectedName== "Wallet" ? 
    <div className="MainDash" style={{width:'80vw'}}>
    <h1 style={{color:'#fff',fontSize:25,fontWeight:'bold',marginTop:windowDimenion.winWidth<768 ? "20%" : "6%",paddingLeft:30}}>{"Balance"}</h1>
      <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphismNew " style={{width:240,height:150,justifyContent:'center',alignItems:'initial',marginLeft:'3%',marginTop:'2%'}}>
      <div style={{flex:1,display:'flex',flexDirection:'row',width:'100%'}}>
        <div style={{width: windowDimenion.winWidth<768 ? windowDimenion.winWidth-70 :'75%'}}>
          <img src="../images/icon.png" style={{height:60,width:60}}/>
        </div>
        <div style={{justifyContent:'center',marginTop:'9%'}}>
          <div style={{color:'#fff',fontSize:22,textAlign:'center'}}>{" "+( String(tokenOx))}</div>
         {(Number(tokenOx)!=0 || Number(tokenOx)!=0.0) &&<div style={{color:'#fff',fontSize:14}}>{"$"+( String(tokenOxUsdt))}</div>}
        </div>
      </div>
      <br/>
      <div style={{flex:1,flexDirection:'row',display:'flex'}}>
        <div style={{color:'#49add2',fontSize:14,borderColor:'#49add2',borderWidth:1,borderRadius:14,padding:5,justifyContent:'center',alignItems:'center',marginRight:'3%'}} onClick={()=>{getTOKENBalanceOf()}} className="cursor-pointer">Get Balance</div>
       {(Number(tokenOx)!=0 || Number(tokenOx)!=0.0) && <div style={{color:'#49add2',fontSize:14,borderColor:'#49add2',borderWidth:1,borderRadius:14,padding:5,justifyContent:'center',alignItems:'center'}} onClick={()=>{
        
        if(isMobileDevice()){
          openModal();
          // alert('1')
        }else{
          if(walletCon){
            openModal();
          }else{
          claim();
          }
          // alert('2')
        }
        }} className="cursor-pointer">Claim</div>}
      </div>
      
      </div>
    <h1 style={{color:'#fff',fontSize:25,fontWeight:'bold',marginTop:'6%',paddingLeft:30}}>{"Transactions"}</h1>

      <Table data={transactions}/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
    : selectedName=="Staking" ?
    null
    :
    null
    }
    {/* dashboard end */}
          {/* <RightSide/> */}
          <div style={{justifyContent:'center',alignItems:'center'}}>
          <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className="blue-glassmorphismModal"
      >
      <div style={{justifyContent:'center',padding:10}}> 
      <h1 style={{fontSize:20,fontWeight:'bold',color:'#fff',padding:10}}>Please copy OXE Token smart contract address and import it to your preferred wallet</h1>
      <div style={{borderWidth:1,borderColor:'#fff',width:'100%'}}></div><br/>
        <div style={{flex:1,display:'flex',flexDirection:'row'}}>
          <input type="text" value="0xB98f77BA3Ea0fF38B7B8FFAfE9777405f3D01bFA" id="myInput" disabled={"true"} style={{width:'80%',backgroundColor:'transparent',borderColor:'transparent',color:'#fff'}}/>
          <button
                  type="button"
                  onClick={myFunction}
                  // disabled={connection==true ? true : false}
                  style={{marginBottom:'1%'}}
                  className="text-white mt-2 border-[1px] p-2 border-[#49add2] hover:bg-[#49add2] rounded-full cursor-pointer"
                >
                  Copy
                </button>
        </div>
      </div>
        
      </Modal>
          </div>
          
        </div>
      </div>
      }
    </div>
  )
}

export default App;


{/* <div className="Apps">
        <Navbar/>
         <div className="Sidebar ">
         <ul className="sidebarList">
         {sidebarData.map((val,key)=>{
            return <li className="row cursor-pointer" key={key} onClick={()=>{window.location.pathname=val.link}}>
                      {" "}
                      <img id="icon" src={val.icon} style={{height:20,width:20}}/>
                      {" "}
                      <div id="title">{val.title}</div> 
                    </li>
          })}
         </ul>
         </div>
      </div> */}