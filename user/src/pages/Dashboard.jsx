import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { Navbar } from "../components/Navbar";
import DocCard from "../components/UI/docCard/DocCard";
import { fetchUserReports } from "../web3";

const Dashboard = () => {
  const { address } = useStateContext();
  const [reports, setReports] = useState([]);

  const setReportsData = async () => {
    try {
      const data = await fetchUserReports();
      setReports([...data]);
    } catch (error) {}
  };

  useEffect(() => {
    if (address !== "") {
      setReportsData();
    }
  }, [address]);
  return (
    <div className="min-h-[100vh]">
      <div>
        <Navbar />
      </div>
      <div>
        {reports &&
          reports[0] &&
          reports.map((uri, index) => (
            <div key={index}>
              <DocCard uri={uri} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
