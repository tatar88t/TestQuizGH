import React from 'react';
import stl from './search.module.css'
import {Link, Router} from 'react-router-dom';
const Search = (props) => {


	let portionCount = Math.ceil(props.totalPages / props.PORTION_SIZE);

	let [portionNum, setPortionNum] = React.useState(1);
	let leftPortionPageNum = (portionNum - 1) * props.PORTION_SIZE + 1;
	let rightPortionPageNum = portionNum * props.PORTION_SIZE


	console.log(props.pageAmount, 'pageAmount from props')
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
					{portionNum > 1  &&
					<button onClick = {() => { setPortionNum(portionNum - 1)}}>PREV</button>}

					{props.pageAmount
								.filter(p => p>= leftPortionPageNum && p <= rightPortionPageNum)
								.map(p => {
						return <span onClick ={(e) => {props.setPage(p)}} 
									 className = {props.page === p ? stl.activePageNum : stl.pageNum}>{p}
								</span>
							   
								
					})}	
					{portionCount > portionNum &&
						<button onClick = {() => {setPortionNum(portionNum + 1)}}>NEXT</button>}
					<div>
						<span>{props.totalPages} repositories found</span>	
					</div>	
					
				</div>
						
        </div>
                
    );
}
export default Search;