import React, {useEffect,useState} from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles,setArticles] = useState([])
  const [loading,setloading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setotalResults] = useState(0)
  // document.title= `${this.capitalizeFirstLetter(props.category)}`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
 
   
  

  const updateNews = async ()=>{
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setotalResults(parsedData.totalResults);
    setloading(false);
  
     props.setProgress(100);
  }

useEffect(() => {
 updateNews();

 
}, [])


  

   const handlePrevClick=async()=>{
      
   setPage(page-1);
      updateNews();
    }

    const handleNextClick= async ()=>{
     
      setPage(page+1);
      updateNews();
    }
    const fetchMoreData = async () => {

       setPage(page+1);
       let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setotalResults(parsedData.setotalResults);
   
    };


  
    return (
      <>
         <h1 className='text-center'>NewsMonkey - Top  {capitalizeFirstLetter(props.category)} Headlines </h1>
         <InfiniteScroll 
          dataLength ={articles.length}
          next ={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader ={<h4> Loading...</h4>}
         >
           <div className="container">
          <div className="row ">
          {articles.map((element)=>{
              return <div className="col-md-3 " key={element.url}>
                <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
          })}
               </div> 
                
          </div>
          </InfiniteScroll  >
          {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next&rarr; </button>
          </div> */}
               
          
      </>
    )
  }



News.defaultProps = {
  country : 'in',
  pageSize : 8,
  category : 'general',
}
News.propTypes ={
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category : PropTypes.string,
}


export default News