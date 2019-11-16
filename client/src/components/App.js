import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>New Survey</h2>
const Landing = () => <h2>Landing</h2>

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.props.fetchUser = this.props.fetchUser.bind(this);
  // }
  
  componentDidMount() {
    this.props.fetchUser();
  }
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);