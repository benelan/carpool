import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { observer, inject } from 'mobx-react'
import axios from "axios";

const Login = inject("UserStore")(observer(
    class Login extends Component {
        state = {
            complete: false
        }

        componentDidMount() {
            axios.defaults.withCredentials = true;
            this.props.UserStore.setName(this.props.n)
            this.props.UserStore.setEmail(this.props.e);
            this.getUserByEmail();
        }

        getUserByEmail = () => {
            // get user info by email
            const url = process.env.REACT_APP_API_URL +"/api/getOneUser";
            console.log(url)
            axios.get(url, {
                params: {
                    email: this.props.UserStore.userEmail
                }
            })
                .then(res => {
                    const user = res.data.data;
                    // fill in form and state with settings saved in db
                    if (!!user) {
                        this.setState({ new_user: false });
                        this.props.UserStore.setArrive(user.arrive_work)
                        this.props.UserStore.setLeave(user.leave_work)
                        this.props.UserStore.setDriver(user.driver)
                        this.props.UserStore.setOffice(user.office_id)
                        this.props.UserStore.setSuccess(user.successful)
                        this.props.UserStore.setNew(false);
                    }

                    this.setState({ complete: true });
                })
                .catch(err => {
                    // handle any errors
                    console.error(err);
                });
        }

        render() {
            if (this.state.complete === true) {
                return <Redirect to='/' />
            }
            return ("");
        }
    }
))
export default Login;
