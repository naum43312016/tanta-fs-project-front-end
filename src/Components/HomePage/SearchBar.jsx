import React from 'react';
import { Input, Row } from 'reactstrap';

const SearchBar = (props) => {

    return (
        <Row className="search-bar justify-content-center align-items-center">
            <label style={{fontWeight:"bold", fontSize:"19px", color:"white"}} className="mt-3 mr-3">Search</label>
            <Input onChange={(e) => props.setSearch(e.target.value)} value={props.search} className="col-sm-2 col-4"></Input>
        </Row>
    )
}

export default SearchBar;