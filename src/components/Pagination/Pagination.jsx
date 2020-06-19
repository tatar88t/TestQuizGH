import React from 'react';
import stl from './pagination.module.css'
const Pagination =(props) => {
    
    let portionCount = Math.ceil(props.totalPages / props.PORTION_SIZE);

	let [portionNum, setPortionNum] = React.useState(1);
	let leftPortionPageNum = (portionNum - 1) * props.PORTION_SIZE + 1;
	let rightPortionPageNum = portionNum * props.PORTION_SIZE
    
    
    return(
        <div className = {stl.pagination}>
					{portionNum > 1  &&
					<button onClick = {() => { setPortionNum(portionNum - 1)}}>PREV</button>}

					{props.pagesCountShow
								.filter(p => p>= leftPortionPageNum && p <= rightPortionPageNum)
								.map(p => {
						return <span onClick ={(e) => {props.setPage(p)}} 
									 className = {props.page === p ? stl.activePageNum : stl.pageNum}>{p}
								</span>
							   
								
					})}	
					{portionCount > portionNum &&
						<button onClick = {() => {setPortionNum(portionNum + 1)}}>NEXT</button>}
					<div>
						<span>{props.totalPages} repositories found</span>	
					</div>	
					
				</div>
    )
}

export default Pagination;