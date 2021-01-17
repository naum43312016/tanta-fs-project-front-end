import React, { useEffect, useState } from 'react';
import { Row, Container } from 'reactstrap';
import ItemCard from '../HomePage/ItemCards';
import ItemCards from '../HomePage/ItemCards';
import axios from 'axios';
import Fox from '../HomePage/971c17c93f74bc7280e285153b2e1ace-700.jpg';

const ItemPage = () => {
    const [item, setItem] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        axios.get(BASE_URL + window.location.pathname)
        .then(res => console.log(res))
        .then(err => console.log("Couldn't get item"));
    }, [])

    return (
        <Container className="mt-5">
            <p className="category-title mb-5">Item</p>
            <div style={{width:"40%", height:"300px", backgroundImage:`url(${Fox})`}} className="card-img ml-5"></div>
            <ItemCards cards={item} />
        </Container>
    )
}

export default ItemPage;