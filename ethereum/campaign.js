import web3 from "./web3";
import Campaign from "./build/Campaign.json";

/*
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x3465AEb1972e4f294FA9a40cB5841a37a6CC222A"
);
**/

export default address => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};
