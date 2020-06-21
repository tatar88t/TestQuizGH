import React, {useState, useEffect, useRef} from 'react';

import './App.css';
import Search from './components/Search/Search';
import { Route } from 'react-router-dom';
import RepositoryPage from './components/RepositoryPage/RepositoryPage'
import Basic from './components/Basic/Basic'


const App = () => {
	const [fetchCounter, setFetchCounter] = useState(0);

	const [inputValue, setInputValue] = useState('');
	const [repoPageOwner, setRepoPageOwner] = useState({});
	const [totalCount, setTotalCount] = useState('');
	const [repoPage, setRepoPage] = useState({});
	const [repos, setRepos] = useState([]);
	const [page, setPage] = useState('');
	
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const PORTION_SIZE = 10;
	const PER_PAGE = 10;
	
	let pagesCountShow =[];

	let totalPages = Math.ceil(totalCount / PER_PAGE);
				for (let i=1; i <= totalPages ; i++) {
					pagesCountShow.push(i)
				}

	const usePrevious = (value) => {
		const ref = useRef(value);
		// useEffect(() => {
		// 	ref.current = value;
		// })
		return ref.current;

	}
	let prevInput = usePrevious(inputValue)

	console.log(prevInput, 'prevInput')
	useEffect(() => {
		const inputValueLocal = localStorage.getItem('inputValue') || 'stars:>500';
		const pageLocal = localStorage.getItem('page') || 1;
		if (prevInput !== inputValue){
			setPage(1)
		}
		setInputValue(inputValueLocal);
		setPage(+pageLocal);
		
	}, [])	

	useEffect(() => {
		localStorage.setItem('inputValue', inputValue)
		localStorage.setItem('page', page)

	}, [inputValue, page])

	


	useEffect(() => {

		
		// if(!inputValue){
		// 	setInputValue('stars:>500');
		// 	setPage(1)
		// 	return;
		// }
		

		setLoading(true)

		fetch(`https://api.github.com/search/repositories?q=${inputValue}+in:name&sort=stars&per_page=${PER_PAGE}&page=${page}`)
  		.then((response) => {
  		  return response.json();
  		})
  		.then((data) => {
		setLoading(false)
		setRepos(data.items);
		setTotalCount(data.total_count)
		setFetchCounter(fetchCounter + 1)
		 })
		

		.catch(err => {
        setLoading(false);
        setError(true);
        console.error(err);
      });

	}, [inputValue, page])
	console.log(fetchCounter, 'FetchCounter')
    return <>
				<Basic setInputValue = {setInputValue} 
					   repos = {repos} 
					   inputValue ={inputValue} 
					   setPage = {setPage}/>
				<Route  exact path = '/search' render = {() => <Search setInputValue = {setInputValue} 
																 repos ={repos}
																 page = {page}
																 setPage = {setPage}
																 setRepoPage = {setRepoPage}
																 PER_PAGE = {PER_PAGE} 
																 setRepoPageOwner = {setRepoPageOwner}
																 pagesCountShow ={pagesCountShow}
																 totalPages = {totalPages}
																 PORTION_SIZE = {PORTION_SIZE}
																 totalCount = {totalCount}
																 loading = {loading}
																 error = {error} />} />
				<Route exact path = '/repo' render = {() => <RepositoryPage repoPage = {repoPage}
																			repoPageOwner = {repoPageOwner} 

																			/>} />
			</>
}

export default App;
