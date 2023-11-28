import React, { useContext, createContext, useState } from "react";
import { ethers } from "ethers";
import SoulBoundToken from "../web3/abi.json";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const contractAddress = "0x925B1f0CC6e385849b2d7202799843cc71084605";

  const connectMetamask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => setAddress(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };

  const fetchUserReports = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        SoulBoundToken.output.abi,
        signer
      );
      const tokenURIs = await contract.getUserTokenURIs();
      console.log(tokenURIs);
      return tokenURIs;
    } catch (error) {
      return error;
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connectMetamask,
        fetchUserReports,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
