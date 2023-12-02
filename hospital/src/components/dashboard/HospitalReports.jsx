import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context";
import DocCard from "../UI/docCard/DocCard";
import { fetchHospitalReports } from "../../web3";

const HospitalReports = () => {
  const { address } = useStateContext();
  const [reports, setReports] = useState([]);

  const setReportsData = async () => {
    try {
      const data = await fetchHospitalReports();
      setReports(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (address !== "") {
      setReportsData();
    }
  }, [address]);
  return (
    <div>
      <div className="text-[#0f0f0f] font-bold p-2 pb-5">Hospital Reports</div>
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

export default HospitalReports;
