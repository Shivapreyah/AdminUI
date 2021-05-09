import PaginationButton from './components/PaginationButton';

export const getPages= (totalPages, onClickHandler, currentPage) => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(<PaginationButton key = {i} content={i} onClick={() => onClickHandler(i)} active={currentPage === i}/>);
    }
    return pages;
};

export const isPrevButtonDisabled = (currentPage, totalPages)=>{
  return currentPage === 1 || totalPages === 1;
};

export const isNextButtonDisabled = (currentPage, totalPages)=>{
  return currentPage === totalPages || totalPages === 1;
};

export const getStartIndex = (countPerPage, currentPage) => {
  return ((countPerPage*currentPage) - countPerPage)
}