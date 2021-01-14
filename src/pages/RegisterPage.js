import React, { Component } from 'react';
import { signUpUser, signUpUserSuccess, signUpUserFailure } from '../actions/users';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

function SignUpPage ({signUp, member}) {
  
    const history = useHistory();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [telephone, setTelephone] = React.useState("");
    const [address, setAddress] = React.useState("");

    React.useEffect(() => {
        if(member.user && member.user.username == username) {
            const logHistory = {...history};
            const referer = logHistory.location.state && logHistory.location.state.from;
            if(referer) {
                history.push(referer, {from: logHistory.location.pathname});
            } else {
                history.push("/");
            }
        }
    }, [member])

    function register () {
        if(
            username != "" &&
            password != "" &&
            confirmPassword != "" &&
            firstname != "" &&
            lastname != "" &&
            email != "" &&
            address != "" 
        ) {
            if(password != confirmPassword) {
                alert("password and confirmPassword must match!!!");
            } else {
                const logHistory = {...history};
                const referer = logHistory.location.state && logHistory.location.state.from;
                console.log("from register: ", logHistory);
                console.log("referer: ", referer);
                let account = {
                    username: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    telephone: telephone,
                    address: address
                }
                signUp(account);
            }
        } else {
            alert("Please check required field!!!");
        }
    }

    function changeInput(event, input) {
        if( input == "username" ) {
            setUsername(event.target.value);
        } else if( input == "password" ) {
            setPassword(event.target.value);
        } else if( input == "confirmPassword" ) {
            setConfirmPassword(event.target.value);
        } else if( input == "firstname" ) {
            setFirstname(event.target.value);
        } else if( input == "lastname" ) {
            setLastname(event.target.value);
        } else if( input == "email" ) {
            setEmail(event.target.value);
        } else if( input == "telephone" ) {
            setTelephone(event.target.value);
        } else if( input == "address" ) {
            setAddress(event.target.value);
        }
    }
    
    return (
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h3>
                        Registration
                    </h3>
                </div>
                
                <div>

                    <div class="auth-form">

                        <div style={{margin: "30px 5%"}}>
                                <div class="form-group row">
                                    <label for="inputUsername" class="col-md-4">Username (Required)</label>
                                    <input
                                        type="text" class="form-control" class="col-md-6"
                                        id="inputUsername" placeholder="username"
                                        value={username} onChange={(e) => changeInput(e, "username")}
                                    />
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-md-4">Password (Required)</label>
                                    <input
                                        type="password" class="form-control" class="col-md-6"
                                        id="inputPassword" placeholder="Password"
                                        value={password} onChange={(e) => changeInput(e, "password")}
                                    />
                                </div>
                                <div class="form-group row">
                                    <label for="inputConfirmPassword" class="col-md-4">Confirm Password (Required)</label>
                                    <input
                                        type="password" class="form-control" class="col-md-6"
                                        id="inputConfirmPassword" placeholder="Confirm Password"
                                        value={confirmPassword} onChange={(e) => changeInput(e, "confirmPassword")}
                                    />
                                </div>
                                <div class="form-group row">
                                    <label for="inputFirstname" class="col-md-4">Firstname (Required)</label>
                                    <input
                                        type="text" class="form-control" class="col-md-6"
                                        id="inputFirstname" placeholder="firstname"
                                        value={firstname} onChange={(e) => changeInput(e, "firstname")}
                                    />
                                </div>
                                <div class="form-group row">
                                    <label for="inputLastname" class="col-md-4">Lastname (Required)</label>
                                    <input
                                        type="text" class="form-control" class="col-md-6"
                                        id="inputLastname" placeholder="lastname"
                                        value={lastname} onChange={(e) => changeInput(e, "lastname")}
                                    />
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail" class="col-md-4">Email (Required)</label>
                                    <input
                                        type="email" class="form-control" class="col-md-6"
                                        id="inputEmail" placeholder="email"
                                        value={email} onChange={(e) => changeInput(e, "email")}
                                    />
                                </div>
                                <div class="form-group row">
                                    <label for="inputTelephone" class="col-md-4">Telephone (Optional)</label>
                                    <input
                                        type="number" class="form-control" class="col-md-6"
                                        id="inputTelephone" placeholder="telephone"
                                        value={telephone} onChange={(e) => changeInput(e, "telephone")}
                                    />
                                </div>
                                <div class="form-group row">
                                    <label for="inputAddress" class="col-md-4">Address (Required)</label>
                                    <textarea
                                        rows="3" class="form-control" class="col-md-6"
                                        id="inputAddress" placeholder="address"
                                        value={address} onChange={(e) => changeInput(e, "address")}
                                    />
                                </div>
                                
                                <span class="sdw-wrap">
                                    <button onClick={() => register()} class="sdw-hover btn btn-material btn-yellow btn-lg ripple-cont">Register</button>
                                    <span class="sdw"></span>
                                </span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (account) => {
            dispatch(signUpUser(account)).then((response) => {
                console.log('signUpRes: ', response.payload);
                if(response.payload.modUser && (response.payload.modUser.username == account.username)) {
                    !response.error ? dispatch(signUpUserSuccess(response.payload)) : dispatch(signUpUserFailure(response.payload));
                    alert("Sign up Successfull!!!");
                    localStorage.setItem('eCommerceAuth', JSON.stringify(response.payload));
                } else {
                    alert("Cannot use this username or email");
                }
            });
        }
    };
};
  
  
function mapStateToProps(state) {
    return {
        member: state.member
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);