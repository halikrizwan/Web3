import abi from "./Transactions.json";
import HalikAbi from "./Halik.json";
import UsdtAbi from "./usdt.json";
import XashAbi from "./XASH.json";
import WalkAbi from "./Walk.json";

export const contractAddress = "0xfCCF80344a668b72ac4Be23513F0E9E4a35C84fA";
export const contractABI = abi.abi;
export const contractABINew = HalikAbi.output.abi;
export const contractABIUsdt = UsdtAbi.abi;
export const contractABIXASH = XashAbi.abi;
export const contractABIWalk = WalkAbi.abi;