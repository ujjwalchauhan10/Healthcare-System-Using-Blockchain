import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormField from "../UI/input/FormField";
import { fetchUserReports } from "../../web3";
import { Button } from "../UI/Button";

const ViewUserReports = () => {
  const [form, setForm] = useState({
    userAddress: "",
  });
  const [reports, setReports] = useState([]);
  const hospitals = [
    "Hospital A",
    "Hospital B",
    "Hospital C",
    "Hospital D",
    "Hospital E",
  ];
  const date = ["01/02/23", "13/04/22", "21/02/23", "11/12/23", "31/01/23"];
  const category = ["Discharge", "Track", "Urgent", "Progress", "Summary"];

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchUserReports(form.userAddress);
    if (data) {
      setReports(data);
      alert("Report Fetched Successfully!");
    } else {
      alert("Something Went Wrong!");
    }
  };
  return (
    <div>
      <div className="text-[#0f0f0f] font-bold p-2 pb-5">User Reports</div>
      <div className="border-[2px] border-[#f0f0f0] bg-[#f9f9f9] flex justify-center items-center flex-col rounded-[10px] sm:p-3 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-[90%] mt-[30px] flex flex-col gap-[20px]"
        >
          <FormField
            labelName="User Wallet Address *"
            value={form.userAddress}
            handleChange={(e) => handleFormFieldChange("userAddress", e)}
          />
          <div className="center">
            <Button
              type="submit"
              variant="contained"
              className="rounded"
              buttonText={"Get Reports"}
            />
          </div>
        </form>
      </div>
      <div className="mt-4">
        {reports && reports[0] && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Hospital Name</TableCell>
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
                      {hospitals[Math.floor(Math.random() * (4 - 0 + 1)) + 0]}
                    </TableCell>
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
    </div>
  );
};

export default ViewUserReports;
