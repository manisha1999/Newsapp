import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category : 'general',
  }
  static propTypes ={
      country : PropTypes.string,
      pageSize: PropTypes.number,
      category : PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
 
   
   constructor(props){
       super(props);
       console.log("Hello I am a constructor");
       this.state ={
           articles : [],
           loading : false,
           page : 1,
           totalResults :0
       }
       document.title= `${this.capitalizeFirstLetter(this.props.category)}`;
   }

  async updateNews(pageNo){
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b4fc6e736aa4226845b529d1c2887cf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles : parsedData.articles,
   totalResults :parsedData.totalResults,loading:false
  
  })

  }

   async componentDidMount(){
      
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b4fc6e736aa4226845b529d1c2887cf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
       this.setState({loading: true});
       let data = await fetch(url);
       let parsedData = await data.json();
       console.log(parsedData);
       this.setState({articles : parsedData.articles,
      totalResults :parsedData.totalResults,loading:false})

    }

    handlePrevClick=async()=>{
      // let url = `https://newsapi.org/v2/top-headlines?country==${this.props.country}&category=${this.props.category}&apiKey=6b4fc6e736aa4226845b529d1c2887cf&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // console.log(parsedData);
      // // this.setState({articles : parsedData.articles})
      // this.setState({
      //   articles : parsedData.articles,
      //   page : this.state.page-1});
      this.setState({page:this.state.page -1});
      this.updateNews();
    }

    handleNextClick= async ()=>{
      // if (this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      // }
      // else{
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b4fc6e736aa4226845b529d1c2887cf&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // console.log(parsedData);
      // // this.setState({articles : parsedData.articles})
      // this.setState({
       
      //   page : this.state.page+1,
      //   articles : parsedData.articles});
      // }
      this.setState({page:this.state.page +1});
      this.updateNews();
    }
     fetchMoreData = async () => {

       this.setState({page : this.state.page+1});
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b4fc6e736aa4226845b529d1c2887cf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles : this.state.articles.concat(parsedData.articles),
   totalResults :parsedData.totalResults,loading:false
    })
    };


  render() {
    return (
      <>
         <h1 className='text-center'>NewsMonkey - Top  {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
         <InfiniteScroll 
          dataLength ={this.state.articles.length}
          next ={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader ={<h4> Loading...</h4>}
         >
           <div className="container">
          <div className="row ">
          {this.state.articles.map((element)=>{
              return <div className="col-md-3 " key={element.url}>
                <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
          })}
               </div> 
                
          </div>
          </InfiniteScroll  >
          {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next&rarr; </button>
          </div> */}
               
          
      </>
    )
  }
}

export default News