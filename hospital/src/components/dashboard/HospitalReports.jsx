import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStateContext } from "../../context";
import { fetchHospitalReports } from "../../web3";
import { Button } from "../UI/Button";
import { useRef } from "react";

const HospitalReports = () => {
  const { address } = useStateContext();
  const [reports, setReports] = useState([]);

  const date = ["01/02/23", "13/04/22", "21/02/23", "11/12/23", "31/01/23"];
  const category = [
    "Discharge",
    "Operative",
    "Diagnostic",
    "Progress",
    "Consultation",
  ];
  const refExport = useRef(null);

  const setReportsData = async () => {
    try {
      const data = await fetchHospitalReports();
      setReports(data);
    } catch (error) {}
  };

  const exportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," + reports.map((report) => report + "\n");
    if (refExport.current) {
      refExport.current.href = csvContent;
      refExport.current.download = `Reports.csv`;
      refExport.current.click();
    }
  };

  useEffect(() => {
    if (address !== "") {
      setReportsData();
    }
  }, [address]);
  return (
    <div>
      <div className="text-[#0f0f0f] font-bold p-2 pb-5">Hospital Reports</div>
      <a href="" hidden={true} ref={refExport}>
        Download
      </a>
      <div>
        {reports && reports[0] && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Report</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((uri, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {date[Math.floor(Math.random() * (4 - 0 + 1)) + 0]}
                    </TableCell>
                    <TableCell align="center">
                      {category[Math.floor(Math.random() * (4 - 0 + 1)) + 0]}
                    </TableCell>
                    <TableCell align="center">
                      {
                        <a href={uri} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="contained"
                            className="rounded"
                            buttonText={"View"}
                          />
                        </a>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      {reports && reports[0] && (
        <div className="flex items-center justify-center mt-3">
          <Button
            variant="contained"
            className="rounded"
            buttonText={"Download"}
            onClick={() => exportData()}
          />
        </div>
      )}
    </div>
  );
};

export default HospitalReports;
