import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Space,
  Table,
  Tag,
  Tooltip,
  Row,
  Col,
  Modal,
  Form,
  Button,
  Input,
  Card,
  Select,
  Typography,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Layout from "../../Layout/index";
const { Text } = Typography;

function ToDo() {
  const formRef = useRef(null);
  const [data, setData] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/grocery");
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
    formRef.current.resetFields();
  };
  const handleAddCancle = () => {
    setIsAddVisible(false);
  };

  const editeModaleData = (values) => {
    setCurrData(values);
    setIsModalVisible(true);
  };

  const onEditSubmit = (values) => {
    const newData = {
      title: values?.title,
      description: values?.description,
      price: Number(values?.price),
      quantity: Number(values?.quantity),
    };

    var url = "http://localhost:3001/api/grocery/" + currData?.id;
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-type": "application/json",
      },
    };

    const updateData = async () => {
      try {
        await fetch(url, requestOptions).then((res) =>
          res.json().then((res) => {
            setIsModalVisible(false);
            window.location.reload();
          })
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    updateData();
    formRef.current.resetFields();
  };

  const onNewSubmit = (values) => {
    const newData = {
      title: values?.title,
      description: values?.description,
      price: Number(values?.price),
      quantity: Number(values?.quantity),
    };
    var url = "http://localhost:3001/api/grocery/create";
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-type": "application/json",
      },
    };
    const addData = async () => {
      try {
        await fetch(url, requestOptions).then((res) =>
          res.json().then((res) => {
            setData(res.data);
            setIsModalVisible(false);
            window.location.reload();
          })
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    addData();
  };

  const onDeleteIteam = (value) => {
    var id = value.id;
    var url = "http://localhost:3001/api/grocery/" + id;
    const deleteData = async () => {
      try {
        await fetch(url, { method: "DELETE" }).then((res) =>
          res.json().then(() => {
            window.location.reload();
          })
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    deleteData();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Notes",
      dataIndex: "description",
      key: "description",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action, data) => (
        <Space size="middle">
          <Tooltip title="Edit Iteam">
            <EditOutlined onClick={() => editeModaleData(data)} />
          </Tooltip>
          <Tooltip title="Delete Iteam">
            <DeleteOutlined onClick={() => onDeleteIteam(data)} />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Layout>
        <Row style={{ marginTop: "2em" }} justify="center" gutter={32}>
          <Col span={18}>
            <Button
              data-testid="addButton"
              style={{ margin: "10px 10px", display: "flex" }}
              size="large"
              onClick={() => setIsAddVisible(true)}
            >
              Add Grocery
            </Button>
          </Col>
          <Col span={18}>
            <Table columns={columns} dataSource={data} pagination={false} />
          </Col>
        </Row>

        <Modal
          title="Add grocery details"
          open={isAddVisible}
          footer={null}
          onCancel={handleAddCancle}
        >
          <Form
            layout="vertical"
            name="basic"
            ref={formRef}
            onFinish={onNewSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24}>
                <Card style={{ padding: "1.0em" }}>
                  <Form.Item
                    label="Item Name"
                    name="title"
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter Grocery Name.",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Grocery Name" />
                  </Form.Item>
                  <Form.Item
                    label="Quantity"
                    name="quantity"
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter Quantity.",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Quantity" />
                  </Form.Item>
                  <Form.Item
                    label="Price"
                    name="price"
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter Price.",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Price" />
                  </Form.Item>
                  <Form.Item
                    label="Add Note"
                    name="description"
                    style={{ marginBottom: "12px" }}
                  >
                    <Input placeholder="Add Note" />
                  </Form.Item>
                  <Form.Item style={{ marginTop: "2em" }}>
                    <div style={{ display: "flex", float: "right" }}>
                      <Button
                        type="link"
                        style={{ margin: "0px 10px" }}
                        size="large"
                        onClick={() => setIsAddVisible(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="primary" htmlType="submit" size="large">
                        Submit
                      </Button>
                    </div>
                  </Form.Item>
                </Card>
              </Col>
            </Row>
          </Form>
        </Modal>
        <Modal
          title="Edit grocery details"
          open={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <Form
            layout="vertical"
            name="basic"
            ref={formRef}
            initialValues={{
              remember: true,
              id: currData?.id,
              title: currData?.title,
              quantity: currData?.quantity,
              price: currData?.price,
              description: currData?.description,
            }}
            onFinish={onEditSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24}>
                <Card style={{ padding: "1.0em" }}>
                  <Form.Item
                    label="Item Name"
                    name="title"
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter Grocery Name.",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Grocery Name" />
                  </Form.Item>
                  <Form.Item
                    label="Quantity"
                    name="quantity"
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter Quantity.",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Quantity" />
                  </Form.Item>
                  <Form.Item
                    label="Price"
                    name="price"
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter Price.",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Price" />
                  </Form.Item>
                  <Form.Item
                    label="Add Note"
                    name="description"
                    style={{ marginBottom: "12px" }}
                  >
                    <Input placeholder="Add Note" />
                  </Form.Item>
                  <Form.Item style={{ marginTop: "2em" }}>
                    <div style={{ display: "flex", float: "right" }}>
                      <Button
                        type="link"
                        style={{ margin: "0px 10px" }}
                        size="large"
                        onClick={() => setIsModalVisible(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="primary" htmlType="submit" size="large">
                        Submit
                      </Button>
                    </div>
                  </Form.Item>
                </Card>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Layout>
    </>
  );
}

export default ToDo;
