import { ethers } from "ethers";
import SoulBoundToken from "../web3/abi.json";

const contractAddress = "0x3A6cf5F0C4908076e409510BBF8b33d04090Bb00";

export const fetchUserReports = async (userAddress) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      SoulBoundToken.output.abi,
      signer
    );
    const resp = await contract.getUserTokenURIsByMinter(userAddress);
    return resp;
  } catch (error) {
    return error;
  }
};

export const fetchHospitalReports = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      SoulBoundToken.output.abi,
      signer
    );
    const resp = await contract.getMinterTokenURIs();
    return resp;
  } catch (error) {
    return error;
  }
};

export const addReport = async (to,uri) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      SoulBoundToken.output.abi,
      signer
    );
    const resp = await contract.safeMint(to,uri);
    return resp;
  } catch (error) {
    return error;
  }
};
