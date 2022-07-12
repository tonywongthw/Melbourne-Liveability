import React from 'react';
import {Layout, Menu} from 'antd';
import "antd/dist/antd.min.css";
import "./app.css";
import {Outlet, Link} from 'react-router-dom';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;
export class App extends React.Component {
    render() {
        return(
            <Layout>
                <Header style={{background: "white"}}>
                    <Menu mode="horizontal">
                        <Menu.Item><nav><Link to={"/mortgage"}>Mortgage</Link></nav></Menu.Item>
                        <Menu.Item><nav><Link to={"/rent"}>Rent</Link></nav></Menu.Item>
                        <Menu.Item><nav><Link to={"/family"}>Family income</Link></nav></Menu.Item>
                        <Menu.Item><nav><Link to={"/personal"}>Personal income</Link></nav></Menu.Item>
                        <Menu.Item><nav><Link to={"/household"}>Household income</Link></nav></Menu.Item>
                        <Menu.Item><nav><Link to={"/graphpage"}>Bar Charts</Link></nav></Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <Outlet />
                </Content>

            </Layout>
        );
    }
}
