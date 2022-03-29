import React , {useState , useEffect} from 'react';
import { Container , Form , Button , Row , Col } from 'react-bootstrap';
import Layout from '../../components/Layouts';
import Input from '../../components/UI/Input';
import {Login } from '../../actions'
import {useDispatch , useSelector} from 'react-redux'
import { Redirect } from 'react-router';



export default function Signin() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

   
    
    function userLogin(e){
        e.preventDefault();
        const user ={
            email  , password
        }
        // //console.log.log(user);
        dispatch(Login(user));

    }
 
    // //console.log.log(auth);
    
    if(auth.authenticate){
        return <Redirect to={"/"} />
    }

    return (
        <Layout>
            <Container>
                <Row>
                    <Col style={{marginTop:'3rem'}} md={{span:6 , offset:3}}>
                        <Form onSubmit={userLogin}>
                        <Input
                            lable="Email address"
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => {setemail(e.target.value) }}
                            errorMassege="We'll never share your email with anyone else."
                            />

                            <Input
                            lable="Password"
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={(e) => {setpassword(e.target.value)}}
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
