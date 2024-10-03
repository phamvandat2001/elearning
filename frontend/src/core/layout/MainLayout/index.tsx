'use client';

import React from "react";
import Layout from 'antd/es/layout/index';
import Menu from "antd/es/menu/index";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";

import classes from "./index.module.scss";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const { Content, Header, Sider } = Layout;

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const items: ItemType<MenuItemType>[] = [
    {
      icon: <i className="fa fa-regular fa-chart-bar" />,
      label: 'Dashboard',
      key: 'dashboard',
      onClick: () => {}
    },
    {
      icon: <i className="fa fa-regular fa-circle-user" />,
      label: 'User',
      key: 'user',
    },
    {
      icon: <i className="fa fa-regular fa-circle-user" />,
      label: 'Menu with submenu',
      key: 'menu-with-submenu',
      children: [1,2,3,4,5].map((i) => ({ key: i, label: `Option ${i}` })),
    }
  ];
  return (
    <Layout style={{ height: "100%" }}>
      <Sider width="15%" className={classes.sider} color="gray">
        <div className={classes.logo}></div>
        <Menu items={items} mode="inline" />
      </Sider>
      <Layout>
        <Header className={classes.header}>
          
        </Header>
        <Content className={classes.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
