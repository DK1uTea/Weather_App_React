import React from 'react'
import Nav from 'react-bootstrap/Nav';
import './Navbar.css';
export default function Navbar() {

    return (    
        <Nav variant="pills" activeKey="1">
            <Nav.Item>
                <Nav.Link eventKey="1" href="/">
                Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="1" href="/weather">
                Weather
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
