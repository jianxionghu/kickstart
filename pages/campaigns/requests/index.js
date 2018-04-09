import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);

    //注意这个requestCount是一个字符串
    const requestCount = await campaign.methods.getRequestCount().call();

    const approversCount = await campaign.methods.approversCount().call();

    //一个个Call返回一堆数组
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    //console.log(requests);
    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>当前这个众筹合约下的提现请求</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              添加一个提现请求
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>编号</HeaderCell>
              <HeaderCell>提现付款描述</HeaderCell>
              <HeaderCell>提现资金数量</HeaderCell>
              <HeaderCell>收款方地址</HeaderCell>
              <HeaderCell>已批准数/总投资人数</HeaderCell>
              <HeaderCell>批准</HeaderCell>
              <HeaderCell>提现</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div> 找到 ( {this.props.requestCount} ) 条提现支付请求 </div>
      </Layout>
    );
  }
}

export default RequestIndex;
