import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStateContext } from "../../context";
import { fetchMinters, removeMinter } from "../../web3";
import { Button } from "../UI/Button";

const Minters = () => {
  const { address } = useStateContext();
  const [minters, setMinters] = useState([]);

  const setMintersData = async () => {
    try {
      const data = await fetchMinters();
      setMinters(data);
    } catch (error) {}
  };

  const removeMinterFromContract = async (address) => {
    if (prompt("Enter DELETE to confirm") === "DELETE") {
      try {
        const  data  = await removeMinter(address);
        if (data) {
          alert("Minter Is Being Removed!");
        }
      } catch (error) {
        alert("Something Went Wrong!");
      }
      setMintersData();
    }
  };

  useEffect(() => {
    if (address !== "") {
      setMintersData();
    }
  }, [address]);
  return (
    <div>
      <div className="text-[#0f0f0f] font-bold p-2 pb-5">Approved Minters</div>
      <div>
        {minters && minters[0] && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Minter Wallet Address</TableCell>
                  <TableCell align="center">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {minters.map((minter, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{minter}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        className="rounded"
                        buttonText={"Remove"}
                        onClick={() => removeMinterFromContract(minter)}
                      />
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

export default Minters;
