import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';



class NavBar extends React.Component {

  renderHTML = () => {
    if (!!this.props.currentUser) {
      return (
        <span className="navbar-links">
        <NavLink to="/about" exact className="navbar-link" activeStyle={{border: "1px #E4F6F6 solid"}}>
          About
        </NavLink>

        <NavLink to="/" exact className="navbar-link" activeStyle={{border: "1px #E4F6F6 solid"}}>
          Profile
        </NavLink>

      <NavLink to="/search/jobs" exact className="navbar-link" activeStyle={{border: "1px #E4F6F6 solid"}}>
        Search Jobs
      </NavLink>

        <NavLink to="/search/companies" exact className="navbar-link" activeStyle={{border: "1px #E4F6F6 solid"}}>
          Explore Companies
        </NavLink>

        <NavLink to="/myjobs" exact className="navbar-link" activeStyle={{border: "1px #E4F6F6 solid"}}>
          My Jobs
        </NavLink>

      <NavLink to="/mycompanies" exact className="navbar-link" activeStyle={{border: "1px #E4F6F6 solid"}}>
        My Companies
      </NavLink>


    <NavLink onClick={this.props.logOutUser} to="/logout" exact className="navbar-link" activeStyle={{border: "1px #E4F6F6 solid"}}>
      Log Out
    </NavLink>
  </span>
  )

      } else {
        return (
          <span className="navbar-links">

            <NavLink to="/about" exact className="navbar-link" activeStyle={{border: "1px #E4F6F6 solid"}}>
              About
            </NavLink>

            <NavLink to="/login" exact className="navbar-link" activeStyle={{border: "1px #E4F6F6 solid"}}>
              Log In
            </NavLink>
        </span>
        )
      }
    }

  render() {
    return (
      <div className="navbar">
        <div className="capture-logo">
          Capture
        </div>

        <div className="navbar-link-container">
          {this.renderHTML()}
        </div>
      </div>)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
