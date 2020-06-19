import React from 'react';
import stl from './basic.module.css'
import {useHistory} from 'react-router-dom';




const Basic = (props) => {

    let history = useHistory()
    React.useEffect(() => {
        
		props.inputValue ? history.push('/search') : history.push('')
    // document.location.pathname = '/search'
    console.log(props.inputValue, 'props.inputValue')
    }, [props.inputValue, history])
    // console.log(props.location.pathname, 'location')
    return(
        <div className = {stl.queryForm}>
            <h1>GitHub Dashboard</h1>
            <form onSubmit = {(e) =>
                                    {e.preventDefault(); 
                                    
                                     props.setInputValue(e.target.elements.query.value)}}>
                                      
                <input className = {stl.queryInput} type = 'text' placeholder = 'Search Github Repositories...' name = 'query' />
                {/* */}
                <button className = {stl.queryBtn} type = 'submit'>Search</button>
            </form>
        </div>
    )
}
// withRouter(Basic)

export default Basic