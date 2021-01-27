import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../store';
import { Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';
// const Component = observer(() => {
//   const { AuthStore } = useStores();
//   const inputRef = useRef(null);
//   const bindChange = () => {
//     console.log(inputRef.current);
//     AuthStore.setUsername(inputRef.current.value);
//   };
//   return (
//     <>
//       <div>Register {AuthStore.values.username}</div>
//       <input onChange={bindChange} ref={inputRef} />
//     </>
//   );
// });
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
    offset: 8,
    span: 16,
  },
};

const Component = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateUsername = (rule, value) => {
    if (/\W/.test(value)) {
      return Promise.reject('不能出现字母数字下划线以外的字符');
    }
    if (value.length < 3) {
      return Promise.reject('用户名不能长度小于3');
    }
    if (value.length > 10) {
      return Promise.reject('用户名不能长度大于10');
    }
    return Promise.resolve();
  };

  const confirmPassword = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('password' === value)) {
        return Promise.resolve();
      }
      return Promise.reject('两次密码不匹配');
    },
  });

  return (
    <Wrapper>
      <Title>注册</Title>
      <Form
        {...layout}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='用户名'
          name='username'
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
            {
              validator: validateUsername,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='密码'
          name='password'
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
            {
              min: 4,
              message: '最少4个字符',
            },
            {
              max: 10,
              message: '最大10个字符',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='确认密码'
          name='confirmPassword'
          rules={[
            {
              required: true,
              message: '请二次确认密码!',
            },
            confirmPassword,
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Component;
