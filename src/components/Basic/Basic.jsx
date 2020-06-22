import React from 'react';
import stl from './basic.module.css';
import {useHistory} from 'react-router-dom';




const Basic = (props) => {

    let history = useHistory()
    React.useEffect(() => {
		props.inputValue ? history.push('/search') : history.push('')
    }, [props.inputValue, history])

    return(
        <div className = {stl.queryForm}>
            <h1>GitHub Dashboard</h1>
            <form onSubmit = {(e) =>
                                    {e.preventDefault(); 
                                    
                                     props.setInputValue('stars:>500')
                                     props.setPage(1)
                                     e.target.elements.query.value = ''
                                }}>
                                      
                <input 
                       className = {stl.queryInput} type = 'text' 
                       placeholder = 'Search Github Repositories...' name = 'query'
                       onChange = {(e) =>  {props.setInputValue(e.target.value) 
                                            props.setPage(1)
                                        }} 
                        />
                <button className = {stl.queryBtn} type = 'submit'>Clear</button>
            </form>
        </div>
    )
}


export default Basic