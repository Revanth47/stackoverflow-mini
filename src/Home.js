import React from "react";
import config from "./config";
import { stringify } from "query-string";
import QuestionCard from "./Question/Card";
import Loader from "./common/Loader";
import ErrorComp from "./common/ErrorComp";
import LazyLoad from "./common/LazyLoad";

class Home extends React.Component {
  state = {
    data: null,
    page: 1,
    pagesize: 10,
    total: 0,
    order: "desc",
    sort: "activity",
    loading: true,
    error: false
  };

  componentDidMount() {
    this.apiCall();
  }

  apiCall = () => {
    const { page, pagesize, order, sort } = this.state;
    const params = stringify({
      filter: "!9Z(-x-Q)8",
      site: config.site,
      page,
      pagesize,
      order,
      sort
    });
    fetch(`${config.base}/questions?${params}`)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then(data => {
        this.setState(prevState => ({
          data: [...(prevState.data || []), ...(data.items || [])],
          loading: false,
          total: data.total
        }));
      })
      .catch(e => this.setState({ error: true, loading: false }));
  };

  loadMoreRows = () => {
    if (!this.state.loading) {
      this.setState(
        prevState => ({
          page: prevState.page + 1,
          loading: true,
          error: false
        }),
        this.apiCall
      );
    }
  };

  handleFilterChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        loading: true,
        error: false,
        page: 1,
        data: []
      },
      this.apiCall
    );
  };

  renderFilters() {
    return (
      <div className="filters">
        <div className="filter sort">
          <label htmlFor="filter-sort">Sort By</label>
          <select
            value={this.state.sort}
            name="sort"
            id="filter-sort"
            onChange={this.handleFilterChange}
          >
            <option value="activity">activity</option>

            <option value="votes">votes</option>
            <option value="creation">creation</option>
          </select>
        </div>

        <div className="filter sort">
          <label htmlFor="filter-sort">Order By</label>
          <select
            value={this.state.order}
            name="order"
            id="filter-sort"
            onChange={this.handleFilterChange}
          >
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </div>

        <div className="filter sort">
          <label htmlFor="filter-sort">Page No.</label>
          <input
            name="page"
            type="number"
            min={0}
            value={this.state.page}
            onChange={this.handleFilterChange}
          />
        </div>

        <div className="filter sort">
          <label htmlFor="filter-sort">Page Size</label>
          <input
            name="pagesize"
            type="number"
            min={0}
            value={this.state.pagesize}
            onChange={this.handleFilterChange}
          />
        </div>
      </div>
    );
  }

  renderQuestions() {
    if (this.state.error) {
      return <ErrorComp />;
    }
    if (this.state.loading && this.state.page === 1) {
      return <Loader />;
    }
    if (!this.state.data) {
      return null;
    }

    return (
      <div className="question-list">
        <LazyLoad
          height="80vh"
          total={this.state.total}
          currentTotal={this.state.data.length}
          loadMoreRows={this.loadMoreRows}
        >
          {this.state.data.map(item => (
            <QuestionCard allowClick item={item} />
          ))}
        </LazyLoad>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="filters-container">{this.renderFilters()}</div>
        <div className="questions-container">{this.renderQuestions()}</div>
      </div>
    );
  }
}

export default Home;
