import React from 'react'
import './Pagination.css'

function Pagination({ postPerPage, totalPosts, paginate}) {
    const pageNumbers = [];

    for(let i = 0; i <= Math.ceil( totalPosts / postPerPage); i++){
        pageNumbers.push(i)
    }


  return (
    <div>
      <ul className='pagination__container'>
        {pageNumbers.map(pageNumber => (
            <li className='pagination__content' key={pageNumber}>
              <a onClick={()=> paginate(pageNumber)} >{pageNumber}</a>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination