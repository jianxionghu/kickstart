import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import Layout from "../../../components/Layout";
import { Link, Router } from "../../../routes";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    errorMessage: "",
    loading: false
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address: address };
  }

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0]
        });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>返回</a>
        </Link>
        <h3>新建一个提现支付请求</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>请求提现支付的理由</label>
            <Input
              value={this.state.description}
              placeholder="比如需要支付供应商模具费..."
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>需要多少资金（ether）单位</label>
            <Input
              value={this.state.value}
              placeholder="0.1 eth"
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>收款人地址</label>
            <Input
              value={this.state.recipient}
              placeholder="0xbDBE2B6F9Df45CA3F321B20b7F6876a709D06B04"
              onChange={event =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>
          <Button loading={this.state.loading} primary>
            递交请求
          </Button>
          <Message error header="Oops" content={this.state.errorMessage} />
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
