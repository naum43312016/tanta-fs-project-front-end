import React from 'react';
import { Input, Row } from 'reactstrap';

const SearchBar = () => {
    return (
        <Row style={{height:"70px", border:"2px solid lightgrey"}} className="justify-content-center align-items-center">
            <p className="mt-3 mr-3">Search</p>
            <Input className="col-sm-2 col-4"></Input>
        </Row>
    )
}

export default SearchBar;