import React, {useState} from 'react';

import './App.css';
import Search from './components/Search/Search';
import { Route } from 'react-router-dom';
import RepositoryPage from './components/RepositoryPage/RepositoryPage'
import Basic from './components/Basic/Basic'


const App = () => {
	
	const [inputValue, setInputValue] = useState('stars:>500');
	const [repoPageOwner, setRepoPageOwner] = useState({});
	const [totalCount, setTotalCount] = useState('');
	const [repoPage, setRepoPage] = useState({});
	const [repos, setRepos] = useState([]);
	const [page, setPage] = useState(1);
	
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const PORTION_SIZE = 10;
	const PER_PAGE = 10;
	
	let pagesCountShow =[];

	let totalPages = Math.ceil(totalCount / PER_PAGE);
				for (let i=1; i <= totalPages ; i++) {
					pagesCountShow.push(i)
				}


	React.useEffect(() => {

		if(!inputValue){
			setInputValue('stars:>500');
			return;
		}
		setLoading(true)

		fetch(`https://api.github.com/search/repositories?q=${inputValue}&sort=stars&per_page=${PER_PAGE}&page=${page}`)
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

	}, [inputValue, page])

    return <>
				<Basic setInputValue = {setInputValue} 
					   repos = {repos} 
					   inputValue ={inputValue} />
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
