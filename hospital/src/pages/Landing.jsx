import React from "react";
import { Navbar } from "../components/navbar";
import Typed from "react-typed";
import { Button } from "../components/UI/Button";
export const Landing = () => {
  return (
    <div className="min-h-[100vh]">
      <div>
        <Navbar />
      </div>
      <div>
        <div className="text-black max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
          <p className="text-[#0f0f0f] font-bold p-2">
            GROWING WITH SMART REPORTS
          </p>
          <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
            Grow with innovation
          </h1>
          <div>
            <p className="md:text-5xl sm:text-4xl text-xl font-bold py-6">
              {" "}
              Introducing Fast , Flexible and Secure Reports using
            </p>
            <Typed
              className="md:text-5xl sm:text-4xl text-xl font-bold text-[#005A34] py-2"
              strings={["Blockchain", "Solidity", "Polygon"]}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
            <br />
            <div className="center py-7">
              <Button
                variant="contained"
                className="rounded"
                buttonText={"Get Started"}
                //onClick={}
                //disabled={}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
