import React, { useContext, useState, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Modal from 'react-modal';
import "../App.css";
import logo from "../../images/logo.png";

const customStyles = {
    content: {
      height:'50%',
      width:'35%',
      marginLeft:'35%',
      marginTop:'10%'
    },
  };
  const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Login = () => {
    const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading, colors, alertsOne, connection, setAlertOne, oxeAmountTot, oxeCon } = useContext(TransactionContext);
    const [chooseWallet, setChooseWallet] = useState(false);
    const [windowDimenion, detectHW] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
    })
    
    const detectSize = () => {
      detectHW({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
      })
    }
  
    useEffect(() => {
      window.addEventListener('resize', detectSize)
      return () => {
        window.removeEventListener('resize', detectSize)
      }
    }, [windowDimenion])
    
    function openModal1() {
      setChooseWallet(true);
      console.log('open')
    }
  
    function closeModal1() {
      setChooseWallet(false);
    }

    function isMobileDevice() {
      return 'ontouchstart' in window || 'onmsgesturechange' in window;
    }

    return(
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-0">
          <div className="flex flex-1.1 justify-start items-start flex-col mf:mr-10">
          
            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1 p-5">
            OxeMeta is a blockchain-based ecosystem that bridges the gap between physical and METAphysical World.
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base px-5">
            OxeMETA is developing OWNERverse - a community focused virtual world, a metaverse, with its own decentralized economy powered by OXE token. The OWNERverse community members will be empowered to acquire their OWN digital assets, create experiences and monetize them.
            </p>
            <br/>
          <div style={{color:'#fff',fontSize:22,fontWeight:'bold'}} className="px-5">$OXE Token Private Sale Details</div>
            {windowDimenion.winWidth>640 ? <div className="grid sm:grid-cols-4 grid-cols-2 w-full mt-10 px-5">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>Start</div>
            <div className={companyCommonStyles}>End</div>
            <div className={companyCommonStyles}> Private Sale Price</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>Session Supply</div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>01/07/2022</div>
            <div className={companyCommonStyles}>30/07/2022</div>
            <div className={companyCommonStyles}>$0.08</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>2,550,000</div>
          </div>
          :
          <div className="grid sm:grid-cols-4 grid-cols-2 w-full mt-10 px-5">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>Start</div>
            <div className={companyCommonStyles}>01/07/2022</div>
            <div className={companyCommonStyles}>End</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>30/07/2022</div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>Private Sale Price</div>
            <div className={companyCommonStyles}>$0.08</div>
            <div className={companyCommonStyles}>Session Supply</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>2,550,000</div>
          </div>
          }
          <br/>
          <div style={{color:'#fff',fontSize:22,fontWeight:'bold'}} className="px-5">The Rewards Scheme</div>
            {windowDimenion.winWidth>640 ? <div className="grid sm:grid-cols-4 grid-cols-2 w-full mt-10 px-5">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>$50 - $499</div>
            <div className={companyCommonStyles}>$500 - $999</div>
            <div className={companyCommonStyles}>$1000 - $1999</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>$2000</div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>5% Bonus</div>
            <div className={companyCommonStyles}>10% Bonus</div>
            <div className={companyCommonStyles}>15% Bonus</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>20% Bonus</div>
          </div>
          :
          <div className="grid sm:grid-cols-4 grid-cols-2 w-full mt-10 px-5">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>$50 - $499</div>
            <div className={companyCommonStyles}>5% Bonus</div>
            <div className={companyCommonStyles}>$500 - $999</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>10% Bonus</div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>$1000 - $1999</div>
            <div className={companyCommonStyles}>15% Bonus</div>
            <div className={companyCommonStyles}>$2000</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>20% Bonus</div>
          </div>
          }
          
          </div>

          <div className="flex flex-col flex-0.9 items-center justify-start w-full mf:mt-2 mt-10">
            <div className="flex justify-start w-full px-5" style={{marginLeft:'-4%'}}>
                <img src={logo} alt="logo" className="" style={{width:200,height:50}} />
            </div>
            <br/>
            <h1 className="text-2xl sm:text-3xl text-white text-gradient py-1 w-full px-5">
            Welcome, <br />Let's get started!
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base px-5" style={{width:'100%'}}>
            Please connect your wallet using Binance Smart Chain (BSC) network.
            </p>
            {!currentAccount && (
            <div className="p-5" style={{width:'100%'}}>
            <button
              type="button"
              onClick={()=>{
                // connectWallet()
                if(isMobileDevice()){
                    connectWallet(true)
                }else{
                    openModal1();
                }
                
                }}
              className=""
              style={{borderColor:"#49add2",backgroundColor:"#49add2",borderWidth:1,justifyContent:"center",alignItems:"center",height:30,width:160,borderRadius:25}}
            >
              {/* <AiFillPlayCircle className="text-white mr-2" /> */}
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
            </div>
          )}
          </div>
          <div style={{justifyContent:'center',alignItems:'center'}}>
          <Modal
            isOpen={chooseWallet}
            onRequestClose={closeModal1}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
            className="blue-glassmorphismModal"
          >
            <div style={{justifyContent:'center',padding:10,alignItems:'center'}}> 
            <h1 style={{fontSize:20,fontWeight:'bold',color:'#fff',padding:10,textAlign:'center'}}>Please choose your preferred wallet</h1>
            <div style={{borderWidth:1,borderColor:'#fff',width:'100%'}}></div><br/>
              <div style={{flex:1,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <div style={{padding:20,justifyContent:'center',alignItems:'center'}} className="cursor-pointer" onClick={()=>{
                  closeModal1();
                  console.log('false')
                  connectWallet(false)}}>
                  <img src="../../images/fox_old.png" style={{height:100,width:100}}></img>
                  <div style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>MetaMask</div>
                  <div style={{fontSize:17,color:'#fff'}}>Connect to your MetaMask Wallet</div>
              </div>
              <div style={{padding:20,justifyContent:'center',alignItems:'center'}} className="cursor-pointer" onClick={()=>{
                  closeModal1();
                  console.log('true')
                  connectWallet(true)}}>
                  <img src="../../images/walletconnect-square-blue.png" style={{height:100,width:100,borderRadius:15}}></img>
                  <div style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Wallet Connect</div>
                  <div style={{fontSize:17,color:'#fff'}}>Scan with Wallet Connect</div>
              </div>
              </div>
            </div>
          </Modal>
          </div>
        </div>
      </div>
    )
  }

export default Login;