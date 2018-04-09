import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Image, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    //console.log(summary);
    //console.log(props.query.address);
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        description:
          "众筹发起人(所有者)创建了本众筹合约，它可以发起一个提现请求。",
        meta: "众筹发起人(所有者)地址",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContribution,
        description: "每个参与众筹的人必须投入以下最低资金，并且获取投票权。",
        meta: "最低起投额度 (以wei为单位)"
      },
      {
        header: requestsCount,
        description:
          "合约发起人提现请求数量，提现请求必须得到50%投资人的同意，这个钱才能从智能合约里面提到指定地址。",
        meta: "目前已经有的请求付款数量"
      },
      {
        header: approversCount,
        description:
          "当前出资人的数量，每个出资人都有对提现请求批准的投票权利。",
        meta: "当前出资人的数量"
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        description: "这个数字代表当前众筹合约的未花费的资金数量。",
        meta: "当前众筹合约拥有的ETH数量（ether）"
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3> 众筹详情 </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={4}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>查看提现请求详情</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
