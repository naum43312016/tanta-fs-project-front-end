import React, { useEffect, useState } from 'react';
import Filter from '../Filter/Filter';
import ItemCard from '../ItemCards/ItemCards';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import BASE_URL from '../../../Tools/URLs';
import { Container, Row, Button  } from 'reactstrap';

const Home = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('');
    const [cards, setCards] = useState([]);
    const [updateCards, setUpdateCards] = useState(false)
    const [page, setPage] = useState(1)
    const [pageCount,setPageCount] = useState(1);
    const getCards = async () => {
        await axios.get(BASE_URL + '/search/item')
        .then(res => {
            const availableCards = []
            res.data.items.forEach(item => {
                if(item.status == 'available') {
                    availableCards.push(item)
                }
            })
            setCards(availableCards)
            setPageCount(res.data.pagesCount)
            setPage(1)
        })
        .catch(err => 'There was an issue fetching all the items');
    }

    const showMore = async () => {
        console.log("SHOW MORE");
        let currPage = page;
        await axios.get(BASE_URL + `/search/item?category=${category}&price=${price}&name=${search}&page=${currPage+1}`)
            .then(res => {
                const availableCards = cards
                res.data.items.forEach(item => {
                    if(item.status == 'available') {
                        availableCards.push(item)
                    }
                })
                setCards(availableCards)
                setPage(currPage+1)
                setPageCount(res.data.pagesCount)
            })
            .catch(err => console.log('There was an issue fetching the items of the requested category'));
    }

    useEffect(() => {
            getCards()
    }, [updateCards, !updateCards])

    useEffect(async() => {
        await axios.get(BASE_URL + `/search/item?category=${category}&price=${price}&name=${search}`)
            .then(res => {
                const availableCards = []
                res.data.items.forEach(item => {
                    if(item.status == 'available') {
                        availableCards.push(item)
                    }
                })
                setCards(availableCards)
                setPageCount(res.data.pagesCount)
                setPage(1)
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
            <ItemCard cards={cards} setUpdateCards={setUpdateCards} updateCards={updateCards}/>
            {page<pageCount && 
            <Container>
            <Row className="justify-content-center">
                <Button onClick={showMore} color="primary" className="mb-5 mt-n2">Show More</Button>
            </Row>
            </Container>
            }
        </div>
    )
}

export default Home;