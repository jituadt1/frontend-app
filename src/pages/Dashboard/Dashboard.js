import React, { Component } from "react";
import "./Dashboard.scss";
import axios from "axios";
import { getToken, deleteToken } from "../../sagas/signInSaga";
import config from "../../API/config.json";

import {
  LeftSidebar,
  TransferModal,
  DoughnutChart,
  LineChart,
  ChartTable,
  TransactionTable,
  Footer
} from "./../../components";

class Dashboard extends Component {
  state = {
    data: {}
  };

  //this function will check if user is loggedin if not it redirects user to signin page
  componentDidMount() {
    console.log("Dashbord component called!");
    const tokens = getToken();
    console.log(tokens);
    if (tokens.username == "undefined" || tokens.username == "")
      return this.props.history.push("/signin");
    else this.handleAPIcall(tokens);
  }

  //it fetches user data like referral code from backend server
  handleAPIcall = async tokens => {
    const { data } = await axios.get(config.userDataAPI + tokens.username);
    this.setState({ data });
  };

  //handles logout function and deletes user cookies
  handleLogout = () => {
    deleteToken();
    this.props.history.push("/");
    window.location.reload();
  };

  render() {
    return (
      <div className="dashboard-container">
        <div className="navigation">
          <LeftSidebar
            user={this.state.data} //send props to sidebar - referral code
            handleLogout={this.handleLogout}
          />
        </div>
        <div className="content-wrapper" id="content-div">
          <div className="overview-container">
            <div className="overview-table">
              <ChartTable />
            </div>
            <div className="overview-graph">
              <DoughnutChart />
            </div>
          </div>
          <div className="graph-container">
            <LineChart />
          </div>
          <div className="table-container">
            <TransactionTable />
          </div>
          <div className="transfer-modal-container">
            <TransferModal />
          </div>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
