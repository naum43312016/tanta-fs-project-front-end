import { useState } from 'react'
import {Container, Form, Input, Button} from 'reactstrap'
import '../../styles/ProfileSettings.css'
import { submitProfileChanges } from '../../Tools/fetch';

const ProfileSettings = () => {
    const [profileInfos, setProfileInfos] = useState(null)

    const handleChange = (e) => {
        setProfileInfos({
            ...profileInfos,
            [e.target.name] : e.target.value
        })
    }


    return (
        <Container>
            <Form action="" className="settings-form" onSubmit={e=> e.preventDefault()}>
                <h3>Profile settings</h3>
                <Input className="settings-input" name="firstname" placeholder="First Name" onChange={e => handleChange(e)}/>
                <Input className="settings-input" name="lastname" placeholder="Last Name" onChange={e => handleChange(e)}/>
                <Input className="settings-input" name="phone" placeholder="Phone" onChange={e => handleChange(e)}/>
                <Input className="settings-input" type="email" name="email" placeholder="Email" onChange={e => handleChange(e)}/>
                <Button color="light" > Save </Button>
            </Form>
        </Container>
    )

}

export default ProfileSettings