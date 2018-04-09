import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <Menu size="huge" color="olive" inverted style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">
          <i class="hand peace icon" />
          以太坊项目众筹平台演示
        </a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">浏览目前所有众筹项目</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
