import React from 'react';
import stl from './search.module.css'
import {Link, Router} from 'react-router-dom';
const Search = (props) => {


	console.log(props.pageAmount)
	const [pageAmount, setPageAmount] = React.useState([])

    return (
 
        <div className= {stl.searchResults} >
			<ul className = {stl.searchResRepos} >
				{props.repos.map(repo => {
					return <li key = {repo.id}><Link to = "/repo" onClick = {(e) => {props.setRepoPage(repo);
																					props.setRepoPageOwner(repo.owner)}
																				}>{repo.name}, -- </Link> 
																									  <span>STARS: {repo.stargazers_count}, -- </span>
																									  <span>LAST UPDATE: {repo.updated_at}, -- </span>
																									  <a href = "{repo.html_url}">
																									  LINK TO {repo.name} REPOSITORY
																									  </a> </li>
				})}
				<li></li>
			</ul>
				<div className = {stl.pagination}>
					{props.pagesCountShow.map(p => {
						return <span onClick ={(e) => {props.setPage(p)}} className = {props.page === p ? stl.activePageNum : stl.pageNum}>{p}</span>
					})}		
				</div>
           
        </div>
                
    );
}
export default Search;