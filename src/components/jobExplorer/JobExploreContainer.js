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

  textSearchListener = (event) => {
    let input = event.target.value
    this.setState({
      textSearch: input
    })
    console.log(this.state.textSearch)
  }

  categorySelectListener = (event) => {
    let categoryPicks = this.state.categorySelection.splice()
    let category=event.value
    if (event.value) {
      categoryPicks.push(category)
    }
    // else {
    //   categoryPicks.splice(categoryPicks.indexOf(category), 1)
    // }

    this.setState({
      categorySelection: categoryPicks
    })

  }

  levelSelectListener = (event) => {
    let levelPicks = this.state.levelSelection.slice()
    let level=event.target.value
    if (event.target.checked) {
      levelPicks.push(level)
    } else {
      levelPicks.splice(levelPicks.indexOf(level), 1)
    }

    this.setState({
      levelSelection: levelPicks
    })
  }

  locationSelectListener = (event) => {
    let locationPicks = this.state.locationSelection.slice()
    let location=event.target.value
    if (event.target.checked) {
      locationPicks.push(location)
    } else {
      locationPicks.splice(locationPicks.indexOf(location), 1)
    }

    this.setState({
      locationSelection: locationPicks
    })
  }

  handleJobSearchSubmit = (event) => {
    event.preventDefault()
    let categories = ""
    let levels = ""
    let locations = ""

    this.state.categorySelection.length > 0 ? categories = "&category=" + this.state.categorySelection.join("&category=") : categories = "";

    this.state.levelSelection.length > 0 ? levels = "&level=" + this.state.levelSelection.join("&level=") : levels = "";

    this.state.locationSelection.length > 0 ? locations = "&location=" + this.state.locationSelection.join("&location=") : locations = "";

    let currentResults = this.state.jobSearchResults.slice()
    let i = 0

    while (i < 10) {
      let jobUrl = "https://api-v2.themuse.com/jobs?" + categories + levels + locations + "&api-key=82b2d1f745512b99a70044e6c6b316d86739a97719d5e88caf67a3f7fd788a00&page=" + i
      fetch(jobUrl)
      .then(response => response.json())
      .then(json => json.results.filter((job) => job.company.name != "Goldman Sachs").map((res) => currentResults.push(res)))
      i++
    }

    console.log(this.state.textSearch)


    this.setState({
      jobSearchResults: currentResults
    })
  }

  render() {
    const jobSearchResults = this.state.jobSearchResults.filter((res) => {
      res.name.toLowerCase().includes(this.state.textSearch.toLowerCase()) || res.contents.toLowerCase().includes(this.state.textSearch.toLowerCase())
    })
    return (
      <div className="jobSearchContainer">
        <h2>Search for a Job!</h2>

        <JobFilter textSearchListener={this.textSearchListener} categorySelection={this.state.categorySelection} categorySelectListener={this.categorySelectListener} levelSelectListener = {this.levelSelectListener} locationSelectListener={this.locationSelectListener} handleJobSearchSubmit={this.handleJobSearchSubmit} />

        <div className="searchContainerResults">
          <JobSearchResultList jobSearchResults = {jobSearchResults} savedJobs={this.props.savedJobs} addToSavedJobs={this.props.addToSavedJobs} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobExploreContainer));
