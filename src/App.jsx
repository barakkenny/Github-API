import React from 'react';
import Home from './components/Home';
import { Routes, Route} from 'react-router-dom'
import SingleRepo from './components/SingleRepo';
import './App.css'
import NotFound from './components/NotFound';

function App() {

  return (
    <section className='container'>
      <h1 className='header__text'>GitHub API Project</h1>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/single-repo/:id' element={<SingleRepo/>}/>
    
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </section>
  )
}

export default App
