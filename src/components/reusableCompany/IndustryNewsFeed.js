import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import * as Actions from '../../actions'

class IndustryNewsFeed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: []
    }
  }

  formattedDate = (date) => {
    let pubDate = new Date(date)
    return pubDate.toLocaleDateString()
  }

  componentDidMount() {
    let articlesForState = []
    if (!!this.props.company.industries) {
      this.props.company.industries.map((i) => {
        let searchCompany = i.name.split(" ").join("+")
          let articleUrl = `https://newsapi.org/v2/everything?q=%22${searchCompany}+industry%22&pageSize=100&domains=alleywatch.com,bloomberg.com,businessinsider.com,cnbc.com,dealabs.com,digiday.com,engadget.com,entrepreneur.com,inc.com,mashable.com,nytimes.com,recode.com,seekingalpha.com,techcrunch.com,techdirt.com,techradar.com,thenextweb.com,theverge.com,wsj.com,wired.com,forbes.com&language=en&sortBy=relevancy&apiKey=ad5900690118454582f702c63e4286f8`
          fetch(articleUrl)
            .then(response => response.json())
            .then(json => json.articles.map((a) => {

               articlesForState.push(a)
               return articlesForState.sort((a,b) => new Date(b.publishedAt) - new Date(a.publishedAt))
            }))
      })
    } else if (!!this.props.company.industry_name) {
    let searchCompany = this.props.company.industry_name.split(" ").join("+")
    console.log(searchCompany)
          let articleUrl = `https://newsapi.org/v2/everything?q=%22${searchCompany}+industry%22&pageSize=100&domains=alleywatch.com,bloomberg.com,businessinsider.com,cnbc.com,dealabs.com,digiday.com,engadget.com,entrepreneur.com,inc.com,mashable.com,nytimes.com,recode.com,seekingalpha.com,techcrunch.com,techdirt.com,techradar.com,thenextweb.com,theverge.com,wsj.com,wired.com,forbes.com&language=en&sortBy=relevancy&apiKey=ad5900690118454582f702c63e4286f8`
          console.log(articleUrl)
          fetch(articleUrl)
            .then(response => response.json())
            .then(json => json.articles.map((a) => {
              console.log(a)
               articlesForState.push(a)
               return articlesForState.sort((a,b) => new Date(b.publishedAt) - new Date(a.publishedAt))
            }))

    }

    console.log(articlesForState)
    this.setState({
      articles: articlesForState.sort((a,b) => b.publishedAt.localeCompare(a.publishedAt))
    })

  }


addBookmark = (article) => {

  this.props.addBookmark(article.title, article.source.name, article.description, article.url, this.props.user.user.id, this.props.company.id)
}

dynamicBookmarkIcon = (info) => {
  if (this.props.savedBookmarks.find((bookmark) => {
    return bookmark.url == info.url
  })) {
    return (<i className="material-icons" name={info.title} id={info.url} style={{color:"#FF5370", fontSize:"100%"}}>bookmark</i>)
  } else {
    return (<i className="material-icons" value={info.title} id={info.url} onClick={()=>this.addBookmark(info)} style={{color:"#FF5370"}}>bookmark_border</i>)
  }
}

  render() {
    debugger
    if (!this.props) {
      return<div>Loading!</div>
    }
    if (!this.state.articles) {
      return<div>Loading..</div>
    }
    console.log(this.state.articles)


    return (
      <div>
        {this.state.articles.slice(0,9).map((article) => {
          return <div>

            <div>
            <div>{article.source.name}</div>
            </div>

<div>
            <div><img src={article.urlToImage} /></div>

            <div>
            <span>

          {this.dynamicBookmarkIcon(article)}


          </span>

          <div className="companyPressCardTitle">
            <a href={article.url} target="_blank">{article.title}</a>
          </div>

          <div className="companyPressCardTitle">Published {new Date(article.publishedAt).toLocaleDateString()}</div>
</div>
          </div>
        </div>
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
    savedIndustries: state.user.savedIndustries,
    savedCategories: state.user.savedCategories,
    savedIndustries: state.user.savedIndustries
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndustryNewsFeed);
