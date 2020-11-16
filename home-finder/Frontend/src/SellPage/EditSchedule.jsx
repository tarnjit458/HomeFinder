import React from 'react';
import PropertyCard from '../components/PropertyCard.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewApp from './ReviewApp.jsx';
import { Card, CardText, CardBody, Button,
    CardTitle, CardSubtitle, Row, Col,
    Modal, ModalBody, ModalHeader, ModalFooter, Table, Badge, Container
}from 'reactstrap';

class EditSchedule extends React.Component {
    render() {
        return(
            <div>
                Individual Schedule
            </div>
        );
    }
}

export default EditSchedule;