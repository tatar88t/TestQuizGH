import React, {useContext} from 'react';
import stl from './results.module.css';
import {Link} from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import githubLogo from './img/github-seeklogo.com.svg';
import {ResultsContext} from '../../Context/ResultsContext';
const Results = (props) => {

	const {repos, setRepoPage, setRepoPageOwner, loading, error} = useContext(ResultsContext)
	
    return (
        <div className= {stl.searchResults} >
			{loading && <div className={stl.spinner}>
								<div className={stl.eclipse}>
								<div></div>
								</div></div>}
			{error && <div> Error. Note, that For unauthenticated requests, the rate limit allows you to make up to 10 requests per minute. Try again Later
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
				{repos && repos.length === 0  && 
					<tbody className = {stl.searchResNomatch}>
						<tr>
						<td colSpan = '4'>No matches found...try again...</td>
						</tr>
					</tbody>}
				{repos && repos.map(repo => {
					return <tbody key = {repo.id}>
							<tr>
								<td>
									<Link to = "/repo" 
									onClick = {(e) => {setRepoPage(repo);
											setRepoPageOwner(repo.owner)}}>
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
			<Pagination />				
        </div>            
    );
}
export default Results;