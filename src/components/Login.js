import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { observer, inject } from 'mobx-react'

const Login = inject("UserStore")(observer(
    class Login extends Component {
        state = {
            complete: false
        }

        componentDidMount() {
            this.props.UserStore.setName(this.props.n)
            this.props.UserStore.setEmail(this.props.e);
            this.setState({ complete: true });
        }
        render() {
            if (this.state.complete === true) {
                return <Redirect to='/' />
            }
            return (
                ""
            );
        }
    }
))
export default Login;
