import './Search.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchResults, selectSearch } from '../../redux/slices/searchSlice'
import { useEffect } from 'react'
import Poster from '../../components/Poster/Poster'

export default function Search() {
    const dispatch = useDispatch()
    const { results, input, status } = useSelector(selectSearch)

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchSearchResults())
        }
    }, [status, dispatch])

  return (
    <div className="Search">
        {results && (results.length > 0) && (
            <h2 className='Search__title'>
                Search results for "{input}":
            </h2>
        )}
        <div className="Search__wrap">
            {results && (results.length > 0) ? results.map(result => (
                <Poster movie={result} isLarge={false} />
            )) : (
                <h2 className='Search__title'>
                    Your search for "{input}" did not have any matches.
                </h2>
            )}
        </div>
    </div>
  )
}
