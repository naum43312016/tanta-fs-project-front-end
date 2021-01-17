import React, { useEffect, useState } from 'react';
import { Row, Container } from 'reactstrap';
import ItemDetails from './ItemDetails';
import axios from 'axios';

const ItemPage = () => {
    const [item, setItem] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        axios.get(BASE_URL + window.location.pathname)
        .then(res => setItem(res.data))
        .then(err => console.log("Couldn't get item"));
    }, [])

    return (
        <Container className="mt-5">
            <p className="category-title mb-5">{item.name}</p>
            <ItemDetails item={item} />
        </Container>
    )
}

export default ItemPage;