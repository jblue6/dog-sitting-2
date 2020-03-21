import React, { useState, useContext } from 'react';
import { Form, Button } from "react-bootstrap";
import { GlobalContext } from '../../context/GlobalState';

const BookingForm = () => {
  const { prices, requestBooking } = useContext(GlobalContext);

  const [booking, setBooking] = useState({
    service: "",
    startDate: "",
    endDate: "",
    numberOfDogs: 1,
    notes: ""
  });

  const setService = ({ target }) => {
    setBooking({
      ...booking,
      service: target.value
    });
  }

  const setStartDate = ({ target }) => {
    setBooking({
      ...booking,
      startDate: target.value
    });
  }

  const setEndDate = ({ target }) => {
    setBooking({
      ...booking,
      endDate: target.value
    });
  }

  const setNumberOfDogs = ({ target }) => {
    let numberOfDogs = parseInt(target.value);
    setBooking({
      ...booking,
      numberOfDogs
    });
  }

  const setNotes = ({ target }) => {
    setBooking({
      ...booking,
      notes: target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    requestBooking(booking);
  }

  const { service, startDate, endDate, numberOfDogs, notes } = booking;

  return (
    <>
      <h4>Booking Form</h4>
      <Form className="mb-5 mt-2" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Service Requested</Form.Label>
          <Form.Control
            as="select"
            value={service}
            onChange={setService}
          >
            <option></option>
            {
              prices.map(price => (
                <option key={price._id}>{price.description}</option>
              ))
            }
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={setStartDate}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={setEndDate}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            as="select"
            value={numberOfDogs}
            onChange={setNumberOfDogs}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type="textarea"
            value={notes}
            onChange={setNotes}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="float-right ml-2">
          Request
          </Button>
      </Form>
    </>
  );
}

export default BookingForm;
