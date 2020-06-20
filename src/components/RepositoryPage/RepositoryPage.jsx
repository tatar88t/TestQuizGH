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
            <table>
                <thead>
                    <tr>
				    	<td>Repository Name</td><td>Stars</td><td>Last Update</td>
				    </tr>
                </thead>
                <tbody>
                    <tr>
                       <td>{props.repoPage.name}</td>
                       <td>{props.repoPage.stargazers_count}</td>
                       <td>{props.repoPage.updated_at}</td>
                    </tr>
                </tbody>
                
                
                
            </table>
            <div className = {stl.repoPageProfile}>
                    
                    <img src = {props.repoPageOwner.avatar_url}
                             alt ="profile"/> 
                   


                    <div className = {stl.repoPageProfileLink}>
                        <a href = {props.repoPageOwner.html_url} 
                           target = "_blank"
                           rel="noopener noreferrer">{props.repoPageOwner.login}</a>
                    </div>
            </div>
           
        
        
            <div className = {stl.descr} >Languages Used:
            <br/>
            {languages.map((item, i) => {
		    				return <span key = {i}>{item}  </span>
		    			})}	
            </div>
            <br/>
            <div className = {stl.descr}>Description:
                <span>{props.repoPage.description}
                
                </span>
            </div>


        <table className = {stl.descr}>
            <thead>           
                <tr>
                    <td>
                        Contributors      
                    </td> 
                    <td>
                        Contributions     
                    </td> 

                </tr> 
            </thead> 

            {contributors
                .filter((contrib, i) => i < 10)
                .map(contrib => {
                return <tbody key = {contrib.id}>
                            <tr>
                                <td>
                                    <a href = {contrib.html_url} 
                                       target = "_blank"
                                       rel="noopener noreferrer">
                                            {contrib.login}
                                    </a>
                                </td>

                                <td>
                                    {contrib.contributions} 
                                </td>

                            </tr>
                        </tbody>
            })}                                 
                           
        </table>
               
    
        </div>
    )
}

export default RepositoryPage;