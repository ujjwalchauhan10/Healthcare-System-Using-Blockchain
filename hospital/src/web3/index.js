import { ethers } from "ethers";
import SoulBoundToken from "../web3/abi.json";

const contractAddress = "0x925B1f0CC6e385849b2d7202799843cc71084605";

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
