import React from 'react';
import stl from './search.module.css'
import {Link, Router} from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import githubLogo from './img/github-seeklogo.com.svg'
const Search = (props) => {


	console.log(props.pageAmount, 'pageAmount from props')
	console.log(props.pagesCountShow, 'PagesCountShow')
    return (
 
        <div className= {stl.searchResults} >
			<table className = {stl.searchResRepos} >
				<tr>
					<td>Repository Name</td><td>Stars</td><td>Last Update</td><td>Link to Github Repository</td>
				</tr>
				{props.repos.map(repo => {
					return <tr key = {repo.id}>
								<td>
									<Link to = "/repo" 
									onClick = {(e) => {props.setRepoPage(repo);
											props.setRepoPageOwner(repo.owner)}}>
											{repo.name} 
									</Link>
								</td> 
								<td> {repo.stargazers_count} </td>
								<td>{repo.updated_at.slice(0, -10)}</td>
								<td>
									<a href = "{repo.html_url}">
									<img src = {githubLogo} alt = 'githubLink' />
									</a> 	
								</td>
								
							</tr>
				})}
				
			</table>

			<Pagination totalPages = {props.totalPages}
						PORTION_SIZE = {props.PORTION_SIZE} 
						page = {props.page}
						setPage = {props.setPage}
						pageAmount = {props.pageAmount}
						pagesCountShow = {props.pagesCountShow} />				
        </div>
                
    );
}
export default Search;