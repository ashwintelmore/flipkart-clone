import React ,{useState} from 'react';
import Layout from '../../components/Layouts';
import Input from '../../components/UI/Input/index'

import { Container , Form , Button , Row , Col } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { useSelector ,useDispatch } from 'react-redux'
import { userSignup } from '../../actions'


export default function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState('')
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    const userData = (e)=>{
        e.preventDefault();

        const data = {
            firstName, lastName , email, password
        }

        // //console.log.log(data);
        dispatch(userSignup(data));
    }
    
    
    if(user.registerPosition){
        //console.log.log(user.registerPosition);
            alert(`${user.massege}`);
            return <Redirect to={"/"} />
    }

    if(auth.authenticate){
        return <Redirect to={"/"} />
    }
    return (
       
            <Layout>
                <Container>
                    <Row>
                        <Col style={{marginTop:'3rem'}} md={{span:6 , offset:3}}>
                        <Form onSubmit={userData}>
                            <Row>
                                <Col  md={{span:6}}>
                                    <Input
                                        lable="First Name"
                                        type="text"
                                        value={firstName}
                                        placeholder="First Name"
                                        onChange={(e) => {setFirstName(e.target.value)}}
                                    />
                                </Col>
                                <Col  md={{span:6}}>
                                    <Input
                                        lable="Last Name"
                                        type="text"
                                        value={lastName}
                                        placeholder="First Name"
                                        onChange={(e) => {setLastName(e.target.value)}}
                                    />
                                </Col>
                            </Row>
                          
                                <Input
                                    lable="Email address"
                                    type="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => {setEmail(e.target.value)}}
                                    errorMassege="We'll never share your email with anyone else."
                                 />
                                <Input
                                    lable="Password"
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) => {setPassword(e.target.value)}}
                                 />
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
        </Layout>
    )
}

