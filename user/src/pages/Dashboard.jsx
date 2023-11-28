import React from "react";
import { useStateContext } from "../context";
const Dashboard = () => {
  const { connectMetamask, address, fetchUserReports } = useStateContext();
  return (
    <div>
      <div>
        <button onClick={connectMetamask}>Button</button>
        <div>{address}</div>
        <button onClick={fetchUserReports}>ButtonReports</button>
      </div>
    </div>
  );
};

export default Dashboard;
