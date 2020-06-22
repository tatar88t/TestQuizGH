import React, {useContext} from 'react';
import stl from './search.module.css';
import {useHistory} from 'react-router-dom';
import Constants from '../../Constants/Constants'
import {ResultsContext} from '../../Context/ResultsContext'


const Search = (props) => {

    const {inputValue, setInputValue, setPage} = useContext(ResultsContext)

    let history = useHistory()
    React.useEffect(() => {
		inputValue ? history.push('/results') : history.push('')
    }, [inputValue, history])

    return(
        <div className = {stl.queryForm}>
            <h1>GitHub Dashboard</h1>
            <form onSubmit = {(e) =>
                                    {e.preventDefault(); 
                                    
                                     setInputValue(Constants.INIT_QUERY)
                                     setPage(1)
                                     e.target.elements.query.value = ''
                                }}>
                                      
                <input 
                       className = {stl.queryInput} type = 'text' 
                       placeholder = 'Search Github Repositories...' name = 'query'
                       onChange = {(e) =>  {setInputValue(e.target.value) 
                                            setPage(1)
                                        }} 
                        />
                <button className = {stl.queryBtn} type = 'submit'>Clear</button>
            </form>
        </div>
    )
}


export default Search