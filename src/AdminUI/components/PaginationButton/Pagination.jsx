import {getPages} from '../../utils';
import { StyledPaginationDiv } from './styles.js';
import  PaginationButton from '../PaginationButton';
import {FIRST_PAGE, LAST_PAGE, NEXT, PREVIOUS} from '../../constants';

const Pagination = ({prevDisabled, nextDisabled, totalPages, currentPage, getUpdatedList}) => {
    return (
			<StyledPaginationDiv>
				<PaginationButton disabled={prevDisabled} content="&laquo;" onClick={() => getUpdatedList(FIRST_PAGE)}/>
				<PaginationButton disabled={prevDisabled} content="Prev" onClick={() => getUpdatedList(PREVIOUS)}/>
				{getPages(totalPages, getUpdatedList, currentPage)}
				<PaginationButton disabled={nextDisabled} content="Next" onClick={() => getUpdatedList(NEXT)}/>
				<PaginationButton disabled={nextDisabled} content="&raquo;" onClick={() => getUpdatedList(LAST_PAGE)}/>
			</StyledPaginationDiv>
    )
};
export default Pagination;