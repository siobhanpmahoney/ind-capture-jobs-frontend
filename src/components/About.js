import React from 'react'
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import jobSearch from './imgs/jobSearch.svg'
import track from './imgs/track.jpg'
import research from './imgs/research.svg'

class About extends React.Component {
  render() {
    return (
      <div className="about">
        <section className="row one">
          <div className="image">
            <img src={jobSearch} className="imgSrc" /><br />
            <span className="imgRights"><a target="_blank" href="https://www.Vecteezy.com/">Vector illustration credit: www.vecteezy.com</a></span>
          </div>
          <div className="about-description">
            <span className="about-title">Explore Opportunities</span>
            <p>Browse jobs and companies based on job category, experience, location, and industry</p>
          </div>
        </section>

        <section className="row two">

          <div className="image">
            <i className="material-icons" style={{color:"#FF5370", fontSize:"8em"}}>bookmark</i>
          </div>
          <div className="about-description">
            <span className="about-title">Save Job Listings</span>
            <p>Bookmark opportunities that catch your eye.</p>
          </div>

        </section>

        <section className="row three">
          <div className="image">
            <img src={track} className="imgSrc" />

          </div>
          <div className="about-description">
            <span className="about-title">Track Application Status</span>
            <p>Applied to a job? Receive an interview invite? Track where you are in the application process for each saved job.</p>
          </div>
        </section>

        <section className="row four">
          <div className="image">
            <img src={research} className="imgSrc" /><br />
            <span className="imgRights"><div>Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond">Icon Pond</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div></span>
          </div>
          <div className="about-description">
            <span className="about-title">Organize Company Research</span>
            <p></p>
          </div>
        </section>
        <div className="row two"></div>
        <div className="row three"></div>
        <div className="row four"></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));
