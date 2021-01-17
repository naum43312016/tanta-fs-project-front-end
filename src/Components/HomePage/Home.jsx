import React, { useEffect, useState } from 'react';
import { Row } from 'reactstrap';
import Filter from './Filter';
import ItemCard from './ItemCards';
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

    useEffect(() => { //fetching the right category
        axios.get(BASE_URL + `/category?name=${category}`)
            .then(res => console.log(res))
            .catch(err => console.log('There was an issue fetching the items of the requested category'));
    }, [category])

    useEffect(() => { //fetching the right category
        axios.get(BASE_URL + `/category?name=${category}`)
            .then(res => console.log(res))
            .catch(err => console.log('There was an issue fetching the items of the requested category'));
    }, [category])

    return (
        <div>
            <Row style={{ backgroundColor: "#7AE582", height: "30px" }} className="search-bar justify-content-center align-items-center" />
            <Filter category={category} setCategory={setCategory} setPrice={setPrice} setSearch={setSearch} />
            <div className="category-title">
                <p className="mr-sm-5 mr-3">{category === "" && price === "" ? "All Items" : category}</p>
                {price === '' ? null : <>{category !== "" ? <p className="mr-sm-5 mr-3">|</p> : null}<p>{price} <FontAwesomeIcon style={{ color: "orange", fontSize: "20px" }} icon={faCoins} /></p></>}
            </div>
            <ItemCard cards={cards} />
        </div>
    )
}

export default Home;