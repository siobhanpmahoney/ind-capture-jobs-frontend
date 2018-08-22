import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from 'react-router-dom';
import MyJobsItemDetail from './MyJobsItemDetail'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'


class MyJobsItem extends React.Component {
  constructor(props) {
    super(props)

  }

  jobCompany = () => {
    let company = this.props.user.companies.find((c) => {
      return c.museId == this.props.job.company_museId
    })
    return company.name
  }

  formattedSavedDate = () => {
    let dateSaved = new Date(this.props.job.date_saved)
    return dateSaved.toLocaleDateString()
  }

  render() {
    const findCompany = this.props.savedCompanies.find((c) => {
      return c.id == this.props.job.company_id
    })
    return(
      <div className="job-search-result-item-wrapper">
        <div className="job-search-result-item-text">
          <div className="job-search-result-item-company-name">
            {this.props.job.company_name}
          </div>
          <Link className="job-search-result-item-job-title" to={`/myjobs/${this.props.job.id}`} job={this.props.job} loadSavedJob={this.props.loadSavedJob} tryCompany={findCompany}>

              {this.props.job.title}

          </Link>
            <div className="job-search-result-item-dated">
              Saved: {this.formattedSavedDate()}</div>
        </div>
        <div>



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

export default connect(mapStateToProps, mapDispatchToProps)(MyJobsItem)
