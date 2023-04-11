import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import Layout from "../../Layout/index";
import { Card, Typography, Image } from "antd";
import { groceryData } from "./data";

import { Link } from "react-router-dom";
const { Meta } = Card;
const { Text } = Typography;

function HomePage() {
  const [data, setArray] = useState([]);
  const parentToChild = (newValue) => {
    newValue.count = 1
    var curId = newValue.id;
    var flag = 0;
    var objIndex = data.findIndex((data => data.id == curId));
    if (objIndex != -1) {
      flag = 1
      data[objIndex].count += 1
      setArray(data)
    }
    if (flag == 0) {
      setArray((array) => [...array, newValue])
    }
  }
  
  return (
    <>
      <Layout>
        <Row style={{ marginTop: "2em" }} justify="center" gutter={32}>
          {groceryData.map((groce) => (
            <Col span={6}>
              <Card hoverable style={{ marginTop: "2em" }}>
                <Image alt="example" src={groce.image} preview={false} style={{ height: "200px", width: "auto" }} />
                <Meta title={groce.title} description={groce.description} />
                <Text>Price {groce.price}</Text>
                <Button onClick={() => parentToChild(groce)}>Add Iteam</Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Link to="/cart" state={{ data: data }} className="link">
          Apple
        </Link>
      </Layout>
    </>
  );
}

export default HomePage;
