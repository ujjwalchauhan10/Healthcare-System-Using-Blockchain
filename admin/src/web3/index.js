import { ethers } from "ethers";
import SoulBoundToken from "../web3/abi.json";

const contractAddress = "0xcc1333b24E017116592C88568F147c09487E045e";

export const fetchMinters = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      SoulBoundToken.output.abi,
      signer
    );
    const resp = await contract.getMintersAddresses();
    return resp;
  } catch (error) {
    return error;
  }
};

export const addMinter = async (name, minterAddress) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      SoulBoundToken.output.abi,
      signer
    );
    const resp = await contract.addMinter(name, minterAddress);
    return resp;
  } catch (error) {
    return error;
  }
};

export const removeMinter = async (minterAddress) => {
  console.log(minterAddress);
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      SoulBoundToken.output.abi,
      signer
    );
    const resp = await contract.removeMinter(minterAddress);
    return resp;
  } catch (error) {
    return error;
  }
};
