import React from 'react'
import Layout from '../../components/Layouts'
import './styles.css'

import {Row , Col, Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <Layout sidebar>
                container
                {/* <Container fluid>
                    <Row >
                        <Col md={2} className="sidebar">
                            <ul>
                                <li><NavLink to={"/home"}>Home</NavLink></li> 
                                <li><NavLink to={"/products"}>Products</NavLink></li> 
                                <li> <NavLink to={"/order"}>Order</NavLink></li>
                            </ul>
                        </Col>
                        <Col md={10} style={{ marginLeft:"auto"}}>Container</Col>
                    </Row>
                </Container> */}
                {/* <Jumbotron style={{margin : "4rem" , background:"#fff"}} className="text-center" >
                    <Container  >
                        <h1>Welcome Admin</h1>
                        <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeho</p>
                    </Container>
                </Jumbotron> */}
            </Layout>
        </div>
    )
}
