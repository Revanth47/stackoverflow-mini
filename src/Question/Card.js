import React from "react";
import PropTypes from "prop-types";
import UserCard from "../User/Card";
import { Link } from "react-router-dom";
import LastUpdated from "../common/LastUpdated";
import CreatedAt from "../common/CreatedAt";

const Tag = props => <div className="question-tag">{props.title}</div>;

class QuestionCard extends React.Component {
  render() {
    return (
      <Link to={`/questions/${this.props.item.question_id}`}>
        <div
          className={`question-card ${
            this.props.allowClick ? "clickable" : ""
          }`}
        >
          <div className="question-title">{this.props.item.title}</div>
          <div className="question-tags">
            {this.props.item.tags.map(title => (
              <Tag title={title} />
            ))}
          </div>
          <div className="question-meta">
            <div className="question-extras">
              <div>
                <a className="question-link" href={this.props.item.link}>
                  View on stackoverflow
                </a>
              </div>
              <LastUpdated time={this.props.item.last_activity_date} />
              <CreatedAt time={this.props.item.creation_date} />
            </div>
            <div className="question-user">
              <UserCard user={this.props.item.owner} />
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

QuestionCard.propTypes = {
  item: PropTypes.shape({
    answer_count: PropTypes.number,
    creation_date: PropTypes.number.isRequired,
    is_answered: PropTypes.bool,
    last_activity_date: PropTypes.number,
    owner: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    view_count: PropTypes.number.isRequired,
    question_id: PropTypes.number.isRequired
  }),
  allowClick: PropTypes.bool
};

QuestionCard.defaultProps = {
  allowClick: false
};

export default QuestionCard;
