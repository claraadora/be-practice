import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import NavBar from "./components/NavBar";

export default function App() {
    return (
        <div>
            <NavBar />
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={TodoPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}
