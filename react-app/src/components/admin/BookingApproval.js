import React, { Component } from 'react';
import { Form, Table, Button } from "react-bootstrap";
import Moment from "react-moment";

import { GlobalContext } from "../../context/GlobalState";

export default class BookingApproval extends Component {
  static contextType = GlobalContext;

  state = {
    bookings: null,
    loading: true
  }

  approve = e => {
    this.context.approveRejectBooking(e.target.value, "Approved");
  }

  reject = e => {
    this.context.approveRejectBooking(e.target.value, "Rejected");
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  componentDidUpdate() {
    if (this.state.bookings) return;
    const { allBookings } = this.context;
    if (!allBookings.length) return;
    this.setState({
      bookings: allBookings, loading: false
    });
  }

  render() {
    const { bookings, loading } = this.state;

    return (
      <div>
        {
          loading ? <div>Loading</div> : <Form onSubmit={this.handleSubmit}>
            <h4 className="mt-5">Booking Approval</h4>

            <Table striped hover variant="dark">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Service</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Number of Dogs</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id}>
                    <td>{booking.user.email}</td>
                    <td>{booking.service}</td>
                    <td><Moment format="DD-MM-YYYY">{booking.startDate}</Moment></td>
                    <td><Moment format="DD-MM-YYYY">{booking.endDate}</Moment></td>
                    <td>{booking.numberOfDogs.toString()}</td>
                    <td>{booking.notes}</td>
                    <td className={booking.status === "Approved" ? "text-success" : "text-danger"}>{booking.status}</td>
                    <td>
                      {booking.status === "Pending" ? <><Button variant="secondary" onClick={this.approve} className="mr-2" value={booking._id}>
                        Approve
                      </Button>
                        <Button variant="secondary" onClick={this.reject} className="mr-1" value={booking._id}>
                          Reject
                      </Button></> : ""}

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </Form>
        }
      </div>
    )
  }
}
