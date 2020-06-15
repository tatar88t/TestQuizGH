import React from 'react';

import './App.css';

// https://api.github.com/search/repositories?q=html

function App() {
	const [inputValue, setInputValue] = React.useState('');
	const [repos, setRepos] = React.useState([]);
	const [page, setPage] = React.useState('')

	const PER_PAGE = 10;
	
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
	}, [inputValue, page])

	
	

	let totalCount = repos.total_count;
	let pagesCount = Math.ceil(totalCount / PER_PAGE)

	let pagesCountShow =[];
//------------------------pagesCount
		for (let i=1; i < 10; i++) {
			pagesCountShow.push(i)
		}


    return (
        <div className="App">
            <div>
                <form onSubmit = {(e) => {e.preventDefault();
                                         setInputValue(e.target.elements.query.value)}}>
                    <input type = 'text' placeholder = 'Search Github Repositories...' name = 'query' ></input>
                    <button type = 'submit'>Search</button>
                </form>
            </div>
			<ul>
				{repos.map(repo => {
					return <li key = {repo.id}>{repo.name}, {repo.stargazers_count}, {repo.updated_at}, {repo.html_url}</li>
				})}
				<li></li>
			</ul>
				<div>
					{pagesCountShow.map(p => {
						return <span onClick ={(e) => {setPage(p)}}>{p}</span>
					})}		
				</div>
        </div>
    );
}

export default App;
