import React from 'react';

import './App.css';
import Search from './components/Search/Search';
import { Route, Switch } from 'react-router-dom';
import RepositoryPage from './components/RepositoryPage/RepositoryPage'
import Basic from './components/Basic/Basic'
// https://api.github.com/search/repositories?q=html

const App = () => {
	
	const [inputValue, setInputValue] = React.useState('');
	const [repos, setRepos] = React.useState([]);
	const [page, setPage] = React.useState('');
	const [repoPage, setRepoPage] = React.useState({});
	const [repoPageOwner, setRepoPageOwner] = React.useState({})
	const PER_PAGE = 10;
	const [pageAmount, setPageAmount] = React.useState([])

	let totalCount = repos.total_count;
	let pagesCount = Math.ceil(totalCount / PER_PAGE)

	let pagesCountShow =[];

		for (let i=1; i < 10 ; i++) {
			pagesCountShow.push(i)
		}

		console.log(pagesCountShow, 'pagesCountShow')
	
	React.useEffect(() => {
		if(!inputValue){
			console.log('bibilo')
			return;
		}
		fetch(`https://api.github.com/search/repositories?q=${inputValue}&per_page=${PER_PAGE}&page=${page}`)
  		.then((response) => {
  		  return response.json();
  		})
  		.then((data) => {
		console.log(data);
		setRepos(data.items);
		 });
	}, [inputValue, page, repoPage, repos])
	//    setInputValue('');
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
																 pageAmount = {pageAmount} 
																 pagesCountShow ={pagesCountShow}/>} />
				<Route exact path = '/repo' render = {() => <RepositoryPage repoPage = {repoPage}
																			repoPageOwner = {repoPageOwner} 

																			/>} />
				{/* <Route path = '/'>
					<Search />
				</Route>
				<Route path = '/repo'>
					<RepositoryPage />
				</Route> */}
			
			</>
}

export default App;
