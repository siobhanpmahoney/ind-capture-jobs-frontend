import React from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'

import JobSuggestionContainer from './jobExplorer/JobSuggestionContainer'
import CompanySuggestionContainer from './companyExplorer/CompanySuggestionContainer'
import MyJobsResourceFeedInterviews from './myJobs/MyJobsResourceFeedInterviews'


class Profile extends React.Component {

  componentDidMount() {
  if (this.props.currentUser === null && !this.props.auth.loggingIn) {
      <Redirect to = '/login' />
  } else {
    console.log(this.props.auth.loggingIn)
  }
}

  industryUrl = () => {
    let iUrl = this.props.savedIndustries.map((i) => {
      console.log(i.name)
       return i.name.split(' ').join('%20')
    })
    return iUrl.join('&industry=')
  }

  categoryUrl = () => {
    let cUrl = this.props.savedCategories.map((c) => {
      return c.name.split(' ').join('%20')
    })
    return cUrl.join('&category=')
  }

  render() {
    // if (!this.props.currentUser) {
    //   return(<div>Loading...</div>)
    // }
    // if (!this.props.currentUser.user){
    //   return(<div>Loading...</div>)
    // }
    // if (!this.props.currentUser.user.username){
    //   return(<div>Loading...</div>)
    // }

    // console.log(this.props.currentUser)
    // console.log(this.props.currentUser.user.username)
    console.log(this.props)
    if (this.props.auth.loggingIn && this.props.currentUser === null) {
      return <div>Loading...</div>
    }




        return (
      <div className = "profile">
            <div className="welcome">Welcome!</div>


        <div className="jobSuggestions">
          <div className="insideJobSuggestions">

          <JobSuggestionContainer currentUser={this.props.currentUser} savedJobs={this.props.savedJobs} savedCategories={this.props.savedCategories} savedIndustries={this.props.savedIndustries} addToSavedJobs={this.props.addToSavedJobs}  categoryUrl={this.categoryUrl()}/>
          </div>
        </div>

        <div className="companySuggestionContainer">

          <CompanySuggestionContainer industryUrl={this.industryUrl()} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
