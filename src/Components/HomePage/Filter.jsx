import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Input, Row, Button, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
const Filter = () => {
    const [categories, setCategories] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        axios.get('http://localhost:3001/category/all')
        .then(res => setCategories(res.data))
        .catch(err => console.error(err))
    }, [])

    return (
        <Row style={{height:"100px", paddingTop:"40px", marginBottom:"115px"}} className="align-items-center ml-4">
            <div className="offset-sm-1 col-sm-2 mr-sm-5 col-3">
                <label>Find by category :</label>
                <Input type="select">
                    <option value="" selected>Choose here</option>
                </Input>
            </div>
            <button className="filter-btn col-2">Furniture</button>
            <button className="filter-btn col-2">Kitchen</button>
            <button className="filter-btn col-2">Garden</button>
            <button className="filter-btn col-2">Electronics</button>
        </Row>
    )
}

export default Filter;