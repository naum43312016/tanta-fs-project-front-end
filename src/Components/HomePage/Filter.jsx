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
        <div className="filter-container">
            <div className="select-div">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle color="light" caret>
        Category
        </DropdownToggle>
      <DropdownMenu>
          {categories && categories.map(category => {
              return (
                  <DropdownItem> {category.name} </DropdownItem>
              )
          })}
      </DropdownMenu>
    </Dropdown>
            </div>
            <div>
            {categories && categories.map(category=>{
                return (
                    <Button color="light">{category.name}</Button>
                )
            })}
            </div>
        </div>       
    )
}

export default Filter;