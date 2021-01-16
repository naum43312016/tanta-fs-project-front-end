import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Input, Row, Button, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

const Filter = () => {
    const [category, setCategory] = useState('')
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const buttonCategory = (e) => {
        setCategory(e.target.innerText);
    }

    const inputCategory = (e) => {
        setCategory(e.target.value);
    }

    useEffect(() => { //getting all categories on first app render
        axios.get(BASE_URL + '/category/all')
        .then(res => console.log(res))
        .catch(err => console.log('There was an issue getting the items'))
    }, [])

    useEffect(() => { //fetching categories
        axios.get(BASE_URL + `/category?name=${category}`)
        .then(res => console.log(res))
        .catch(err => console.log('Error fetching the requested category'));
    }, [category])
    
    return (
        <Row style={{ height: "100px", paddingTop: "40px", marginBottom: "105px" }} className="align-items-center justify-content-center">
            <div className="category-input offset-1 col-md-2 col-6 col-3">
                <label>Find category</label>
                <Input onChange={inputCategory} value={category} type="select">
                    <option value="" selected>Choose Here</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Garden">Garden</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="PCs and Laptops">PCs and Laptops</option>
                    <option value="Sports">Sports</option>
                </Input>
            </div>
            <button className="filter-btn col-2" onClick={buttonCategory}>Furniture</button>
            <button className="filter-btn col-2" onClick={buttonCategory}>Kitchen</button>
            <button className="filter-btn col-2" onClick={buttonCategory}>Garden</button>
            <button className="filter-btn col-2" onClick={buttonCategory}>Electronics</button>
        </Row>
    )
}

export default Filter;