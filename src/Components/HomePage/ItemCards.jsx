import React, { useEffect, useState } from 'react';
import { Container, Row, Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Button, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pic from "./971c17c93f74bc7280e285153b2e1ace-700.jpg";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/fontawesome-free-regular";

const ItemCard = (props) => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("sessionID"));
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const userToken = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }

    useEffect(() => {
        if (loggedIn != null) {
            axios.get(`${BASE_URL}/user/favorites`, userToken)
                .then(res => setFavoriteItems(res.data))
                .catch(err => "Couldn't get user favorites")
        }
    }, [])

    const addItemToFavorites = (item) => {
        axios.post(BASE_URL + `/item/${item._id}/favorite`, '', userToken)
            .then(res => console.log(res))
            .catch(err => console.log("Couldn't save the item"));
    }

    const removeItemFromFavorites = () => {

    }

    return (
        <div>
            <div style={{ width: "80%", marginLeft: "10%" }} className="card-container mt-5 mb-5">
                {props.cards.map((item) => {
                    return (<div key={item._id} id={item._id} style={{ backgroundColor: "#F7F7F7" }}>
                        <Link to={{ pathname: `/item/${item._id}`, state: item._id }}  >
                            <div style={{ width: "100%", height: "200px", backgroundImage: `url(${item.imageUrl})` }} className="card-img" top width="100%" alt={item.name} />
                        </Link>
                        <CardBody className="overflow-dots">
                            <Row>
                                <CardTitle tag="h5" className="col-10">{item.name}</CardTitle>
                                <p>{item.price} <FontAwesomeIcon style={{ color: "orange", fontSize: "20px" }} icon={faCoins} /></p>
                            </Row>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{item.condition}</CardSubtitle>
                            <CardText style={{ wordBreak: "break-word" }}>{item.description}</CardText>
                            <footer>
                                <div className="align-items-center justify-content-end d-flex">
                                    {!favoriteItems.includes(`${item._id}`) ? <p style={{ fontSize: "18px", margin: "0" }} className="mr-2">Save</p> : <p style={{ fontSize: "18px", margin: "0" }} className="mr-2">Unsave</p>}
                                    {!favoriteItems.includes(`${item._id}`) ? <FontAwesomeIcon color="red" style={{ cursor: "pointer", fontSize: "25px" }} onClick={() => addItemToFavorites(item)} cldivassName="mr-2 awesome-icon" icon={regularHeart}></FontAwesomeIcon> : <FontAwesomeIcon style={{ cursor: "pointer", fontSize: "25px" }} color="red" onClick={() => removeItemFromFavorites(item)} className=" awesome-icon" icon={solidHeart}></FontAwesomeIcon>}
                                </div>
                            </footer>
                        </CardBody>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ItemCard;