import React from "react";
import type { Metadata } from "next";

import classes from "./index.module.scss";

const Dashboard = () => {
  return <div className={classes.dashboard}>
    <h1>Dashboard title</h1>
    <i className="fa fa-4x fa-edit text-primary"></i>
    <i className="fa fa-4x fa-save text-danger"></i>
    <i className="fa fa-4x fa-regular fa-envelope text-info"></i>
    <i className="fa fa-4x fa-regular fa-comment text-success"></i>
    <i className="fa fa-4x fa-regular fa-message text-warning"></i>
  </div>
};

export const metadata: Metadata = {
  title: 'Dashboard',
  description: '',
}

export default Dashboard;