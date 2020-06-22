import React from 'react';
import stl from './results.module.css'
import {Link} from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import githubLogo from './img/github-seeklogo.com.svg'

const Results = (props) => {
    return (
        <div className= {stl.searchResults} >
			{props.loading && <div className={stl.spinner}>
								<div className={stl.eclipse}>
								<div></div>
								</div></div>}
			{props.error && <div> Error. Note, that For unauthenticated requests, the rate limit allows you to make up to 10 requests per minute. Try again Later
				</div>}
			<table className = {stl.searchResRepos} >
				<thead>
					<tr>
						<td>Repository Name</td>
						<td>Stars</td>
						<td>Last Update</td>
						<td>Link to GitHub Repository</td>
					</tr>
				</thead>
				{props.repos && props.repos.length === 0  && 
					<tbody className = {stl.searchResNomatch}>
						<tr>
						<td colSpan = '4'>No matches found...try again...</td>
						</tr>
					</tbody>}
				{props.repos && props.repos.map(repo => {
					return <tbody key = {repo.id}>
							<tr>
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
									<a href = {repo.html_url}
									   target = "_blank"
									   rel="noopener noreferrer">
									<img src = {githubLogo} alt = 'githubLink' />
									</a> 	
								</td>	
							</tr>
							</tbody>
				})}	
			</table>			
			<Pagination totalPages = {props.totalPages}
						page = {props.page}
						setPage = {props.setPage}
						pageAmount = {props.pageAmount}
						pagesCountShow = {props.pagesCountShow}
						totalCount = {props.totalCount} />				
        </div>            
    );
}
export default Results;