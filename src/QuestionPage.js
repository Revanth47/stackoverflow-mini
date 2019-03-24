import React from "react";
import PropTypes from "prop-types";
import config from "./config";
import { stringify } from "query-string";
import QuestionList from "./Question/List";
import AnswerList from "./Answer/List";
import Loader from "./common/Loader";
import ErrorComp from "./common/ErrorComp";

class QuestionPage extends React.Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.apiCall();
  }

  apiCall = () => {
    const params = stringify({
      site: config.site
    });
    const questionID = this.props.match.params.id;
    fetch(`${config.base}/questions/${questionID}/answers?${params}`)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then(data => this.setState({ data }))
      .catch(() => this.setState({ error: true, loading: false }));
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    if (this.state.error) {
      return <ErrorComp />;
    }
    if (!this.state.data) {
      return null;
    }
    const questions = [
      ...new Set(this.state.data.items.map(i => i.question_id))
    ];

    const answers = [...new Set(this.state.data.items.map(i => i.answer_id))];
    return (
      <div className="question-page">
        <div className="question-title-container">
          <QuestionList list={questions} />
        </div>
        <div className="answer-list-container">
          <AnswerList list={answers} />
        </div>
      </div>
    );
  }
}

QuestionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

export default QuestionPage;
