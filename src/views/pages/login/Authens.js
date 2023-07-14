// import React, { Component } from 'react';
// import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// import Variable from "../src/helpers/VariableController";
// import './scss/style.scss';
// import './App.css';



// // Containers
// const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// // Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
// const token = localStorage.getItem('Token')

// class Authen 

// const IsAuthenticated = () => {
//     var status
//     if (token != null) {
//         status = true
//     } else {
//         status = false
//     }


//     return status;
// }



// const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
//     <Route {...rest} render={(props) => (
//         !IsAuthenticated()
//             ? <Component {...props} />
//             : <Redirect to='/' />
//     )} />
// };


// const AuthenticatedRoute = ({ component: Component, ...rest }) => {
//     <Route {...rest} render={(props) => (
//         IsAuthenticated()
//             ? <Component {...props} />
//             : <Redirect to='/login' />
//     )} />
// };





// export { IsAuthenticated, UnauthenticatedRoute, AuthenticatedRoute };
