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

    const categories = categoryOptions.map((c) => {
      return {value: c.split("&").join("%26").split(" ").join("%20"), label: c, className: "filter-option"}
    })

    return (
      <div className="jobFilters">
        <div>
          <input type="text" onChange={this.props.textSearchListener} />
        </div>
        <div className="jobFilterCategory">

          <h3>Select Job Category</h3>

            <Select

              onChange={this.props.categorySelectListener}
              options={categories}
              className="filter-input select-input"
              multiple
              isMulti
              />



        </div>

        <div className="jobFilterLevel">
          <h3>Select Level</h3>
          <label>Internship
            <input type="checkbox" onChange={this.props.levelSelectListener} value="Internship" />
            <br /></label>
            <label>Entry Level
              <input type="checkbox" onChange={this.props.levelSelectListener} value="Entry%20Level" />
              <br /></label>
              <label>Mid Level
                <input type="checkbox" onChange={this.props.levelSelectListener} value="Mid%20Level" />
                <br /></label>
                <label>Senior Level
                  <input type="checkbox" onChange={this.props.levelSelectListener} value="Senior%20Level" />
                  <br /></label>
                </div>

                <div className="jobFilterLocation">
                  <h3>Filter By City</h3>
                  <label>Austin, TX
                    <input type="checkbox" onChange={this.props.locationSelectListener} value="Austin%2C%20TX" />
                    <br /></label>

                    <label>Boston, MA
                      <input type="checkbox" onChange={this.props.locationSelectListener} value="Boston%2C%20MA" />
                      <br /></label>

                      <label>Chicago, IL
                        <input type="checkbox" onChange={this.props.locationSelectListener} value="Chicago%2C%20IL" />
                        <br /></label>

                        <label>Los Angeles, CA
                          <input type="checkbox" onChange={this.props.locationSelectListener} value="Los%20Angeles%2C%20CA" />
                          <br /></label>

                          <label>New York City, NY
                            <input type="checkbox" onChange={this.props.locationSelectListener} value="New%20York%20City%2C%20NY" />
                            <br /></label>

                            <label>Portland, OR
                              <input type="checkbox" onChange={this.props.locationSelectListener} value="Portland%2C%20OR" />
                              <br /></label>

                              <label>San Francisco, CA
                                <input type="checkbox" onChange={this.props.locationSelectListener} value="San%20Francisco%2C%20CA" />
                                <br /></label>

                                <label>Seattle, WA
                                  <input type="checkbox" onChange={this.props.locationSelectListener} value="Seattle%2C%20WA" />
                                  <br /></label>

                                  <label>Washington, DC
                                    <input type="checkbox" onChange={this.props.locationSelectListener} value="Washington%2C%20DC" />
                                    <br /></label>
                                  </div>
                                  <div className="searchButton">
                                    <button onClick={this.props.handleJobSearchSubmit}>Search</button>
                                  </div>
                                </div>

                              )


                            }
                          }

                          export default JobFilter
