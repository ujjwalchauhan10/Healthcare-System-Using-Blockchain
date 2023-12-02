import React, { useState } from "react";
import FormField from "../UI/input/FormField";
import { Button } from "../UI/Button";
import { addReport } from "../../web3";

const AddReport = () => {
  const [form, setForm] = useState({
    to: "",
    uri: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await addReport(form.to, form.uri);
    if (data) {
      setForm({
        to: "",
        uri: "",
      });
      alert("Report Minted Successfully!");
    } else {
      alert("Something Went Wrong!");
    }
  };

  return (
    <div>
      <div className="text-[#0f0f0f] font-bold p-2 pb-5">Add Report</div>
      <div className="bg-[#f5f5f5] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <FormField
            labelName="User Wallet Address *"
            value={form.to}
            handleChange={(e) => handleFormFieldChange("to", e)}
          />

          <FormField
            labelName="Report Link*"
            placeholder="Place report URL here"
            inputType="url"
            value={form.uri}
            handleChange={(e) => handleFormFieldChange("uri", e)}
          />
          <div className="center py-7">
            <Button
              type="submit"
              variant="contained"
              className="rounded"
              buttonText={"Mint Report"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReport;
