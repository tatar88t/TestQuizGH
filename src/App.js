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
	const [page, setPage] = React.useState(1);
	const [repoPage, setRepoPage] = React.useState({});
	const [repoPageOwner, setRepoPageOwner] = React.useState({});
	const [totalCount, setTotalCount] = React.useState('');
	const PER_PAGE = 10;
	const PORTION_SIZE = 10;
	const [pageAmount, setPageAmount] = React.useState([])

	let pagesCountShow =[];

	let totalPages = Math.ceil(totalCount / PER_PAGE);
				for (let i=1; i < totalPages ; i++) {
					pagesCountShow.push(i)
				}
	// let portionCount = Math.ceil(totalPages / PORTION_SIZE);

	// let [portionNum, setPortionNum] = useState(1);
	// let leftPortionPageNum = (portionNum - 1) * PORTION_SIZE + 1;
	// let rightPortionPageNum = portionNum * PORTION_SIZE




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
		
		setRepos(data.items);
		setTotalCount(data.total_count)
		 })
		 .then(()=> {
			setPageAmount(pagesCountShow)
		 } )

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
																 pagesCountShow ={pagesCountShow}
																 totalPages = {totalPages}
																 PORTION_SIZE = {PORTION_SIZE}/>} />
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
