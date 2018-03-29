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
          "The manager created this campaign and can create request to withdraw money",
        meta: "Address of manager",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContribution,
        description:
          "You must contribute at least this much of wei to become an approver",
        meta: "Minimum Contribution (wei unit)"
      },
      {
        header: requestsCount,
        description:
          "A request tryies to withdraw money from he contract. Requests must be approved by approvers",
        meta: "Number of Requests"
      },
      {
        header: approversCount,
        description:
          "Number of people who have already donated to this campaign",
        meta: "Number of Approvers (wei)"
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        description:
          "The balance is how much money this campaign has left to spend.",
        meta: "Campaign Balance （ether）"
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3> CampaignShow </h3>
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
                  <Button primary>View Requests</Button>
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
