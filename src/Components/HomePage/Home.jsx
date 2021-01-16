import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import ItemCard from './ItemCards';
import SearchBar from './SearchBar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('')
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => { //getting all items on first app render
        axios.get('http://localhost:3001/home/get-all-items')
            .then(res => setCards(res.data))
            .catch(err => 'There was an issue fetching all the items');
    }, [])

    useEffect(() => { //fetching categories
        axios.get(BASE_URL + `/category?name=${category}`)
            .then(res => console.log(res))
            .catch(err => console.log('There was an issue fetching the items of the requested category'));
    }, [category])

    return (
        <div>
            <SearchBar search={search} setSearch={setSearch} />
            <Filter category={category} setCategory={setCategory} />
            <ItemCard cards={cards} currentCard={currentCard} />
        </div>
    )
}

export default Home;