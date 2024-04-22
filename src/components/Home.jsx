import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GITHUB_API} from '../utils/data'
import "./Home.css"
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import ErrorBoundary from './ErrorBoundary';

function Home() {
const [userData, setUserData] = useState([]);
const [error, setError] = useState(null);
const [filteredRepositories, setFilteredRepositories] = useState(userData);
const [currentPage, setCurrentPage] = useState(1)
const [postPerPage] = useState(10)

useEffect(()=> {
async function fetchData(){
    try{
      const response = await fetch(GITHUB_API)
      if (!response.ok){
        throw new Error('Network response was not ok')
      }
      const data = await response.json();
      console.log(data)
      setUserData(data)
      setFilteredRepositories(data);
     } catch(error){
      console.log(error)
      setError('Error fetching data. Please try again.');
     }
  }
  fetchData()
},[])


const indexOfLastPost = currentPage * postPerPage;
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPost = userData.slice(indexOfFirstPost, indexOfLastPost)

const paginate = (pageNumber)=> setCurrentPage(pageNumber)
  return (
    <section className='home__container'>
      <section className='search__container'>
       <SearchBar filteredRepositories={filteredRepositories} setFilteredRepositories={setFilteredRepositories}  userData={currentPost} setUserData={setUserData}/>
      </section>
      <main>
      {error ? (<div>{<ErrorBoundary error={error}/>}</div>) : 
       currentPost.map((user) => (
        <section key={user.id} className='repo__container'>
          <Link to={`/single-repo/${user.id}`}>{user.name}</Link>

              
          </section>
       ))
      }
      <Pagination postPerPage={postPerPage} totalPosts={userData.length} paginate={paginate}/>
      </main>
    </section>
  )
}

export default Home