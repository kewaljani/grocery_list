import React from "react";
import { Layout } from "antd";
const { Footer: Foot } = Layout;

function Footer() {
  return (
    <Foot style={{ textAlign: "center" }}>
      Groccery website {new Date().getFullYear()} Created by Kewal
    </Foot>
  );
}

export default Footer;
