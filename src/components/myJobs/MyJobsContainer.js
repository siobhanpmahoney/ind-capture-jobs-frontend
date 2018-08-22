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
      filterSelection: {
        applied: "",
        industry: ""
      },
      sortSelection: null
    }
  }

  filterIndustrySelect = (event) => {
    
    let industry = event[0].value
    console.log(event[0].value)
    let currentState = Object.assign({}, this.state.filterSelection)
    currentState["industry"] = industry
    this.setState({
      filterSelection: currentState
    }, this.showJobs)
  }




  filterSelect = (event) => {

    let filterName =  event.target.name
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

  // showJobs = () => {
  //   if (!this.state.filterSelection.applied && !this.state.filterSelection.industry) {
  //     return this.props.savedJobs
  //   } else {
  //     let filters = Object.keys(this.state.filterSelection)
  //     let jobs = []
  //     filters.forEach((f) => {
  //        jobs = Object.assign({}, jobs, this.props.savedJobs.slice(0).filter((job) => job[f] == this.state.filterSelection[f]))
  //     })
  //
  //     return jobs
  //   }
  // }

  showJobs = () => {
    if (this.state.filterSelection.applied == "" && this.state.filterSelection.industry == "") {
        return this.props.savedJobs
      } else {
        let filteredJobs = this.props.savedJobs.slice(0)
        debugger
        if (this.state.filterSelection.industry != "") {
          filteredJobs = filteredJobs.filter((job) => {
            return job.company_industry == this.state.filterSelection.industry
          })
        }
        return filteredJobs
      }
  }


  render() {
    const displayJobs = this.showJobs()
    const industries = this.props.savedIndustries.map((industry) => {
      console.log(industry.name)
        return {value: industry.name, label: industry.name,  name: "company_industry"}
      })
      console.log(this.props.savedJobs)

    return (
      <div className="jobSearchContainer">
        <h2 className="page-header">
          Saved Jobs
        </h2>

        <div className="job-filter-wrapper">
          <div className="jobFilters">
            <div className="job-filter-criteria">
              <div className="job-filter-header">
                Industry
              </div>

              <Select
                onChange={this.filterIndustrySelect}
                options={industries}
                className="filter-input select-input"
                multiple
                isMulti
                />
            </div>

            <div className="job-filter-criteria">
              <div className="job-filter-header">
                Applied?
              </div>

              <input type="checkbox" name="applied" onChange={this.filterSelect} />
            </div>




        </div>
        </div>

        <MyJobsList user = {this.props.user} savedJobs={displayJobs} savedCompanies={this.props.savedCompanies} savedNotes={this.props.savedNotes} loadSavedJob={this.props.loadSavedJob} />
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
