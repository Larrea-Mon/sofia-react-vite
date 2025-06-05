import { combineReducers } from "redux";
import auth from "./auth.jsx";
import navigation from "./navigation.jsx";
// import register from "./register.jsx";
import calendar from "./calendar.jsx";
import users from "./usersReducers.jsx";
//import { connectRouter } from "connected-react-router";

const rootReducer = () =>
  combineReducers({
    auth,
    navigation,
    calendar,
    users,
  });

export default rootReducer;
