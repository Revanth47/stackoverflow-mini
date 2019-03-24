import React from "react";
import PropTypes from "prop-types";
import Loader from "./Loader";

class LazyLoad extends React.Component {
  ref = React.createRef();

  state = {
    loadMore: true
  };

  componentDidUpdate(prevProps) {
    if (prevProps.currentTotal !== this.props.currentTotal) {
      this.setState({
        loadMore: true
      });
    }
  }

  onScroll = () => {
    if (this.ref.current) {
      const { scrollHeight, scrollTop, clientHeight } = this.ref.current;
      const { currentTotal, total } = this.props;
      if (
        scrollHeight - scrollTop - 50 <= clientHeight &&
        total > currentTotal
      ) {
        this.setState({ loadMore: false }, () => this.props.loadMoreRows());
      }
    }
  };

  render() {
    return (
      <div
        className={this.props.className}
        ref={this.ref}
        onScroll={this.onScroll}
        style={{ height: this.props.height, overflowY: "auto" }}
      >
        {this.props.children}
        {!this.state.loadMore && this.props.loader}
      </div>
    );
  }
}

LazyLoad.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  currentTotal: PropTypes.number.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loader: PropTypes.node,
  loadMoreRows: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};

LazyLoad.defaultProps = {
  className: "",
  height: 300,
  loader: (
    <Loader loading height={100}>
      Hi
    </Loader>
  )
};

export default LazyLoad;
