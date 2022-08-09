import React, { useContext, useState, useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

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

const Welcome = () => {
  const { currentAccount, connectWallet, connectWalletNew, handleChange, sendTransaction, formData, isLoading, colors, alertsOne, connection, setAlertOne, oxeAmountTot, oxeCon } = useContext(TransactionContext);
  const [getAmount, setAmount] = useState(0);
  const [hide, setHide] = useState(false);
  const [alerts, setAlerts] = useState('Minimum Contribution $50, Maximum Contribution $2000');
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })
  const [chooseWallet, setChooseWallet] = useState(false);

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

  const handleSubmit = (e) => {
    const { amount, message, token } = formData;
    if( Number(amount)>=Number(50) && Number(amount)<=Number(2000)){
      e.preventDefault();
      if (!amount) return;
      setAlerts('Minimum Contribution $50, Maximum Contribution $2000');
      sendTransaction();
    }else{
      setAlerts('Minimum Contribution $50, Maximum Contribution $2000');
      setAlertOne('');
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
     
          
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Join OXE Token <br />Private Sale
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          As an $OXE token holder, You will be empowered to acquire plots of land and properties in the OWNERverse - a metaverse by 0xeMETA, become LandOWNER and monetize Your digital assets.
<br/>Additionally, You can generate income by staking your $OXE tokens through 0xe Wallet - a secure, multi-chain crypto wallet.<br/>
0xe Wallet will be launched after $OXE token being listed on an exchange platform.
          </p>
          <br/>
          <div style={{color:'#fff'}}>Fund raising currency: <div style={{color:'#fff',fontWeight:'bold'}}>USDT / BUSD</div></div>
          {!currentAccount && (
            <button
              type="button"
              onClick={()=>{
                // connectWallet();
                openModal1();
                alert('gggg')
                }}
              className="flex flex-row justify-center items-center my-5 bg-[#49add2] p-3 rounded-full cursor-pointer hover:bg-[#45acc9]"
            >
              {/* <AiFillPlayCircle className="text-white mr-2" /> */}
              <p className="text-white text-base font-semibold">
                Connect MetaMask Wallet
              </p>
            </button>
          )}
         
          <button
              type="button"
              onClick={connectWalletNew}
              className="flex flex-row justify-center items-center my-5 bg-[#49add2] p-3 rounded-full cursor-pointer hover:bg-[#45acc9]"
            >
              {/* <AiFillPlayCircle className="text-white mr-2" /> */}
              <p className="text-white text-base font-semibold">
                Disconnect
              </p>
            </button>
          

          {windowDimenion.winWidth>640 ? <div className="grid sm:grid-cols-4 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>Start</div>
            <div className={companyCommonStyles}>End</div>
            <div className={companyCommonStyles}> Private Sale Price</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>Session Supply</div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>20/06/2022</div>
            <div className={companyCommonStyles}>30/06/2022</div>
            <div className={companyCommonStyles}>$0.5</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>5,100,000</div>
          </div>
          :
          <div className="grid sm:grid-cols-4 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>Start</div>
            <div className={companyCommonStyles}>20/06/2022</div>
            <div className={companyCommonStyles}>End</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>30/06/2022</div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>Private Sale Price</div>
            <div className={companyCommonStyles}>$0.5</div>
            <div className={companyCommonStyles}>Session Supply</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>5,100,000</div>
          </div>
          }
          <br/>
          <h1 className="text-3xl sm:text-5xl text-white py-1">
           OXE Reward Scheme
          </h1>
          <br/>
          <div style={{color:'#fff'}}>Private sale investors will get additional rewards on top of their total contribution.</div>
          <br/>
          <div style={{color:'#fff'}}>The Rewards Scheme</div>
         
            {windowDimenion.winWidth>640 ? <div className="grid sm:grid-cols-4 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>$50 - $499</div>
            <div className={companyCommonStyles}>$500 - $999</div>
            <div className={companyCommonStyles}>$1000 - $1999</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>$2000</div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>2% Bonus</div>
            <div className={companyCommonStyles}>5% Bonus</div>
            <div className={companyCommonStyles}>10% Bonus</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>15% Bonus</div>
          </div>
          :
          <div className="grid sm:grid-cols-4 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>$50 - $499</div>
            <div className={companyCommonStyles}>2% Bonus</div>
            <div className={companyCommonStyles}>$500 - $999</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>5% Bonus</div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>$1000 - $1999</div>
            <div className={companyCommonStyles}>10% Bonus</div>
            <div className={companyCommonStyles}>$2000</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>15% Bonus</div>
          </div>
          }
        </div>

       {hide ? <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            {alerts!='' && <div style={{color:'#49add2',textAlign:'left',width:'100%'}}>{alerts}</div>}
            <Input placeholder="Amount" name="amount" type="number" handleChange={handleChange} />
            {/* <Input placeholder="Select Token" name="token" type="number" handleChange={handleChange} /> */}
            <div className="p-1.5 sm:w-94 w-full flex flex-col justify-start items-center blue-glassmorphism" style={{height:43,justifyContent:'center',borderRadius:2,borderColor:'transparent'}}>
            <select  name="select" onChange={(e) => handleChange(e, 'select')} style={{borderWidth:0,borderRadius:2,width:'100%',opacity:0.7,color:'#fff',elevation:-5,backgroundColor:'transparent',height:40,}}>
              <option value={'USDT'}>USDT</option>
              <option value={'BUSD'}>BUSD</option>
              <option value={'BNB'}>BNB</option>
            </select>
            </div>
           
            <Input placeholder="OXE Amount" editable={true} value={`${Number(formData.message)!=0 ? formData.message+ " + " : "OXE Amount" }${Number(formData.message)!=0 ? (oxeCon==1 ? "2% Reward = " : oxeCon==2 ? "5% Reward = " : oxeCon==3 ? "10% Reward = " : oxeCon==4 ? "15% Reward = " : "0% Reward = ") : "" }${Number(formData.message)!=0 ? oxeAmountTot : ""}`} name="message" type="text" handleChange={handleChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {alertsOne!='' && <div style={{color:colors,width:'100%',textAlign:'left'}}>{alertsOne}</div>}
            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={connection==true ? true : false}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Buy OXE
                </button>
              )}
          </div>
        </div>
        :
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                <img src='../../images/icon.png' style={{height:200,width:200}} />
        </div>
        }
      </div>
     
    </div>
  );
};

export default Welcome;
