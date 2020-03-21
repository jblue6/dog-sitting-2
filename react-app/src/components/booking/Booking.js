import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

import BookingList from "./BookingList";
import BookingForm from "./BookingForm";

class Booking extends Component {
  static contextType = GlobalContext;

  state = { viewCurrentBookings: true }

  logout = e => {
    e.preventDefault();
    this.context.logout();
  };

  toggleView = viewCurrentBookings => {
    this.setState({ viewCurrentBookings })
  }

  render() {
    const { viewCurrentBookings } = this.state;
    const bookingContent = viewCurrentBookings ? (
      <>
        <Button onClick={() => this.toggleView(false)}>
          Make a New Booking
        </Button>
        <BookingList />
      </>) : (
        <>
          <Button onClick={() => this.toggleView(true)}>
            View Current Bookings
        </Button>
          <BookingForm />
        </>
      )

    const { isAuthenticated, errorMsg } = this.context.auth;
    const content = isAuthenticated ? (
      <div>
        <div>{errorMsg}</div>
        {bookingContent}
      </div>
    ) : (
        //<Redirect to="/" />
        <div>Logged Out</div>
      );

    return <Container className="mt-2">{content}</Container>;
  }
}

export default Booking;
