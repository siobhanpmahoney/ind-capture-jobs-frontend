import React from 'react'
import MyJobsItem from './MyJobsItem'
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link, withRouter, HashRouter} from 'react-router-dom';


const MyJobsList = ({user, savedJobs, savedCompanies, savedNotes, loadSavedJob}) => {

  return (

    <div className="job-search-result-list">

{savedJobs.map((j) => {
  return <MyJobsItem job={j} key={j.id} user = {user} savedJobs={savedJobs} savedCompanies={savedCompanies} savedNotes={savedNotes} />
})}

    </div>
  )
}


export default MyJobsList;
