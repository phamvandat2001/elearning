'use client';

import React from "react";
import Layout from 'antd/es/layout/index';
import Menu from "antd/es/menu/index";

import classes from "./index.module.scss";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const { Content, Header, Sider } = Layout;

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ height: "100%" }}>
      <Sider width="15%" collapsible className={classes.sider}>
        <Menu />
      </Sider>
      <Layout>
        <Header className={classes.header}>
          Top header
        </Header>
        <Content className={classes.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
