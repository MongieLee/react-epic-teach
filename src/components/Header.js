import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { Button } from "antd";

const Header = styled.header`
  background-color: #1a2637;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 10px 100px;
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;
  &.active {
    border-bottom: 1px solid #fff;
  }
`;

const Logo = styled.img`
  height: 30px;
`;

const Login = styled.div`
  margin-left: auto;
`;

const StyleButton = styled(Button)`
  margin-left: 15px;
`;

export default function Component() {
  const [isLogin, setIsLogin] = useState(false);
  const x = useState(false);
  console.log(x);
  return (
    <Header>
      <Logo src={logo}></Logo>
      <nav>
        <StyledLink to="/" activeClassName="active" exact>
          首页
        </StyledLink>
        <StyledLink to="/history" activeClassName="active">
          上传历史
        </StyledLink>
        <StyledLink to="about" activeClassName="active">
          关于我们
        </StyledLink>
      </nav>
      <Login>
        {isLogin ? (
          <>
            MongieLee
            <StyleButton type="primary" onClick={() => setIsLogin(false)}>
              注销
            </StyleButton>
          </>
        ) : (
          <>
            <StyleButton type="primary" onClick={() => setIsLogin(true)}>
              登录
            </StyleButton>
            <StyleButton>注册</StyleButton>
          </>
        )}
      </Login>
    </Header>
  );
}

