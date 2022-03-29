import React from 'react';
import { Button, Navbar, Nav, NavDropdown, Container, Jumbotron } from "react-bootstrap";
import { Link, NavLink , Redirect} from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux'
import { userLogout } from '../../actions'

function Header() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const singOut = ()=>{
        dispatch(userLogout())
    }

    const renderLoginLinks = ()=>{
        return(
            <Nav className="navbar-nav">
                <li className="nav-item">
                    <span className="nav-link" onClick={singOut}> Signout</span>
                </li>
            </Nav>
        )
    }
    const renderNonLoginLinks = ()=>{
        return(
            <Nav className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/Signin" className="nav-link"> Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/Signup" className="nav-link"> Signup</NavLink>
                </li>
            </Nav>
        )
    }

    return (
        <div>
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{zIndex:"1"}}>
                <Container fluid>
                    {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                    <Link to="/" className="navbar-brand"> Admin Dashboard </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="m-auto">

                        </Nav>
                        { auth.authenticate? renderLoginLinks() : renderNonLoginLinks() }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}


export default  Header;