import React from 'react'
import JobSearchResultItem from './JobSearchResultItem'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import * as Actions from '../../actions'

class JobSearchResultList extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.jobSearchResults != this.props.jobSearchResults) {
      console.log(this.props.jobSearchResults)
    }
  }

  render() {
    console.log("in jobsearchresultlist component")
    console.log("this.props", this.props.jobSearchResults)
  return(
    <div className="job-search-result-list">
      {this.props.jobSearchResults.map((j) => {
        return <JobSearchResultItem job={j} key={j.id} savedJobs={this.props.savedJobs} addToSavedJobs={this.props.addToSavedJobs} museJobId={j.id} />
      })}
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

export default connect(mapStateToProps, mapDispatchToProps)(JobSearchResultList);
