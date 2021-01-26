import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
function App() {
  return (
    <Router history={Router.browserHistory}>
      <Switch>
        <Route path="/" component={Login} exact />
      </Switch>
    </Router>
  );
}

export default App;
