import React from 'react'
import JobFilter from './JobFilter'
import JobSearchResultList from './JobSearchResultList'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
// import Select from 'react-select';
// import 'react-select/dist/react-select.css'

class JobExploreContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      textSearch: "",
      categorySelection: [],
      levelSelection: [],
      locationSelection: [],
      jobSearchResults: []
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.jobSearchResults != this.state.jobSearchResults) {
  //     this.renderJobSearchResults
  //   }
  // }

  textSearchListener = (event) => {
    let input = event.target.value
    this.setState({
      textSearch: input
    })
  }

  categorySelectListener = (event) => {
    let categoryPicks = this.state.categorySelection.splice()
    let category=event[event.length-1].value
    categoryPicks = [...categoryPicks, category]

    this.setState({
      categorySelection: categoryPicks
    })

  }

  levelSelectListener = (event) => {
    let levelPicks = this.state.levelSelection.splice()
    let level=event[event.length-1].value
    levelPicks = [...levelPicks, level]

    this.setState({
      levelSelection: levelPicks
    })
  }

  locationSelectListener = (event) => {
    let locationPicks = this.state.locationSelection.splice()
    let location=event[event.length-1].value
    locationPicks = [...locationPicks, location]
    this.setState({
      locationSelection: locationPicks
    })
  }

  handleJobSearchSubmit = (event) => {

    let categories = ""
    let levels = ""
    let locations = ""


    this.state.categorySelection.length > 0 ? categories = "&category=" + this.state.categorySelection.join("&category=") : categories = "";
    console.log(categories)

    this.state.levelSelection.length > 0 ? levels = "&level=" + this.state.levelSelection.join("&level=") : levels = "";

    this.state.locationSelection.length > 0 ? locations = "&location=" + this.state.locationSelection.join("&location=") : locations = "";

    let currentResults = this.state.jobSearchResults.splice()
    let i = 0



      // let jobUrl = "https://api-v2.themuse.com/jobs?" + categories + levels + locations + "&api-key=34298a48276984c821dcc75e585710fd5b77389f6379e7097f3ed52181571eb6&page=1"
      // fetch(jobUrl)
      // .then(response => response.json())
      // .then(json => {
      //   currentResults = [...json.results, ...currentResults ]
      //   this.setState({
      //     jobSearchResults: this.resultsFiltered(currentResults)
      //   }, this.renderJobSearchResults)
      // })




      while (i < 4) {
        let jobUrl = "https://api-v2.themuse.com/jobs?" + categories + levels + locations + "&api-key=34298a48276984c821dcc75e585710fd5b77389f6379e7097f3ed52181571eb6&page=" + i
        fetch(jobUrl)
        .then(response => response.json())
        .then(json => {
          currentResults = [...json.results, ...currentResults ]
          currentResults = currentResults.filter((job) => job.company.name != "Goldman Sachs")
          console.log("currentResults after spread", currentResults)
          this.setState({
           jobSearchResults: this.resultsFiltered(currentResults)
         })
        })
        i++
      }

      if (i >= 3) {
        console.log("in conditional")
        this.renderJobSearchResults
        //  this.setState({
        //   jobSearchResults: this.resultsFiltered(currentResults)
        // }, this.renderJobSearchResults)
      }



  }

  resultsFiltered = (jobs) => {
    if (this.state.textSearch = "") {
      return jobs
    } else {
    return jobs.filter((res) => {
      return res.name.toLowerCase().includes(this.state.textSearch.toLowerCase()) || res.contents.toLowerCase().includes(this.state.textSearch.toLowerCase())
    })
  }
  }

  renderJobSearchResults = () => {

    return <JobSearchResultList jobSearchResults = {this.state.jobSearchResults} savedJobs={this.props.savedJobs} addToSavedJobs={this.props.addToSavedJobs} />
  }

  render() {


    return (
      <div className="jobSearchContainer">
        <h2 className="page-header">Search for a Job!</h2>

        <JobFilter textSearchListener={this.textSearchListener} categorySelection={this.state.categorySelection} categorySelectListener={this.categorySelectListener} levelSelectListener = {this.levelSelectListener} locationSelectListener={this.locationSelectListener} handleJobSearchSubmit={this.handleJobSearchSubmit} />



        {this.renderJobSearchResults()}


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

export default connect(mapStateToProps, mapDispatchToProps)(JobExploreContainer);
