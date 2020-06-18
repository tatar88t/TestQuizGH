import React from 'react';
import stl from './repositoryPage.module.css'
const RepositoryPage = (props) => {
    
    const [lang, setLang] = React.useState([]);
    const [contributors, setContributors] = React.useState([]);
    
    React.useEffect(() => {
		
		fetch(props.repoPage.languages_url)
  		.then((response) => {
            console.log(props.repoPage.languages_url)
            return response.json();
            
  		})
  		.then((data) => {
		
		setLang(data);
		 });
    }, [props.repoPage.languages_url])
    
        console.log('lang:')    
        
        let keys = Object.keys(lang)
        let languages = []
        for (let i = 0; i< keys.length; i++){languages.push(keys[i])}
        console.log(languages)

    React.useEffect(() => {
		
        fetch(props.repoPage.contributors_url)
          .then((response) => {
            console.log(props.repoPage.contributors_url)
            return response.json();
            
          })
          .then((data) => {
        
        setContributors(data);
         });
        }, [props.repoPage.contributors_url])
        
            console.log('Contrib:')    
            console.log(contributors)
            

    return(
        <div className = {stl.repoPage}>
            <div>{props.repoPage.name}, {props.repoPage.stargazers_count}, {props.repoPage.updated_at}</div>
            {/* {repoPage.id} */}
            <div className = {stl.repoPageImg}>
                <img   
                      src = {props.repoPageOwner.avatar_url}
                      alt ="profile-photo"/> 
                <div><a href = {props.repoPageOwner.html_url} 
                      target = "_blank">{props.repoPageOwner.login}</a>
                </div>
            </div>
        
        
        <div>Languages Used:</div>
        {languages.map(item => {
						return <span>{item},</span>
					})}	
        <div>{props.repoPage.description}</div>
        <div>
        Contributors:
            <ul>
            {contributors.map(contrib => {
                return <li key = {contrib.id}><a href = {contrib.html_url}>{contrib.login}</a> Contributions: {contrib.contributions} </li>
            })}                                 
            </ul>                 
        </div>
               
    
        </div>
    )
}

export default RepositoryPage;