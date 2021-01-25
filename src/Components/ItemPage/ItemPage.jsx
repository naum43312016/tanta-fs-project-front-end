import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import ItemDetails from './ItemDetails';
import axios from 'axios';
import BASE_URL from '../../Tools/URLs';

const ItemPage = (props) => {
    const [item, setItem] = useState(null);
    // const [seller, setSeller] = useState();

    useEffect(() => {
        axios.get(BASE_URL + window.location.pathname)
            .then(res => setItem(res.data))
            .catch(err => console.log("Couldn't get item"));
        // axios.get(`${BASE_URL}/user/${item.sellerId}`)
        // .then(res => setSeller(res.data))
        // .catch(err => console.log("Couldn't find seller"))
    }, [])

    return (
        <Container className="item">
            {item &&
                <>
                    <p className="item-title mb-5">{item.name}</p>
                    <ItemDetails item={item} />
                </>}
        </Container>
    )
}

export default ItemPage;