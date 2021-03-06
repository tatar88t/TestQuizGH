import React, {useState, useEffect} from 'react';
import './App.css';
import Results from './components/Results/Results';
import { Route } from 'react-router-dom';
import RepositoryPage from './components/RepositoryPage/RepositoryPage';
import Search from './components/Search/Search';
import useDebounced from './components/Debouncer/Debouncer';
import Constants from './Constants/Constants';
import { ResultsContext } from './Context/ResultsContext';
import {username, password} from './AuthData';
const App = () => {
	const [repoPageOwner, setRepoPageOwner] = useState({});
	const [inputValue, setInputValue] = useState('');
	const [totalCount, setTotalCount] = useState('');
	const [repoPage, setRepoPage] = useState({});
	const [repos, setRepos] = useState([]);
	const [page, setPage] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	let debouncedInputValue = useDebounced(inputValue || Constants.INIT_QUERY, 800);
	let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
	let pagesCountShow =[];
	let totalPages = Math.ceil(totalCount / Constants.PER_PAGE);
				for (let i=1; i <= totalPages ; i++) {
					pagesCountShow.push(i)
				}
	
	useEffect(() => {
		const inputValueLocal = localStorage.getItem('inputValue') || Constants.INIT_QUERY;
		const pageLocal = localStorage.getItem('page') || 1;
		setInputValue(inputValueLocal);
		setPage(+pageLocal);	
	}, [])
		
	useEffect(() => {
		localStorage.setItem('inputValue', inputValue)
		localStorage.setItem('page', page)
	}, [inputValue, page])
	
	
	useEffect(() => {
		setLoading(true);
		fetch(`https://api.github.com/search/repositories?q=${debouncedInputValue}+in:name&sort=stars&per_page=${Constants.PER_PAGE}&page=${page}`,
		 {headers: headers})
  		.then((response) => {
  		  return response.json();
  		})
  		.then((data) => {
		setLoading(false)
		setRepos(data.items);
		setTotalCount(data.total_count)
		 })
		.catch(err => {
        setLoading(false);
        setError(true);
        console.error(err);
      });
	}, [debouncedInputValue, page]);
    return <>
			<ResultsContext.Provider value = {{
					inputValue,
					setInputValue, setPage,
					repos, page,
					setRepoPage, setRepoPageOwner,
					pagesCountShow, totalPages,
					totalCount, loading, error}}>
				<Search />
				<Route  exact path = '/results' render = {
					() => <Results />} />
			</ResultsContext.Provider>					
				<Route exact path = '/repo' render = {
					() => <RepositoryPage repoPage = {repoPage}
										repoPageOwner = {repoPageOwner} 
										/>} />
			
		</>
}

export default App;
