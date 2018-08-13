import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { withRouter } from 'react-router'
import JobDescription from './JobDescription'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import { formatDate } from '../helpers'

class JobSearchResultItem extends React.Component {
  constructor(props) {
    super(props)
  }

  renderCategoryList = () => {
    let categories = this.props.job.categories.map((i) => {
      return i.name
    })
    return categories.join(" | ")
  }

  renderLocationList = () => {
    let locations = this.props.job.locations.map((i) => {
      return i.name
    })
    return locations.join(" | ")
  }

  saveJob = (event) => {
    event.preventDefault()
    let userId = this.props.currentUser.user.id
    let job = this.props.job
    debugger
    this.props.saveNewJob(userId, job)

  }

  dynamicIcon = () => {

    if (this.props.savedJobs.length < 1) {
      return (<i className="material-icons job-search-result-item-bookmark" onClick={this.saveJob} style={{color:"#FF5370", display:"inlineBlock", border:"2px"}}>bookmark_border</i>)
    } else {
      if (this.props.savedJobs.find((job) => {
        return job.museId == this.props.museJobId
      })) {
        return (<i className="material-icons job-search-result-item-bookmark" style={{color:"#FF5370", fontSize:"24px", display:"inlineBlock"}}>bookmark</i>)
      }
      else {
        return (<i className="material-icons job-search-result-item-bookmark" onClick={this.saveJob} style={{color:"#FF5370", display:"inlineBlock"}}>bookmark_border</i>)
      }}
    }

  render() {

    let p = this.props



    return (
      <div className="job-search-result-item-wrapper">

        <div className="job-search-result-item-text">
          <div className="job-search-result-item-company-name">
            {this.props.job.company.name}
          </div>

          {/*
            <div className="job-search-result-item-job-title">
            {this.props.job.name}
          </div>
          */}

          <Link className="job-search-result-item-job-title" to={`/search/jobs/${this.props.museJobId}`} props={this.props}>
            {this.props.job.name}
              </Link>

{/*
          <div className="job-search-result-item-job-category">
            {this.renderCategoryList()}
          </div>
        */}

          <div className="job-search-result-item-location">
          </div>

          <div className="job-search-result-item-bottom-wrapper">

{/*
            <Link className="job-search-result-item-link" to={`/search/jobs/${this.props.museJobId}`} props={this.props}>
            Read More
            </Link>
            */}
            <div className="job-search-result-item-dated">
              Posted {formatDate(this.props.job.publication_date)}
            </div>

            {this.dynamicIcon()}
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

export default connect(mapStateToProps, mapDispatchToProps)(JobSearchResultItem);
