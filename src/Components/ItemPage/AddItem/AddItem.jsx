import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { Container, Form, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import '../../../Styles/AddItem.css'
import { invalidFields } from '../../../Tools/WebsiteResponses';
import { itemUploaded } from '../../../Tools/WebsiteResponses';
import { Redirect } from 'react-router'
import BASE_URL from '../../../Tools/URLs';

const AddItem = () => {
    const [itemInfos, setItemInfos] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [categories, setCategories] = useState({ categories: null, selected: null })
    const [pic, setPic] = useState({ selectedFile: null })
    const [previewPic, setPreviewPic] = useState("")
    const [redirect, setRedirect] = useState(false) // in case of success

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const ref = useRef(null)

    const handleChange = (e) => {
        setItemInfos({
            ...itemInfos,
            [e.target.name]: e.target.value
        })
    }
    const imageUploadStyle = {
        color: "#4a81ff",
        fontSize: "35px",
    }

    const handleSelect = (e) => {
        setCategories({ ...categories, selected: e.target.value })
        setItemInfos({ ...itemInfos, category: e.target.value })
    }

    const postItem = (e) => {
        e.preventDefault()
        const data = new FormData()
        for (let key in itemInfos) {
            data.append(key, itemInfos[key])
        }
        if (pic.selectedFile) {
            data.append('image', pic.selectedFile, `${Date.now()}-${pic.selectedFile.name}`)
        }
        axios.post(`${BASE_URL}/item`, data, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            .then(res => itemUploaded())
            .then(res => setRedirect(true))
            .catch(err => {
                const error = err.response.data
                const errorMessages = error.message || error.category || error.name || error.condition || error.description || error.price
                invalidFields(errorMessages)
            })
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/category/all`)
            .then(res => setCategories({ ...categories, categories: res.data }))
            .catch(err => console.error(err))
    }, [])

    if (redirect) {
        return (
            <Redirect to={BASE_URL} />
        )
    }
    return (
        <Container>
            <Form action="" className="add-item-form" onSubmit={e => postItem(e)} encType="multipart/form-data">
                <input type="file" ref={ref} id="hidden" onChange={(e) => {
                    const file = e.target.files[0]
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        setPreviewPic(e.target.result)
                    }
                    reader.readAsDataURL(file)
                    setPic({ selectedFile: e.target.files[0] })
                }} />
                <div className="image-upload" onClick={() => ref.current.click()}><FontAwesomeIcon style={imageUploadStyle} icon={faCamera} /></div>
                {previewPic && <div className="image-preview"><img src={previewPic} alt="loaded pic" /></div>}
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret color="light">
                        {(categories.categories && categories.selected) || 'Category'} {/* Setting the select name based on selected category  */}
                    </DropdownToggle>
                    <DropdownMenu >
                        {categories.categories && categories.categories.map((category, index) => (
                            <DropdownItem key={index} onClick={handleSelect} value={category.name}> {category.name} </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Input className="add-item-input" name="name" placeholder="Name of product" onChange={e => handleChange(e)} />
                <Input className="add-item-input" type="select" name="condition" onChange={e => handleChange(e)}>
                    <option value="condition" disabled selected>Condition</option>
                    <option value="New">New</option>
                    <option value="Like New">Like new</option>
                    <option value="Good">Good</option>
                    <option value="Used">Used</option>
                </Input>
                <Input className="add-item-input" type="number" name="price" placeholder="Price" onChange={e => handleChange(e)} />
                <Input className="add-item-input" name="description" placeholder="Description" onChange={e => handleChange(e)} />
                <Button color="light" type="submit"> Add an item </Button>
            </Form>
        </Container>
    )
}

export default AddItem