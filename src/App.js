import React, { Suspense, lazy } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";

const Home = lazy(() => import("./pages/Home"));
const History = lazy(() => import("./pages/History"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <div>
      <Header />
      <main>
        <Suspense fallback={<div>loding....</div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/history" exact component={History} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
