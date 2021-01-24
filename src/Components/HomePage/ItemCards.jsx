import React, { useEffect, useState } from 'react';
import { Row, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/fontawesome-free-regular";

const ItemCard = (props) => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("sessionID"));
    const [toggleFav, setToggle] = useState(true) // to rerender the page when add/remove favourite

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const userToken = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
    
    const addItemToFavorites = async(item) => {
        await axios.post(BASE_URL + `/item/${item._id}/favorite`, '', userToken)
            .then(console.log("Saved the item as favorite"))
            .catch(err => console.log("Couldn't save the item as favorite"));
        await axios.get(`${BASE_URL}/user/favorites`, userToken)
        .then(res => res.data)
        .then(res => setFavoriteItems(res))
        setToggle(!toggleFav)
    }

    const removeItemFromFavorites = async (item) => {
        await axios.delete(`${BASE_URL}/item/${item._id}/favorite`, userToken)
            .then(console.log("Unsaved the item"))
            .catch(err => console.log("Couldn't unsave the item"));
        await axios.get(`${BASE_URL}/user/favorites`, userToken)
            .then(res => res.data)
            .then(res => setFavoriteItems(res))
        setToggle(!toggleFav)

    }

    useEffect(async () => {
        if (loggedIn != null) {
            await axios.get(`${BASE_URL}/user/favorites`, userToken)
                .then(res => setFavoriteItems(res.data))
                .catch(err => console.log("Couldn't get user favorites"))
        }
    }, [toggleFav, !toggleFav])

    return (
        <div>
            <div style={{ width: "80%", marginLeft: "10%" }} className="card-container mt-5 mb-5">
                {props.cards.map((item) => {
                    return (<div key={item._id} id={item._id} style={{ backgroundColor: "#F7F7F7" }}>
                        <Link to={{ pathname: `/item/${item._id}`, state: item._id }}  >
                            <div style={{ width: "100%", height: "200px", backgroundImage: `url(${item.imageUrl})` }} className="card-img" top="true" width="100%" alt={item.name} />
                        </Link>
                        <CardBody className="overflow-dots">
                            <Row>
                                <CardTitle tag="h5" className="col-10">{item.name}</CardTitle>
                                <p>{item.price} <FontAwesomeIcon style={{ color: "orange", fontSize: "20px" }} icon={faCoins} /></p>
                            </Row>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{item.condition}</CardSubtitle>
                            <CardText style={{ wordBreak: "break-word" }}>{item.description}</CardText>
                            {loggedIn &&
                                <footer>
                                    <div className="align-items-center justify-content-end d-flex">
                                        {!favoriteItems.includes(`${item._id}`) 
                                        ?<>
                                         <p style={{ fontSize: "18px", margin: "0" }} className="mr-2">Save</p> 
                                          <FontAwesomeIcon color="red" style={{ cursor: "pointer", fontSize: "25px" }} 
                                            onClick={() => addItemToFavorites(item)} className="mr-2 awesome-icon" icon={regularHeart}>
                                          </FontAwesomeIcon> 
                                          </>
                                        :<>
                                         <p style={{ fontSize: "18px", margin: "0" }} className="mr-2">Unsave</p>
                                          <FontAwesomeIcon style={{ cursor: "pointer", fontSize: "25px" }} color="red" 
                                            onClick={() => removeItemFromFavorites(item)} className=" awesome-icon" icon={solidHeart}>
                                          </FontAwesomeIcon>
                                          </>}
                                    </div>
                                </footer>
                            }
                        </CardBody>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ItemCard;