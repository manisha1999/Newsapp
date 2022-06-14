
import React from 'react'

const NewsItem =(props)=> {
    
  
    let {title,description,imageUrl,newsUrl,author,date} = props;
    return (
     
      <div className='my-3'>
            <div className="card" >
            <img src={!imageUrl?"https://www.woodtv.com/wp-content/uploads/sites/51/2022/05/Liver_Disease_Children_22142563902334-1.jpg?w=1280":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className='card-text'><small className='text-muted'> By {!author? "unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
        </div>
    )
  }


export default NewsItem