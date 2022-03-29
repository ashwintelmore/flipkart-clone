import React from 'react';
import { Container , Form , Button , Row , Col } from 'react-bootstrap';

export default function Input(props) {
    return (
        <div>
            <Form.Group >
            {props.lable ? <Form.Label>{props.lable} </Form.Label> : null}
                <Form.Control
                    label={props.label}
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                />
                 <Form.Text className="text-muted">
                   {props.errorMassege}
                </Form.Text>
            </Form.Group>

        </div>
    )
}
