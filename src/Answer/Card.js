import React from "react";
import PropTypes from "prop-types";
import ReactHTMLParser from "react-html-parser";
import UserCard from "../User/Card";
import LastUpdated from "../common/LastUpdated";
import CreatedAt from "../common/CreatedAt";
import Score from "../common/Score";

class AnswerCard extends React.Component {
  render() {
    return (
      <div
        className={`answer-card ${
          this.props.item.is_accepted ? "accepted" : ""
        }`}
      >
        <div className="answer-title">
          {ReactHTMLParser(this.props.item.body)}
        </div>
        <div className="answer-meta">
          <div className="answer-extras">
            <LastUpdated time={this.props.item.last_activity_date} />
            <CreatedAt time={this.props.item.creation_date} />
            <Score score={this.props.item.score} />
          </div>
          <div className="answer-owner">
            <UserCard user={this.props.item.owner} />
          </div>
        </div>
      </div>
    );
  }
}

AnswerCard.propTypes = {
  item: PropTypes.shape({
    owner: PropTypes.object,
    is_accepted: PropTypes.bool,
    score: PropTypes.number,
    last_activity_date: PropTypes.number,
    creation_date: PropTypes.number,
    body: PropTypes.string
  })
};

export default AnswerCard;
