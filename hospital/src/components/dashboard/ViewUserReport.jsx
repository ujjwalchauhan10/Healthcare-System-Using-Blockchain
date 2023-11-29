import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context";
import DocCard from "../UI/docCard/DocCard";
import { fetchUserReports } from "../../web3";

const ViewUserReports = () => {
  const { address } = useStateContext();
  const [reports, setReports] = useState([]);

  const setReportsData = async () => {
    try {
      const data = await fetchUserReports();
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
      User Reports
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

export default ViewUserReports;
