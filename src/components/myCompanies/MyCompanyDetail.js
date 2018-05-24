import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import * as Actions from '../../actions'
import MyJobsItem from '../myJobs/MyJobsItem'
import CompanyArticleFeed from '../reusableCompany/CompanyArticleFeed'
import CompanyPRFeed from '../reusableCompany/CompanyPRFeed'
import IndustryNewsFeed from '../reusableCompany/IndustryNewsFeed'
import JobSearchResultList from '../jobExplorer/JobSearchResultList'
import JobSearchResultItem from '../jobExplorer/JobSearchResultList'



class MyCompanyDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      company: null,
      myJobs: [],
      openJobs: []
    }
  }

  componentDidMount() {
    let companyid = this.props.companyId
    console.log(companyid)
    // let userid = this.props.currentUser.user.id
    // let url = `https://capture-jobs-api.herokuapp.com/api/v1/users/${userid}/companies/${companyid}`
    let url = `https://capture-jobs-api.herokuapp.com/api/v1/users/1/companies/${companyid}`
    fetch(url)
    .then(response => response.json())
    .then(json => this.setState({
       company: json.company,
       myJobs: json.company_jobs
    }))
    // .then(() => this.fetchOpenJobs(this.state.company.name))

    .then(() => fetch(`https://api-v2.themuse.com/jobs?company=${this.state.company.name}&api-key=82b2d1f745512b99a70044e6c6b316d86739a97719d5e88caf67a3f7fd788a00&page=1`))
    .then(res => res.json())
    .then(json => this.setState({
      openJobs: json.results
    }))
    .then(() => console.log(this.state))
  }

  // fetchOpenJobs = (companyName) => {
  //
  //   let openJobState = this.state.openJobs
  //   for(let i=0; i<6; i++) {
  //     let jobUrl = "https://api-v2.themuse.com/jobs?company=" + companyName + "&api-key=82b2d1f745512b99a70044e6c6b316d86739a97719d5e88caf67a3f7fd788a00&page=" + i
  //     fetch(jobUrl)
  //     .then(response => response.json())
  //     .then(res => this.setState({
  //       openJobs: [...openJobState, res.results]
  //     }))
  //     .then(() => console.log(this.state))
  //   }
  // }







  render() {

    if (!this.props) {
      return<div>Loading...</div>
    }
    if (!this.props.currentUser) {
      return<div>Loading...</div>
    }
    if (!this.props.currentUser.user) {
      return <div>Loading...</div>
    }
    if (!this.state.company) {
      return <div>Loading...</div>
    }
    if (!this.state.myJobs) {
      return <div>Loading...</div>
    }


    return (
  <div className="myCompanyDetail">
<h1 style={{fontWeight:"800"}}>{this.state.company.name}</h1>
<div style={{display:"flex", justifyContent:"flex-start", flexDirction:"column", width:"100%"}}>

      <div style={{padding:"0.25em", flexDirection: "column", display:"flex", order:"1"}}>

      <h2 style={{display:"flex"}}>{this.state.company.location}</h2>
      <h3>{this.state.company.size}</h3>
        <div style={{fontSize:"18px", fontWeight:"400"}}>{this.state.company.description}</div>
</div>
  <img src={this.state.company.image_link} style={{width:"480px", height:"100%", display: "flex", minWidth:"320px", maxWidth:"480px", overflowX:"hidden", margin:"0.25em", padding:"0.25em", flexDirection:"column", order:"2", flex:"flex-shrink"}} />
</div>




    <div className="myCompanyMyJobs" style={{clear:"both"}}>
      <h2>Bookmarked Jobs</h2>
      {this.state.myJobs.map((job) => {
        return <MyJobsItem job={job} key={job.id} user = {this.props.currentUser} savedJobs={this.props.savedJobs} savedCompanies={this.props.savedCompanies} savedNotes={this.props.savedNotes} user={this.props.currentUser}/>

      })}
    </div>


    <div className="myCompanyPressReleases" style={{clear:"both"}}>
      <h2>Press Releases mentioning {this.state.company.name}</h2>
      <div style={{float:"left", display:"inlineBlock"}}>
      <CompanyPRFeed addBookmark = {this.props.addBookmark} user = {this.props.user} company={this.state.company}/>
      </div>
    </div>

    <div className="myCompanyNews" style={{clear:"both"}}>
      <h2>{this.state.company.name} in the News</h2>
      <div style={{float:"left", display:"inlineBlock"}}>
      <CompanyArticleFeed company={this.state.company} addBookmark = {this.props.addBookmark} user = {this.props.user} company={this.state.company}/>
      </div>
    </div>





    <div className="myCompanyFindJobs" style={{clear:"both"}}>
      <h2>Explore Open Positions at {this.state.company.name}</h2>
      <JobSearchResultList jobSearchResults = {this.state.openJobs} savedJobs={this.props.savedJobs} addToSavedJobs={this.props.saveNewJob} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyCompanyDetail);
