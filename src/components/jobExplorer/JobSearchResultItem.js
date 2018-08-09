import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { withRouter } from 'react-router'
import JobDescription from './JobDescription'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'

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
      return (<i className="material-icons" onClick={this.saveJob} style={{color:"#FF5370", display:"inlineBlock", border:"2px"}}>bookmark_border</i>)
    } else {
      if (this.props.savedJobs.find((job) => {
        return job.museId == this.props.museJobId
      })) {
        return (<i className="material-icons" style={{color:"#FF5370", fontSize:"24px", display:"inlineBlock"}}>bookmark</i>)
      }
      else {
        return (<i className="material-icons" onClick={this.saveJob} style={{color:"#FF5370", display:"inlineBlock"}}>bookmark_border</i>)
      }}
    }

  render() {

    let p = this.props



    return (
      <div className="jobSearchResultItem">

        <div>
        <span>{this.props.job.company.name}</span>
        </div>


      <div>
      <span className="jobSearchResultCompany">{this.props.job.name}</span> | <span className="jobSearchResultLevel">{this.renderLocationList()}</span>
        <div className="jobSearchResultLocation">{this.renderCategoryList()}</div>


        <Link to={`/search/jobs/${this.props.museJobId}`} props={this.props}>Read More</Link><br />
        {this.dynamicIcon()}

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
