import React, { useState } from "react";
import { Navbar, Sidebar } from "../components/navbar";
import Minters from "../components/dashboard/Minters";
import AddReport from "../components/dashboard/AddMinter";
import { useStateContext } from "../context";

const Dashboard = () => {
  const [active, setActive] = useState("minters");
  const { address } = useStateContext();
  return (
    <div className="min-h-[100vh]">
      <div>
        <Navbar />
      </div>
      <div className="relative sm:-8 p-4 bg-[#f8f8f8] flex flex-row">
        <div className="mr-10 relative">
          <Sidebar active={active} setActive={setActive} />
        </div>
        {address !== "" ? (
          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            {active === "minters" && <Minters />}
            {active === "addMinter" && <AddReport />}
          </div>
        ) : (
          <div className="w-full flex rounded-lg h-[20vh] justify-center items-center sm:text-4xl text-xl font-bold">
            Connect Wallet To Access Dashboard
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
