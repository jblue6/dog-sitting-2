export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        auth: {
          isAuthenticated: true,
          user: payload,
          errorMsg: ""
        }
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        auth: {
          isAuthenticated: true,
          user: payload,
          errorMsg: ""
        }
      }
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          user: {},
          errorMsg: payload
        }
      }
    case 'SET_CONTACT':
      return {
        ...state,
        contact: payload
      }
    case 'SET_INFORMATION':
      return {
        ...state,
        information: payload
      }
    case 'SET_PRICES':
      return {
        ...state,
        prices: payload
      }
    case "SET_BOOKINGS":
      return {
        ...state,
        bookings: payload
      }
    case "SET_ALL_BOOKINGS":
      return {
        ...state,
        allBookings: payload
      }
    case "SET_ACCOUNT":
      return {
        ...state,
        account: payload
      }
    default:
      return state;
  }
}