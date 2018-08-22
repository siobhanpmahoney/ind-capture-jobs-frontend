import React from 'react'
import MyJobsList from './MyJobsList'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link, withRouter, HashRouter} from 'react-router-dom';
import Select from 'react-select';

class MyJobsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filterSelection: {},
      sortSelection: null
    }
  }



  filterSelect = (event) => {
    let filterName = event.target.name
    let filterValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    let currentState = Object.assign({},
      this.state.filterSelection
    );
    if (event.target.value != '') {
      currentState[filterName] = filterValue
    } else {
      delete currentState[filterName];
    }
    this.setState({
      filterSelection: currentState
    })
  }

  showJobs = () => {
    if (this.state.filterSelection == {}) {
      return this.props.savedJobs
    } else {
      let filters = Object.keys(this.state.filterSelection)
      let jobs = this.props.savedJobs.slice(0)
      filters.forEach((f) => {
        jobs = jobs.filter((job) => job[f] == this.state.filterSelection[f])
      })

      return jobs
    }
  }


  render() {
    const displayJobs = this.showJobs()
    const industries = this.props.savedIndustries.map((industry) => {
        return {value: industry.name, label: industry.name,  name: "company_industry"}
      })

    return (
      <div className="jobSearchContainer">
        <h2 className="page-header">Saved Jobs</h2>

        <div className="job-filter-wrapper">
          <div className="jobFilters">

              <div className="job-filter-criteria">
                  <div className="job-filter-header">
                    Industry
                  </div>

                  <Select
                    onChange={this.filterSelect}
                    options={industries}
                    className="filter-input select-input"
                    multiple
                    isMulti
                    />









          <span className="appliedStatus">
            <label>Applied? <input type="checkbox" name="applied_status" onChange={this.filterSelect} /></label>

          </span>
        </div>
        </div>

        <div>
        <MyJobsList user = {this.props.user} savedJobs={displayJobs} savedCompanies={this.props.savedCompanies} savedNotes={this.props.savedNotes} loadSavedJob={this.props.loadSavedJob} />
        </div>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    currentUser: state.user.currentUser,
    savedJobs: state.user.savedJobs,
    savedCompanies: state.user.savedCompanies,
    savedNotes: state.user.savedNotes,
    savedBookmarks: state.user.savedBookmarks,
    savedCategories: state.user.savedCategories,
    savedIndustries: state.user.savedIndustries
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyJobsContainer));
