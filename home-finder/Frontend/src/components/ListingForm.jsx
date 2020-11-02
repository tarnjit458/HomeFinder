import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class ListingForm extends React.Component {
     constructor(props) {
         super(props);
     }

     handleListSubmit = (e) => {
        e.preventDefault();
        console.log("submitting");
        console.log(e.target);
    }

    render() {
        return(
            <Form onSubmit={this.handleListSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Selling or renting?</Label>
                        <Input type="select" name="select" id="exampleSelect">
                            <option value="rental">Rental</option>
                            <option value="selling">Selling</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Text Area</Label>
                        <Input type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <Button color="primary" type="submit" action="submit">Submit</Button>
                    <Link classNamme="btn btn-primary"  to="/rent-sell">Go Back</Link>
            </Form>
        );
    }
} 