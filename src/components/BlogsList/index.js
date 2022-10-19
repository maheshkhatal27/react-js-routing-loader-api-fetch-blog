import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

/* const blogsData = [
  {
    id: 1,
    title: 'Blog 1',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-1-img.png',
    avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
    author: 'Author Name',
    topic: 'React.js',
  },
  {
    id: 2,
    title: 'Blog 2',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-2-img.png',
    avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
    author: 'Author Name',
    topic: 'React.js',
  },
] */
// once we got the data from using aoi fetch we are no more using abode dummy data

class BlogsList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    // console.log(data)
    // converting to camel casing from snake casing. For front end -camel casing is used ,back end-snake casing

    const updatedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    /* now we will initialize this data to state
     now we can use this data instead of dummy data that is from the state */

    this.setState({blogsData: updatedData, isLoading: false})

    /* for spinner loader we will install=>  npm install react-loader-spinner@4.0.0 --save 

    then use=> import Loader from "react-loader-spinner" 
     for css use=> import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"  */
  }

  render() {
    const {blogsData, isLoading} = this.state
    // initially if loader is true...it means taking time to load so if true then display the loader, else BlogItem
    // but loader will always be there even if fetch data is done so  go to getBogsData and there set isLoading false
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
