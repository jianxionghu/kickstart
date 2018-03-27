import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x1F24b8B92A1A40Ee12885C9fB06b4771904fD7D2"
);

export default instance;
