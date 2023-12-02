import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

export const navlinks = [
  {
    name: "minters",
    imgUrl: dashboard,
  },
  {
    name: "addMinter",
    imgUrl: createCampaign,
  },
  {
    name: "viewReports",
    imgUrl: payment,
    disabled: true,
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: profile,
    disabled: true,
  },
  {
    name: "logout",
    imgUrl: logout,
    disabled: true,
  },
];
