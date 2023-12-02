import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context";
import DocCard from "../UI/docCard/DocCard";
import FormField from "../UI/input/FormField";
import { fetchUserReports } from "../../web3";
import { Button } from "../UI/Button";

const ViewUserReports = () => {
  const [form, setForm] = useState({
    userAddress: "",
  });
  const [reports, setReports] = useState([]);

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
      <div className="bg-[#f5f5f5] flex justify-center items-center flex-col rounded-[10px] sm:p-3 px-4">
        {/* <div className=""> */}
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
        {/* </div> */}
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

export default ViewUserReports;
