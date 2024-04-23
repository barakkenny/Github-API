import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GITHUB_API} from '../utils/data'
import "./Home.css"
import SearchBar from './SearchBar';
import Pagination from './Pagination';

function Home() {
const [userData, setUserData] = useState([]);
const [error, setError] = useState(null);
const [currentPage, setCurrentPage] = useState(1)
const [postPerPage] = useState(10)
const [searchRepo, setSearchRepo] = useState("")

useEffect(()=> {
async function fetchData(){
    try{
      const response = await fetch(GITHUB_API)
      if (!response.ok){
        throw new Error('Network response was not ok')
      }
      const data = await response.json();
      setUserData(data)
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
       <SearchBar  setSearchRepo={setSearchRepo}/>
      </section>
      <main className='repo__container'>
      {error ? (<Link to="/error-boundary" style={{textAlign: 'center', fontSize: 20,color: "white"}}>{error}</Link>) : 
       currentPost.filter((item)=> searchRepo.toLowerCase() === ""
       ? item
       : item.name.toLowerCase().includes(searchRepo)).map((user) => (
        <section className='repo__content' key={user.id}>
          <Link className='repo__con' to={`/single-repo/${user.id}`}>{user.name}</Link>    
          </section>
       ))
      }
      <Pagination postPerPage={postPerPage} totalPosts={userData.length} paginate={paginate}/>
      </main>
    </section>
  )
}

export default Home