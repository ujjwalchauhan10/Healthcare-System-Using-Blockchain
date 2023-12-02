import React from "react";

import { navlinks } from "../../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="logo" className="w-1/2 h-12" />
    ) : (
      <img
        src={imgUrl}
        alt="logo"
        className={`w-1/2 h-12 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = ({ active, setActive }) => {
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[80vh]">
      <div className="flex-1 flex flex-col justify-between items-center bg-[#f0f0f0] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={active}
              handleClick={() => {
                if (!link.disabled) {
                  setActive(link.name);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
