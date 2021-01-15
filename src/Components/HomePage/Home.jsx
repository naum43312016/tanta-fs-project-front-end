import React from 'react';
import { Row } from 'reactstrap';
import Filter from './Filter';
import ItemCard from './ItemCard';
import SearchBar from './SearchBar';

const Home = () => {
    return (
        <div>
            <SearchBar />
            <Filter />
            <ItemCard />
        </div>
    )
}

export default Home;