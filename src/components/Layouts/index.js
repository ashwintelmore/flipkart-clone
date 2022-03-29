import React from 'react';
// import {Jumbotron} from 'react-bootstrap';
import Header from '../header/index';
// import Bootstrap from "bootstrap"
import {  Row , Col ,Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
function Layout(props) {
    return ( 
        <>
            <Header />
            {
                props.sidebar ?
                <Container fluid>
                    <Row >
                        <Col md={2} className="sidebar">
                            <ul>
                                <li><NavLink exact to={"/"}>Home</NavLink></li> 
                                <li><NavLink to={"/products"}>Products</NavLink></li> 
                                <li><NavLink to={"/category"}>Category</NavLink></li> 
                                <li> <NavLink to={"/order"}>Order</NavLink></li>
                            </ul>
                        </Col>
                        <Col md={10} style={{ marginLeft:"auto" , marginTop:"65px"}}>
                        {props.children}
                        </Col>
                    </Row>
                </Container> 
                :
                props.children

            }
    
        </>
            
    )
}

export default Layout;