import React, { useEffect, useState } from "react";
import { ethers, Contract, providers, utils, Wallet } from "ethers";
import { contractABI, contractAddress, contractABINew, contractABIUsdt } from "../utils/constants";
import Web3 from "web3";
// import WalletConnectProvider from "@walletconnect/web3-provider";
export const TransactionContext = React.createContext();

const { ethereum } = window;
const contractAddressUsdt = '0x55d398326f99059fF775485246999027B3197955'; //USDT contract address
const contractAddressBusd = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'; //BUSD contract address
const contractAddressWalk = '0xB98f77BA3Ea0fF38B7B8FFAfE9777405f3D01bFA'; //OXE contract address
const privateKey      = String(import.meta.env.VITE_PRIVATE_KEY);         //The private key
const toAddress       = '0xeF43DaCEfa1b35Ab0eC6Ab65f19A7585A5284B6E'; // to address 
const fromAddress     = '0xc11CC264C002d0Aca02a2FD96151eE751B425093'; // from address
const contractABIWalk = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const contractABIBusd = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const web3js = new Web3(new Web3.providers.HttpProvider(String(import.meta.env.VITE_APP_URL))); // MainNet - https://bsc-dataseed.binance.org/  testnet - https://data-seed-prebsc-1-s1.binance.org:8545

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "", select: "USDT" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [transactionsNew, setTransactionsNew] = useState([]);
  const [token, setToken] = useState(null);
  const [tokenOx, setTokenOx] = useState(0);
  const [tokenUSDT, setTokenUSDT] = useState(0);
  const [tokenBUSD, setTokenBUSD] = useState(0);
  const [tokenOXE, setTokenOXE] = useState(0);
  const [loading, setLoading] = useState(false);
  const [oxeAmount, setOxeAmount] = useState(0);
  const [oxeAmountTot, setOxeAmountTot] = useState(0);
  const [oxeCon, setOxeCon] = useState('');
  const [alertsOne, setAlertOne] = useState('');
  const [colors, setColor] = useState('');
  const [tokenOxUsdt, setTokenOxUsdt] = useState(0);
  const [tokenOXEUsdt, setTokenOXEUsdt] = useState(0);
  const [selected, setSelected] = useState(false);
  const [connection, setConnection] = useState(false);
  const [walletCon, setWalletCon] = useState(false);
  const [chooseWallet, setChooseWallet] = useState(false);

  const handleChange = async(e, name) => {
    console.log(e.target.value);
    if(name=='amount'){
      let val = e.target.value;
      setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
      
        let oxeA = val * 12.5;
        if( Number(val)>=Number(50) && Number(val)<=Number(499)){
          console.log('1.1')
          var ats = (Number(oxeA)/100)*5
          var amt = Number(Number(oxeA)+Number(ats))
          console.log(amt)
          setOxeAmountTot(amt)
          setOxeCon(1)
        }else if( Number(val)>=Number(500) && Number(val)<=Number(999)){
          console.log('2.1')
          var ats = (Number(oxeA)/100)*10
          var amt = Number(Number(oxeA)+Number(ats))
          setOxeAmountTot(amt)
          setOxeCon(2)
          console.log(amt)
        }else if( Number(val)>=Number(1000) && Number(val)<=Number(1999)){
          console.log('3.1')
          var ats = (Number(oxeA)/100)*15
          var amt = Number(Number(oxeA)+Number(ats))
          setOxeAmountTot(amt)
          setOxeCon(3)
          console.log(amt)
        }else if( Number(val)==Number(2000)){
          console.log('4.1')
          var ats = (Number(oxeA)/100)*20
          var amt = Number(Number(oxeA)+Number(ats))
          setOxeAmountTot(amt)
          setOxeCon(4)
          console.log(amt)
        }else{
          console.log('5.1')
          var amt = Number(oxeA)
          setOxeAmountTot(amt)
          setOxeCon(5)
          console.log(amt)
        }
        setformData((prevState) => ({ ...prevState, ['message']: oxeA }));
        console.log('value',oxeA);
        setOxeAmount(oxeA);
      }
    
    // else if(name=='select'){
    //   if(String(e.target.value)=='BNB'){
    //     setSelected(true);
    //     console.log(true);
    //   }else{
    //     setSelected(false);
    //     console.log(false);
    //   }
     
    // }
    else{
      setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
  };


  const checkIfWalletIsConnect = async () => {
    try {
      // getTransactions(currentAccount);
      if (!ethereum) return console.log("Please Open From PC Browser.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnection(false);
        setColor('white')
        setAlertOne('')
        setCurrentAccount(accounts[0]);
        console.log('Wallet Connected',accounts[0]);
        getTransactions(currentAccount);
        getTOKENBalanceOf();
        setWalletCon(false)
        setInterval(async()=>{
          const accountsNew = await ethereum.request({ method: "eth_accounts" });
          console.log(accountsNew[0]);
          if (accountsNew[0] !== undefined) {
          console.log(accountsNew[0],String(accountsNew[0]),String(currentAccount));
          }else if(currentAccount==''){
            console.log('else',accountsNew[0],String(accountsNew[0]),String(currentAccount));
            window.location.reload();
          }else{
            console.log('final',accountsNew[0],String(accountsNew[0]),String(currentAccount));
          }
        },2000)
        try {

          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          });
          // let getData = await ethereum.request({ method: "eth_requestAccounts" });
          // console.log(getData);
          // await ethereum.request({
          //   method: "wallet_watchAsset",
          //   params: {
          //     type: "ERC20",
          //     options: {
          //       address: contractAddressWalk,
          //       symbol: 'OXE',
          //       decimals: '18',
          //     },
          //   },
          // });
          
        } catch (switchError) {
          console.log(switchError);
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x38', // 61- testnet 56- mainnet
                    chainName: 'BNB',
                    rpcUrls: ['https://bsc-dataseed.binance.org/'] /* ... */, 
                  },
                ],
              });
              // let getData = await ethereum.request({ method: "eth_requestAccounts" });
              // console.log(getData);
              // await ethereum.request({
              //   method: "wallet_watchAsset",
              //   params: {
              //     type: "ERC20",
              //     options: {
              //       address: contractAddressWalk,
              //       symbol: 'OXE',
              //       decimals: '18',
              //     },
              //   },
              // });
            } catch (addError) {
              console.log(addError);
            }
          }
        }
        

      } else {
        console.log("No accounts found");
        // setConnection(true);
        // setColor('white')
        // setAlertOne('No accounts found')
      }
    } catch (error) {
      setConnection(true);
      setColor('white')
      setAlertOne('')
      console.log('connection error',error);
    }
  };

  const connectWalletNew = async () => {
    alert('disconnect')
    await web3js.clearCachedProvider();
    window.location.reload();
  }

  function isMobileDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  }

  const connectWallet = async (data) => {
    setWalletCon(data)
    connectWalletAfter(data)
    console.log('connect Wallet',data);
  }

  const connectWalletAfter = async (data) => {
    try {
      if(isMobileDevice()){
      console.log('mobile')
        var providers = new WalletConnectProvider.default({
          rpc: { 
            56: "https://bsc-dataseed.binance.org/",
          },
          // bridge: 'https://bridge.walletconnect.org',
        });
        await providers.enable();
        const web3s = new Web3(providers);
        window.w3 = web3s
        var accounts  = await web3s.eth.getAccounts();
        console.log(accounts[0])
        setCurrentAccount(accounts[0])
        getTransactions(accounts[0]);
        getTOKENBalanceOf();
      }else{
        if(data){
          console.log('after if')
          setWalletCon(true)
          var providers = new WalletConnectProvider.default({
            rpc: { 
              56: "https://bsc-dataseed.binance.org/",
            },
            // bridge: 'https://bridge.walletconnect.org',
          });
          await providers.enable();
          const web3s = new Web3(providers);
          window.w3 = web3s
          var accounts  = await web3s.eth.getAccounts();
          console.log(accounts[0])
          getTransactions(accounts[0]);
          getTOKENBalanceOf();
          setCurrentAccount(accounts[0])
        }else{
          console.log('after else');
          setWalletCon(false)
          if (!ethereum) return console.log("Please Open From PC Browser.");
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
          setCurrentAccount(accounts[0]);
          window.location.reload();
        }
      }
       
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const claim = async() => {
    if(isMobileDevice()){
      
    }else{
      if(walletCon){

      }else{
        let getData = await ethereum.request({ method: "eth_requestAccounts" });
        console.log(getData);
        await ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: contractAddressWalk,
              symbol: 'OXE',
              decimals: '18',
            },
          },
        });
      }
    }
  }

  const sendTransaction = async() => {
    if(isMobileDevice()){
      sendTransactionMobile();
      console.log('1')
    }else{
      if(walletCon){
        sendTransactionMobile();
        console.log('2')
      }else{
        sendTransactionWeb();
        console.log('3')
      }
    }
  }

  const sendTransactionWeb = async () => {
    console.log('transaction started')
    setColor('white')
    setAlertOne('Please wait for transaction')
    // GetBal();
    setIsLoading(true);
    try {
      const { addressTo, amount, message, select } = formData;
      console.log(select)
      if(select=='USDT'){
        // var contract = new web3js.eth.Contract(contractABIUsdt , contractAddressUsdt, {from: toAddress} );
        // var value = await contract.methods.balanceOf(toAddress).call();
        // let num = ethers.utils.parseEther(value)._hex
        console.log('usdt')
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
           const signer = provider.getSigner();
          //  var amt = Number(amount) * (10**18);
            const decimals = 18;
            const input = Number(amount);
            const amt = ethers.utils.parseUnits(String(input), decimals)
           console.log(amt,amount)
          var contract = new ethers.Contract(contractAddressUsdt, contractABIUsdt, provider);
          await contract.connect(signer).transfer(toAddress, String(amt))
          .then(res=>{
            console.log('result');
            console.log(res);
            setTimeout(()=>{
              transFunc();
            },10000)
          })
          .catch(e=>{
            console.log('Error');
            console.log(e);
            setIsLoading(false);
            // alert(e.data.message || e.message); execution reverted: BEP20: transfer amount exceeds balance
            setColor('#49add2')
            let err = e.data.message || e.message
            setAlertOne(String(err)=='execution reverted: BEP20: transfer amount exceeds balance' ? 'Insufficient tokens balance.' : e.data.message || e.message)
          })
        } else {
          console.log("No ethereum object transaction else");
          setColor('#49add2')
          setAlertOne('Something went wrong!')
          setIsLoading(false);
        }
        // transFunc();
      }else if(select=='BUSD'){
        console.log('BUSD')
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
           const signer = provider.getSigner();
          //  var amt = Number(amount) * (10**18);
           const decimals = 18;
           const input = Number(amount);
           const amt = ethers.utils.parseUnits(String(input), decimals)
           console.log(amt,amount)
          var contract = new ethers.Contract(contractAddressBusd, contractABIBusd, provider);
          await contract.connect(signer).transfer(toAddress, String(amt))
          .then(res=>{
            console.log('result');
            console.log(res);
            setTimeout(()=>{
              transFunc();
            },10000)
          })
          .catch(e=>{
            console.log('Error');
            console.log(e);
            setIsLoading(false);
            // alert(e.data.message || e.message);
            setColor('#49add2')
            let err = e.data.message || e.message
            setAlertOne(String(err)=='execution reverted: BEP20: transfer amount exceeds balance' ? 'Insufficient tokens balance.' : e.data.message || e.message)
          })
        } else {
          console.log("No ethereum object transaction else");
          setIsLoading(false);
          setColor('#49add2')
          setAlertOne('Something went wrong!')
        }
      }else{
        alert('Not Supported')
        setIsLoading(false);
      }

    } catch (error) {
      console.log(error);
      setIsLoading(false);
      connectWallet();
      throw new Error("Wallet not connected");
    }
  };

  const sendTransactionMobile = async () => {
    console.log('transaction started')
    setColor('white')
    setAlertOne('Please wait for transaction')
    // GetBal();
    setIsLoading(true);
    try {
      const { addressTo, amount, message, select } = formData;
      console.log(select)
      if(select=='USDT'){
        console.log('usdt')
        
            const decimals = 18;
            const input = Number(amount);
            const amt = ethers.utils.parseUnits(String(input), decimals)
           console.log(amt,amount)
          // var contract = new ethers.Contract(contractAddressUsdt, contractABIUsdt, provider);
          // await contract.connect(signer).transfer(toAddress, String(amt))
          var providers = new WalletConnectProvider.default({
            rpc: { 
              56: "https://bsc-dataseed.binance.org/",
            },
            // bridge: 'https://bridge.walletconnect.org',
          });
          await providers.enable();
          const web3s = new Web3(providers);
          window.w3 = web3s
          var accounts  = await web3s.eth.getAccounts();
          console.log(accounts[0])
          // var contract = new ethers.Contract(contractAddressUsdt, contractABIUsdt, providers);
          var myContract = new web3s.eth.Contract(contractABIUsdt,contractAddressUsdt);
          console.log(myContract)
          myContract.methods.transfer(toAddress, String(amt)).send({from: accounts[0], gas: 100000},function (error, result){ 
            if(!error){
                console.log(result);
                console.log('result');
                console.log(result);
                setTimeout(()=>{
                  transFunc();
                },10000)
                // handleSuccessTrue();
            } else{
                console.log(error);
                setColor('#49add2')
                setAlertOne(String(error))
                // web3s.eth.getBalance(accounts[0], (err,bal) => { alert('Your account has ' + web3s.utils.fromWei(bal, 'ether') + ', Insufficient funds for gas * price + value on your wallet')});
                // handleSuccessFalse();
            }
           
        }).catch(e=>{
          console.log('Error');
          console.log(e);
          setIsLoading(false);
          // alert(e.data.message || e.message); execution reverted: BEP20: transfer amount exceeds balance
          setColor('#49add2')
          setAlertOne(String(e))
        })
        
        // transFunc();
      }else if(select=='BUSD'){
        console.log('BUSD')
        
          const decimals = 18;
          const input = Number(amount);
          const amt = ethers.utils.parseUnits(String(input), decimals)
         console.log(amt,amount)
        // var contract = new ethers.Contract(contractAddressUsdt, contractABIUsdt, provider);
        // await contract.connect(signer).transfer(toAddress, String(amt))
        var providers = new WalletConnectProvider.default({
          rpc: { 
            56: "https://bsc-dataseed.binance.org/",
          },
          // bridge: 'https://bridge.walletconnect.org',
        });
        await providers.enable();
        const web3s = new Web3(providers);
        window.w3 = web3s
        var accounts  = await web3s.eth.getAccounts();
        console.log(accounts[0])
        // var contract = new ethers.Contract(contractAddressUsdt, contractABIUsdt, providers);
        var myContract = new web3s.eth.Contract(contractABIBusd,contractAddressBusd);
        console.log(myContract)
        myContract.methods.transfer(toAddress, String(amt)).send({from: accounts[0], gas: 100000},function (error, result){ 
          if(!error){
              console.log(result);
              console.log('result');
              console.log(result);
              setTimeout(()=>{
                transFunc();
              },10000)
              // handleSuccessTrue();
          } else{
              console.log(error);
               console.log(error);
                setColor('#49add2')
                setAlertOne(String(error))
              // web3s.eth.getBalance(accounts[0], (err,bal) => { alert('Your account has ' + web3s.utils.fromWei(bal, 'ether') + ', Insufficient funds for gas * price + value on your wallet')});
              // handleSuccessFalse();
          }
         
      }).catch(e=>{
        console.log('Error');
        console.log(e);
        setIsLoading(false);
        // alert(e.data.message || e.message); execution reverted: BEP20: transfer amount exceeds balance
        // setIsLoading(false);
          // alert(e.data.message || e.message); execution reverted: BEP20: transfer amount exceeds balance
          setColor('#49add2')
          setAlertOne(String(e))
      })
     
      }else{
        alert('Not Supported')
        setIsLoading(false);
      }

    } catch (error) {
      console.log(error);
      setIsLoading(false);
      connectWallet();
      throw new Error("Wallet not connected");
    }
  };

  const transFunc = async() => {
      console.log('token transaction started')
      //creating Contract Object
      var contract = new web3js.eth.Contract(contractABIWalk,contractAddressWalk, {from: '0x610274729C1a4f5Ee3435432CD960e90e9896140' } ); 

      const { addressTo, amount, message, select } = formData;

      if( Number(amount)>=Number(50) && Number(amount)<=Number(499)){
        console.log('1')
        var ats = (Number(oxeAmount)/100)*5
        var amt = Number(Number(oxeAmount)+Number(ats)) * (10**18);
        console.log( Number(Number(oxeAmount)+Number(ats)))
      }else if( Number(amount)>=Number(500) && Number(amount)<=Number(999)){
         console.log('2')
        var ats = (Number(oxeAmount)/100)*10
        var amt = Number(Number(oxeAmount)+Number(ats)) * (10**18);
        console.log( Number(Number(oxeAmount)+Number(ats)))
      }else if( Number(amount)>=Number(1000) && Number(amount)<=Number(1999)){
         console.log('3')
        var ats = (Number(oxeAmount)/100)*15
        var amt = Number(Number(oxeAmount)+Number(ats)) * (10**18);
        console.log( Number(Number(oxeAmount)+Number(ats)))
      }else if( Number(amount)==Number(200)){
         console.log('4')
        var ats = (Number(oxeAmount)/100)*20
        var amt = Number(Number(oxeAmount)+Number(ats)) * (10**18);
        console.log( Number(Number(oxeAmount)+Number(ats)))
      }

      console.log('amount to be sent',amt,oxeAmount,Number(Number(oxeAmount)+Number(amt)));

      var data = contract.methods.transfer(currentAccount, String(amt)).encodeABI(); //Create the data for token transaction.

      var rawTransaction = {"to": contractAddressWalk, "gas": 100000, "data": data, "value": 0 }; 

      web3js.eth.accounts.signTransaction(rawTransaction, privateKey)
          .then(signedTx => {
              console.log(signedTx)
              web3js.eth.sendSignedTransaction(signedTx.rawTransaction)
            })
          .then(req => { 
                  /* The trx was done. Write your acctions here. For example getBalance */
                  console.log('end',req)
                  setIsLoading(false);
                  setColor('green')
                  getTransactions(currentAccount);
                  getTOKENBalanceOf();
                  setAlertOne('Transaction Success')
                  return true;  
          }).catch(e=>{
            setIsLoading(false);
            setColor('#49add2')
            setAlertOne('Please contact support team')
          })
  }

  useEffect(() => {
    checkIfWalletIsConnect();
    getTOKENBalanceOfOXE();
    getTOKENBalanceOfUSDT();
    getTOKENBalanceOfBUSD();
    setInterval(()=>{
      getTOKENBalanceOfOXE();
      getTOKENBalanceOfUSDT();
      getTOKENBalanceOfBUSD();
    },30000)
  }, []);


  function ReverseString(str) {
  
    // Check input
    if(!str || str.length < 2 || 
            typeof str!== 'string') {
        return str; 
    }
      
    // Take empty array revArray
    const revArray = [];
    const length = str.length - 1;
      
    // Looping from the end
    for(let i = length; i >= 0; i--) {
        revArray.push(str[i]);
    }
      
    // Joining the array elements
    return revArray.join('');
}

  const getTransactions = async(address) => {
    let data = await fetch(`https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=TK376MNEHGTPR97THK196YZ1H15Y9Z9875`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        Accept:"application/json"
      }
    });
    let resp = await data.json();
    let array = [];
    console.log(resp,'halik')
    for(let obj of resp.result){
      if(String(obj.to)=="0x55d398326f99059ff775485246999027b3197955" || String(obj.to)=="0xe9e7cea3dedca5984780bafc599bd69add087d56"){
        console.log('hello',obj)
        array.push({'hash':obj.hash,'from':obj.from,'to':obj.to,'time':obj.timeStamp,'value':obj.value})
      }
    }
    console.log(resp,array);
    setTransactions(array);
  }

  
  const getTOKENBalanceOf = async() => {
    var contract = new web3js.eth.Contract(contractABIWalk,contractAddressWalk, {from: currentAccount } ); 
    // var contract = new web3js.eth.Contract(contractABIUsdt,contractAddressUsdt, {from: currentAccount } ); 
    let bal =  await contract.methods.balanceOf(currentAccount).call(); 
    // const gweiValue = ethers.utils.formatUnits(bal, "gwei");
    var amt = Number(bal) * (10**18);
    var sp = String(Number(amt)).split("e")[0];
    var newBal = Number(sp) * 0.5;
    setTokenOx(sp)
    setTokenOxUsdt(newBal)
    console.log(bal,newBal,sp)      
    return amt                 
  }  

  const getTOKENBalanceOfOXE = async() => {
    var contract = new web3js.eth.Contract(contractABIWalk,contractAddressWalk, {from: '0x610274729C1a4f5Ee3435432CD960e90e9896140' } ); 
    let bal =  await contract.methods.balanceOf('0x610274729C1a4f5Ee3435432CD960e90e9896140').call(); 
    var amt = Number(bal) * (10**18);
    var sp = String(Number(amt)).split("e")[0];
    let data = ReverseString(bal)
    let first = String(data).slice(18)
    let datas = ReverseString(String(first));

    let datak = ReverseString(bal)
    let news = String(datak).substring(0, 18);
    let datan = ReverseString(String(news));

    let strn = String(datas+"."+datan);
    let fl = parseFloat(strn).toFixed(2);
    let minus = Number(5100000)-Number(fl)
    var newBal = Number(minus) * 0.5;
    setTokenOXE(Number(minus).toFixed(2))
    setTokenOXEUsdt(Number(newBal).toFixed(2))
    // console.log(bal,newBal,sp,datas,news,strn,fl)      
    return amt                 
  }  
  const getTOKENBalanceOfUSDT = async() => {
    var contract = new web3js.eth.Contract(contractABIUsdt,contractAddressUsdt, {from: '0xeF43DaCEfa1b35Ab0eC6Ab65f19A7585A5284B6E' } ); 
    let bal =  await contract.methods.balanceOf('0xeF43DaCEfa1b35Ab0eC6Ab65f19A7585A5284B6E').call(); 
    var amt = Number(bal) * (10**18);
    var sp = String(Number(amt)).split("e")[0];

    let data = ReverseString(bal)
    let first = String(data).slice(18)
    let datas = ReverseString(String(first));

    let datak = ReverseString(bal)
    let news = String(datak).substring(0, 18);
    let datan = ReverseString(String(news));

    let strn = String(datas+"."+datan);
    let fl = parseFloat(strn).toFixed(2);
    console.log('usdt',data,first,datas,datak,news,datan,strn,fl);
    setTokenUSDT(fl)
    return amt                 
  }  
  const getTOKENBalanceOfBUSD = async() => {
    var contract = new web3js.eth.Contract(contractABIBusd,contractAddressBusd, {from: '0xeF43DaCEfa1b35Ab0eC6Ab65f19A7585A5284B6E' } ); 
    let bal =  await contract.methods.balanceOf('0xeF43DaCEfa1b35Ab0eC6Ab65f19A7585A5284B6E').call(); 
    var amt = Number(bal) * (10**18);
    var sp = String(Number(amt)).split("e")[0];

    let data = ReverseString(bal)
    let first = String(data).slice(18)
    let datas = ReverseString(String(first));

    let datak = ReverseString(bal)
    let news = String(datak).substring(0, 18);
    let datan = ReverseString(String(news));

    let strn = String(datas+"."+datan);
    let fl = parseFloat(strn).toFixed(2);

    setTokenBUSD(fl)
    return amt                 
  }  

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        connectWalletNew,
        transactions,
        tokenOxUsdt,
        claim,
        walletCon,
        setWalletCon,
        transactionsNew,
        currentAccount,
        tokenOx,
        tokenUSDT,
        tokenBUSD,
        tokenOXEUsdt,
        tokenOXE,
        isLoading,
        sendTransaction,
        getTOKENBalanceOf,
        handleChange,
        formData,
        alertsOne,
        colors,
        connection,
        setAlertOne,
        oxeAmountTot,
        oxeCon,
        selected,
        chooseWallet, 
        setChooseWallet
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
