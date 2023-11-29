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
    name: "hospitalReports",
    imgUrl: dashboard,
  },
  {
    name: "addReport",
    imgUrl: createCampaign,
  },
  {
    name: "viewUserReports",
    imgUrl: payment,
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
