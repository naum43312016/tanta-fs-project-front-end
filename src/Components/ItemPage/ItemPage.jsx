import React, { useEffect, useState } from 'react';
import { Row, Container } from 'reactstrap';
import ItemDetails from './ItemDetails';
import axios from 'axios';
import Fox from '../HomePage/971c17c93f74bc7280e285153b2e1ace-700.jpg';
import {BASE_URL} from '../HomePage/Home'

const ItemPage = () => {
    const [item, setItem] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + window.location.pathname)
        .then(res => setItem(res.data))
        .then(err => console.log("Couldn't get item"));
    }, [])

    return (
        <Container className="item">
            <p className="item-title mb-5">{item.name}</p>
            <ItemDetails item={item} />
        </Container>
    )
}

export default ItemPage;