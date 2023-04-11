import React, { useEffect, useState } from "react";
import { Badge, Button, Menu, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
const { Item } = Menu;
function Header() {
  const [path, setPath] = useState("/");
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log("click ", e);
    setMenu(e.key);
  };

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const handleLogout = async () => {
    navigate("/");
  };

  return (
    <>
      <Row
        type="flex"
        justify="middle"
        align="space-between"
        style={{
          backgroundColor: "#ffffff",
          alignItems: "center",
          width: "100%",
          height: "80px",
          borderBottom: "1px solid lightgrey",
        }}
      >
        <Col
          style={{
            paddingLeft: "40px",
            backgroundColor: "#ffffff",
            alignItems: "center",
            fontSize: "20px",
          }}
        >
          <Link className="menuitem" to="/todo">
            GROCERY
          </Link>
        </Col>

      </Row>
    </>
  );
}

export default Header;