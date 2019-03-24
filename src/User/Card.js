import React from "react";
import PropTypes from "prop-types";

const UserCard = props => (
  <a href={props.user.link}>
    <div className="user-card">
      <div className="user-profile">
        <div className="user-avatar">
          <img src={props.user.profile_image} alt="User Avatar" />
        </div>
        <div className="user-name">
          {props.user.display_name}({props.user.reputation || 0})
        </div>
      </div>
    </div>
  </a>
);

UserCard.propTypes = {
  user: PropTypes.shape({
    link: PropTypes.string,
    reputation: PropTypes.number,
    profile_image: PropTypes.string,
    display_name: PropTypes.string
  })
};

export default UserCard;
