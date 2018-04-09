import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Label, Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns: campaigns };
  }

  /*
  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
  }
  **/

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: <Link route={`https://rinkeby.etherscan.io/address/${address}`}>
        <a style={{'font-size': '20px','color': 'grey'}} target="view_window">合约地址: {address}</a></Link>,
        meta:<p/>,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>详情</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3> 目前正在进行的众筹项目列表 </h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="创建一个新众筹"
                icon="add circle"
                primary
                labelPosition="left"
              />
            </a>
          </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
