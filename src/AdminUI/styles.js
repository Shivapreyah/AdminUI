import styled from 'styled-components';

export const StyledHeader = styled.th`
  padding: 10px 10px 10px 0;
  border-bottom: 1px solid #cccccc;
  background-color: #8c8c8c;
`;
export const StyledTD = styled.td`
  border-bottom: 1px solid #cccccc;
  padding-bottom: 5px;
`;

export const GlobalLayout = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const StyledTable = styled.table`
  width: 100%;
  padding: 0 20px 20px 20px;
  text-align: left;
  border-collapse: separate;
  border-spacing: 0 10px;
`;

export const Pagination = styled.div`
  a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
  }

  a.active {
    background-color: #e60000;
    color: white;
  }
`;

export const StyledDiv = styled.div`
  min-height: 500px;
  width: 100%;
  overflow-y: auto;
`;

export const StyledActionDiv = styled.span`
  padding-left: ${({padding}) => padding || "10px"};
`;
export const StyledFooterDiv = styled.div`
  width: 100%;
`;

export const StyledButton = styled.button`
  border-radius: 30px;
  background-color: ${({disabled}) => disabled ? "#b3b3b3" : "#b30000"};
  border: none;
  color: #FFFFFF;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};;
  float: left;
  margin-left: 30px;
`;

export const StyledSave = styled.button`
  border-radius: 20px;
  background-color: ${({disabled}) => disabled ? "#b3b3b3" : "#FFFFFF"};
  border: none;
  color: #000000;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};;
`;

export const StyledEditDiv = styled.div`
  background-color: #808080;
  div {
    margin: 8px;
  }
`;

export const StyledRow = styled.tr`
  height: 150px;
  transition: height: 2000ms ease-in-out, opacity 2500ms ease-in-out;
`;
export const StyledTextbox = styled.input`
  width: 80%;
  padding: 12px 20px;
  margin: 8px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

export const SearchDiv = styled.div`
  width: 95%;
  margin: 20px 0 0 20px ;
  i {
    position: absolute;
  }
`;

export const SearchText = styled.input`
  background-image: url('../images/searchIcon.png');
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 97%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
`;