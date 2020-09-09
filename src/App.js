import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { routes } from "./constants/routes";


class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        {routes.map(
                            ({
                                path,
                                component: C,
                                name,
                                customProps,
                            }) => (
                                <Route
                                    path={path}
                                    exact={true}
                                    key={name}
                                    render={(props) => {
                                        return (
                                            <C
                                                {...props}
                                                {...customProps}
                                            />
                                        );
                                    }}
                                ></Route>
                            )
                        )}
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
