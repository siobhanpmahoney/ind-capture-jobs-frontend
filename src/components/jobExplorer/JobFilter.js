import React from 'react'
import Select from 'react-select';
// import 'react-select/dist/react-select.css'

// const JobFilter = ({textSearchListener, categorySelectListener, levelSelectListener, locationSelectListener, handleJobSearchSubmit})

class JobFilter extends React.Component {

  // onChange={this.props.categorySelectListener}

  comonentDidUpdate(prevProps) {
    if (prevProps.categorySelection != this.props.categorySelection) {
      return;
    }
  }


  render() {

    const categoryOptions = [
      "Account Management", "Business & Strategy", "Creative & Design", "Customer Service", "Data Science", "Editorial", "Education", "Engineering", "Finance", "Fundraising & Development", "Healthcare & Medicine", "HR & Recruiting", "Legal", "Marketing & PR", "Operations", "Project & Product Management", "Retail", "Sales", "Social Media & Community"
    ]

    const locationOptions = [{label: "Austin, TX", value: "Austin%2C%20TX" }, {label: "Boston, MA", value: "Boston%2C%20MA" }, {label: "Chicago, IL", value: "Chicago%2C%20IL" }, {label: "Los Angeles, CA", value: "Los%20Angeles%2C%20CA" }, {label: "New York City, NY", value: "New%20York%20City%2C%20NY" }, {label: "Portland, OR", value: "Portland%2C%20OR" }, {label: "San Francisco, CA", value: "San%20Francisco%2C%20CA" }, {label: "Seattle, WA", value: "Seattle%2C%20WA" }, {label: "Washington, DC", value: "Washington%2C%20DC" }]

    const levelOptions = ["Internship", "Entry Level", "Mid Level", "Senior Level"]

    const categories = categoryOptions.map((c) => {
      return {value: c.split("&").join("%26").split(" ").join("%20"), label: c, className: "filter-option"}
    })

    const levels = levelOptions.map((lev) => {
      return {value: lev.split(" ").join("%20"), label: lev, className: "filter-option"}
    })

    const locations = locationOptions.map((l) => {
      return {value: l.value, label: l.label, className: "filter-option"}
    })

    return (
      <div className="job-filter-wrapper">
      <div className="jobFilters">
        <div className="job-filter-criteria">
            <div className="job-filter-header">Job Keyword</div>
          <input type="text" className="filter-input keyword-filter" onChange={this.props.textSearchListener} />
        </div>

        <div className="job-filter-criteria">

          <div className="job-filter-header">Job Level</div>

          <Select
            onChange={this.props.categorySelectListener}
            options={categories}
            className="filter-input select-input"
            multiple
            isMulti
            />

        </div>

        <div className="job-filter-criteria">
          <div className="job-filter-header">Select Level</div>
          <Select
            onChange={this.props.levelSelectListener}
            options={levels}
            className="filter-input select-input"
            multiple
            isMulti
            />
        </div>

        <div className="job-filter-criteria">
          <div className="job-filter-header">
            Filter By City
          </div>

          <Select
            onChange={this.props.locationSelectListener}
            options={locations}
            className="filter-input select-input"
            multiple
            isMulti
            />

        </div>



      </div>
          <button onClick={this.props.handleJobSearchSubmit} className="searchButton">Search</button>
      </div>

    )


  }
}

export default JobFilter
