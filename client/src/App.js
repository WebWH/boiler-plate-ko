import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

import Auth from './hoc/auth'; // 인증/인가를 위한 hoc

/**
 * Router
 */
function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)} />
                    {/* 인증/인가를 위해 hoc로 감싸줌, Ahtu:./hoc/auth 
                        option
                        null : 아무나 출입
                        true : 로그인한 유저만 출입
                        false : 로그인한 유저는 출입불가
                    */}
                    <Route exact path="/login" component={Auth(LoginPage, false)} />
                    <Route exact path="/register" component={Auth(RegisterPage, false)} />
                </Switch>
            </div>
        </Router>
    )
}

export default App

