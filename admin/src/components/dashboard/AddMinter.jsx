import React, { useState } from "react";
import FormField from "../UI/input/FormField";
import { Button } from "../UI/Button";
import { addMinter } from "../../web3";

const AddMinter = () => {
  const [form, setForm] = useState({
    name: "",
    minterAddress: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await addMinter(form.name, form.minterAddress);
    if (data) {
      setForm({
        name: "",
        minterAddress: "",
      });
      alert("Minter Added Successfully!");
    } else {
      alert("Something Went Wrong!");
    }
  };

  return (
    <div>
      <div className="text-[#0f0f0f] font-bold p-2 pb-5">Add Minter</div>
      <div className="border-[2px] border-[#f0f0f0] bg-[#f9f9f9] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <FormField
            labelName="Minters Name *"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Minters Wallet Address*"
            value={form.minterAddress}
            handleChange={(e) => handleFormFieldChange("minterAddress", e)}
          />
          <div className="center py-7">
            <Button
              type="submit"
              variant="contained"
              className="rounded"
              buttonText={"Add Minter"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMinter;
