import React from 'react'
import { Modal ,Button } from 'react-bootstrap'

/**
* @author
* @function NewModel
**/

const NewModel = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.ModelTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.children}
            </Modal.Body>
            <Modal.Footer>
                {props.buttons ? (
                    props.buttons.map((btn , index)=>(// () or {} its matter ; () is for react .jsx and {} is used for javascript 
                        <Button key={index} variant={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </Button>
                    ))
                    ) : (
                    <Button variant="primary" onClick={props.handleClose}>
                        Save Changes
                    </Button>
                    )
                }
                
            </Modal.Footer>
        </Modal>
    )

}

export default NewModel