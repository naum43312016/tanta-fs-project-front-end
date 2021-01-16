import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import ItemCard from './ItemCard';
import SearchBar from './SearchBar';
import axios from 'axios';

const Home = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('')
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => { //getting all categories on first app render
        axios.get(BASE_URL + '/category/all')
        .then(res => console.log(res))
        .catch(err => console.log('There was an issue getting the items'))
    }, [])

    useEffect(() => { //fetching categories
        axios.get(BASE_URL + `/category?name=${category}`)
        .then(res => console.log(res))
        .catch(err => console.log('Error fetching the requested category'));
    }, [category])

    return (
        <div>
            <SearchBar search={search} setSearch={setSearch} />
            <Filter category={category} setCategory={setCategory} />
            <ItemCard />
        </div>
    )
}

export default Home;