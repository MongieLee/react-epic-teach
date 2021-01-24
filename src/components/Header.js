import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../logo.svg'
import styled from 'styled-components';

const Header = styled.header`
    background-color:#1A2637;
    display:flex;
    align-items:center;
    color:#fff;
    padding:10px 100px;
`

const StyledLink = styled(NavLink)`
    color:#fff;
    margin-left:30px;
    &.active{
        border-bottom:1px solid #fff;
    }
`

const Logo = styled.img`
    height:30px;
`

export default function Component() {
    return (
        <Header>
            <Logo src={logo}></Logo>
            <nav>
                <StyledLink to='/' activeClassName='active' exact>首页</StyledLink>
                <StyledLink to='/history' activeClassName='active'>上传历史</StyledLink>
                <StyledLink to='about' activeClassName='active'>关于我们</StyledLink>
            </nav>
        </Header>
    )
}
