import { connect } from "react-redux";
import { Switch, withRouter, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/SignUp/Signup";

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Signup}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route
          path="/profile"
          exact
          render={() =>
            props.isUserLoggedIn ? <Profile /> : <Redirect to="/login" />
          }
        ></Route>
      </Switch>
    </div>
  );
}
let mapStateToProps = (state) => ({
  isUserLoggedIn: state.login.isUserLoggedIn,
});
export default withRouter(connect(mapStateToProps)(App));
