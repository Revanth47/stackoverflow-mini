import React from "react";
import PropTypes from "prop-types";
import QuestionCard from "./Card";
import config from "../config";
import ErrorComp from "../common/ErrorComp";
import Loader from "../common/Loader";
import { stringify } from "query-string";

class QuestionList extends React.Component {
  state = {
    data: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    this.apiCall();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.list) !== JSON.stringify(prevProps.list)) {
      this.setState(
        {
          loading: true,
          error: false
        },
        this.apiCall
      );
    }
  }

  apiCall = () => {
    const params = stringify({
      site: config.site
    });
    const ids = this.props.list.join(";");
    fetch(`${config.base}/questions/${ids}?${params}`)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then(data => this.setState({ data, loading: false }))
      .catch(() => this.setState({ error: true, loading: false }));
  };

  render() {
    if (this.state.error) {
      return <ErrorComp />;
    }
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <div className="question-list">
        {this.state.data.items.map(item => (
          <QuestionCard item={item} />
        ))}
      </div>
    );
  }
}

QuestionList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string)
};

export default QuestionList;
