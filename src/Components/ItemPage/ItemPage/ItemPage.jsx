import React, { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import ItemDetails from '../ItemDetails/ItemDetails';
import axios from 'axios';
import BASE_URL from '../../../Tools/URLs';

const ItemPage = (props) => {
    const [item, setItem] = useState(null);

    useEffect(() => {
        axios.get(BASE_URL + window.location.pathname)
            .then(res => setItem(res.data))
            .catch(err => console.log("Couldn't get item"));
    }, [])

    return (
        <Container className="item">
            {item &&
                <div>
                    <Row className="justify-content-center">
                        <p className="item-title mb-5">{item.name}</p>
                    </Row>
                    <div className="d-flex justify-content-center">
                        <ItemDetails item={item} />
                    </div>
                </div>}
        </Container>
    )
}

export default ItemPage;