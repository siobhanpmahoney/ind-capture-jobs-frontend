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
      <div className="mySavedJob">
        <div>
        <span>{this.props.job.company_name}</span>
        </div>
        <div>
        <Link to={`/myjobs/${this.props.job.id}`} job={this.props.job} loadSavedJob={this.props.loadSavedJob} tryCompany={findCompany}>
          <span className="jobSearchResultCompany">
            {this.props.job.title}
          </span>
        </Link>

        <div className="dateSaved">Date saved: {this.formattedSavedDate()}</div>
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
