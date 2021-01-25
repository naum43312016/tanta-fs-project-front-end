import React, { useState } from 'react';
import { Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import BASE_URL from '../../Tools/URLs';
import axios from 'axios';
import { confirmPurchase, itemPurchased, cantBuy } from '../../Tools/WebsiteResponses';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';


const ItemDetails = (props) => {
    const [user, setUser] = useState('');
    const [seller, setSeller] = useState(null);
    const history = useHistory();
    const sessionID = localStorage.getItem('sessionID')

    // const renderSeller = async () => {
        
    // }

    useEffect(() => {
        axios.get(`${BASE_URL}/user/${localStorage.getItem('sessionID')}`)
        .then(res => setUser(res.data))
        .catch(err => console.log("Couldn't find user"));
        axios.get(`${BASE_URL}/user/${props.item.sellerId}`)
        .then(res => setSeller(res.data))
        .catch(err => console.log("Couldn't find seller"))
    }, [])

    const purchaseItem = async () => {
        console.log(seller)
        if (user.coins < props.item.price) {
            return cantBuy();
        }
        if (await confirmPurchase()) {
            await axios.put(`${BASE_URL}/purchase/${props.item._id}`, '', {headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
                .then(res => console.log(res), itemPurchased(), history.push('/'))
                .catch(err => console.log(err))
            await axios.get(`${BASE_URL}/user/${sessionID}`)
        }
    }

    return (
        <div className="item-info mb-5">
            <img src={props.item.imageUrl} style={{ maxWidth: "80%", maxHeight: "300px" }} alt="" className="rounded mb-4"></img>
            <div className="mt-5 item-text">
                <div>
                    <Row style={{ width: "80%" }} className="mb-4 align-items-center">
                        <h3 className="col-6">{props.item.condition}</h3>
                        <h5>{props.item.price} <FontAwesomeIcon style={{ color: "orange", fontSize: "20px" }} icon={faCoins} className="ml-2" /></h5>
                    </Row>
                    <p style={{fontSize:"19px"}} className="mb-4">Seller : {seller && seller.firstName} {seller && seller.lastName}</p>
                    <p style={{fontSize:"19px"}} className="mb-4">Address : {seller && seller.address}</p>
                    <h5 className="mb-3">{props.item.category}</h5>
                    <p>{props.item.description}</p>
                    <a href={props.item.imageUrl} target="_blank" rel="noreferrer"><i></i>Full Image</a>
                </div>
                <Button color="primary" className="mt-3 ml-n1 d-block border" onClick={purchaseItem}>Purchase</Button>
            </div>
        </div>
    )
}

export default ItemDetails;