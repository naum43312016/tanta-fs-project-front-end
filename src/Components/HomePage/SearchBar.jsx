import React, { useState } from 'react';
import { Input, Row } from 'reactstrap';

const SearchBar = () => {
    const [search, setSearch] = useState('');

    return (
        <Row className="search-bar justify-content-center align-items-center">
            <label className="mt-3 mr-3">Search</label>
            <Input onChange={(e) => setSearch(e.target.value)} className="col-sm-2 col-4"></Input>
        </Row>
    )
}

export default SearchBar;