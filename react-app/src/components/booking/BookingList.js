import React, { useContext } from 'react';
import { Table } from "react-bootstrap";
import Moment from "react-moment";

import { GlobalContext } from "../../context/GlobalState";

const BookingList = () => {
  const { bookings } = useContext(GlobalContext);


  const content = bookings.length ? <Table striped hover variant="dark" className="mt-2">
    <thead>
      <tr>
        <th>Service</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Number of Dogs</th>
        <th>Notes</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {bookings.map(booking => (
        <tr key={booking._id}>
          <td>{booking.service}</td>
          <td><Moment format="DD-MM-YYYY">{booking.startDate}</Moment></td>
          <td><Moment format="DD-MM-YYYY">{booking.endDate}</Moment></td>
          <td>{booking.numberOfDogs.toString()}</td>
          <td>{booking.notes}</td>
          <td className={booking.status === "Approved" ? "text-success" : "text-danger"}>{booking.status}</td>
        </tr>
      ))}
    </tbody>
  </Table> : <p>No current bookings</p>

  return (<>
    <h3>My Bookings</h3>
    {content}
  </>);
}

export default BookingList;
