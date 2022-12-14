import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import { IPersonParams, IPersons } from './data/IPersonParams';
import { fetchAsync } from './utils/fetchAsync';

import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FavouritePage from './pages/FavouritePage';
import FilmsPage from './pages/FilmsPage';
import PersonPage from './pages/PersonPage';
import './App.css';
import FilmPage from './pages/FilmPage';


function App() {
  const [persons, setPersons] = useState<IPersonParams[]>([])
  const [next, setNext] = useState<string | null>("")
  const [isLoading, setIsLoading] = useState(false)

  const fetchPersons = async(url: string) => {
    const res = await fetchAsync(url)
    setPersons([...persons, ...res.results])
    setNext(res.next)
  }

  useEffect(() => {
    fetchPersons('https://swapi.dev/api/people/?page=1')
  }, [])

  

  return (
    <div className="body">
      <Header />
      
      <Routes>
        <Route path="/" element={<MainPage fetchPersons={fetchPersons} isLoading={isLoading} next={next} persons={persons} setIsLoading={setIsLoading}/>}/>
        <Route path="/favourite" element={<FavouritePage />}/>
        <Route path="/films" element={<FilmsPage />}/>
        <Route path='/person/:id' element={<PersonPage />}/>
        <Route path='/film/:id' element={<FilmPage />}/>
      </Routes>
    </div>
  );
}

export default App;
