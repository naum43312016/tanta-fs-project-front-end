import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import ItemCard from './ItemCards';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import BASE_URL from '../../Tools/URLs';

const Home = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => { //getting all items on first app render
        axios.get(BASE_URL + '/home/get-all-items')
            .then(res => {
                const availableCards = []
                res.data.forEach(item => {
                    if(item.status == 'available') {
                        availableCards.push(item)
                    }
                })
                setCards(availableCards)
            })
            .catch(err => 'There was an issue fetching all the items');
    }, [])

    useEffect(() => { //fetching the right category
        axios.get(BASE_URL + `/search/item?category=${category}&price=${price}&name=${search}`)
            .then(res => {
                const availableCards = []
                res.data.items.forEach(item => {
                    if(item.status == 'available') {
                        availableCards.push(item)
                    }
                })
                setCards(availableCards)
            })
            .catch(err => console.log('There was an issue fetching the items of the requested category'));
    }, [category, price, search])

    return (
        <div>
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