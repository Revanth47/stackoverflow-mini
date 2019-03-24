import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import QuestionPage from "./QuestionPage";

const Root = () => (
  <Router>
    <Switch>
      <Route path="/questions/:id" component={QuestionPage} />
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
);

Root.propTypes = {};

export default Root;
