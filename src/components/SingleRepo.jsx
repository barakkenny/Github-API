import React,{ useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { GITHUB_API} from '../utils/data';
import './SingleRepo.css'

function SingleRepo() {
  const [userData, setUserData] = useState([]);
const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(()=> {
    async function fetchSingleRepo(){
        try{
          const response = await fetch(`${GITHUB_API}`)
          if (!response.ok){
            throw new Error('Network response was not ok')
          }
          const data = await response.json();
          console.log(data)
          setUserData(data.slice(0,1))
         } catch(error){
          console.log(error)
          setError('Error fetching data. Please try again.');
         }
      }
      fetchSingleRepo()
    },[id])
  return (
    <div>
      {error ? (<div>{error}</div>) : 
       userData.map((user) => (
        <section key={user.id} className='single__repo__container'>
            <section className='single__repo__content'>
              <ul>
              <li>Name</li>
              <li>Fork</li>
              <li>Language</li>
              <li>Watchers Count</li>
              <li>Branch</li>
              <li>Open Issues</li>
              <li>Node Id</li>
              <li>Visibility</li>
              </ul>
              <ul>
              <li>{user.name}</li>
              <li>{user.forks}</li>
              <li>{user.language}</li>
              <li>{user.watchers_count}</li>
              <li>{user.default_branch}</li>
              <li>{user.open_issues}</li>
              <li>{user.node_id}</li>
              <li>{user.visibility}</li>
              </ul>
            </section>
          </section>
       ))
      }
    </div>
  );
}

export default SingleRepo