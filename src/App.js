import { Switch, withRouter, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/SignUp/Signup";

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Signup}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/profile" exact component={Profile}></Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
