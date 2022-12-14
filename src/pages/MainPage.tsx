import React, { FC, useEffect, useState } from 'react'
import { InView } from 'react-intersection-observer'
import { Circles } from 'react-loader-spinner'
import { BrowserRouter } from 'react-router-dom'
import ListPersons from '../components/ListPersons/ListPersons'
import { IPersonParams } from '../data/IPersonParams'
import { fetchAsync } from '../utils/fetchAsync'

interface MainPageProps {
  persons: IPersonParams[];
  next: string | null;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  fetchPersons: (url: string) => void;
}

const MainPage: FC<MainPageProps> = ({persons, isLoading, next, fetchPersons, setIsLoading}) => {

  const loadPersons = async (inView: boolean) => {
    if(isLoading) return false
      if(inView) {
        if(next) {
          setIsLoading(true)
          await fetchPersons(next)
          setIsLoading(false)
        }
      }
  }
  
    return (
        <div>
            {!persons.length ? <Circles 
                color="#ffe926"
                ariaLabel="circles-loading"
                wrapperClass='circles'
            /> : (
            <>
              <ListPersons persons={persons}/>
              {isLoading && <Circles 
                color="#ffe926"
                ariaLabel="circles-loading"
                wrapperClass='circles-loading'
              />}
            </>
        )}
      
            <InView as={'div'} onChange={loadPersons}/>
        </div>
    )
}
export default MainPage