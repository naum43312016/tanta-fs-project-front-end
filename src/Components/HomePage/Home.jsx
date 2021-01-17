import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import ItemCard from './ItemCards';
import SearchBar from './SearchBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('');
    const [cards, setCards] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => { //getting all items on first app render
        axios.get(BASE_URL + '/home/get-all-items')
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
            <Filter category={category} setCategory={setCategory} setPrice={setPrice} />
            <div className="category-title">
                <p className="mr-sm-5 mr-3">{category === "" ? "All Items" : category}</p>
                {price === '' ? null : <><p className="mr-sm-5 mr-3">|</p><p>{price} <FontAwesomeIcon style={{color:"orange", fontSize:"20px"}} icon={faCoins} /></p></>}
            </div>
            <ItemCard cards={cards} />
        </div>
    )
}

export default Home;