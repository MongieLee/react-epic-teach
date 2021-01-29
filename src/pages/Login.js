import React from "react";
import { useStores } from "../store";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
};

const Component = () => {
  const { AuthStore } = useStores();
  const history = useHistory();
  const onFinish = (values) => {
    AuthStore.setUsername(values.username);
    AuthStore.setPassword(values.password);
    AuthStore.login().then(() => {
      history.push("/");
    });
  };

  return (
    <Wrapper>
      <Title>登陆</Title>
      <Form {...layout} name="basic" onFinish={onFinish}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登陆
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Component;
