import React, { Component } from 'react';
import { signInUser, signInUserSuccess, signInUserFailure } from '../actions/users';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function SignInPage ({toggleNavbar, signIn, member}) {
  
    const history = useHistory();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    React.useEffect(() => {
        window.scrollTo(0, 0);
        toggleNavbar();
    }, []);

    React.useEffect(() => {
        const logHistory = {...history};
        const referer = logHistory.location.state && logHistory.location.state.from;
        if(member.user && member.user.username == username) {
            if(referer) {
                history.push(referer, {from: logHistory.location.pathname});
            } else {
                history.push("/");
            }
        }
    }, [member])

    function logIn () {
        const logHistory = {...history};
        const referer = logHistory.location.state && logHistory.location.state.from;
        console.log("from signin: ", logHistory);
        console.log("referer: ", referer);
        let account = {
            username: username,
            password: password
        }
        signIn(account);
    }

    function changeInput(event, input) {
        if( input == "username" ) {
            setUsername(event.target.value);
        } else if( input == "password" ) {
            setPassword(event.target.value);
        }
    }
    
    return (
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h3>
                        การเข้าสู่ระบบ
                    </h3>
                </div>
                
                <div>

                    <div class="row auth-form">

                        <div class="col-md-4">
                            <div class="asside-nav no-bg">
                                <ul class="nav-vrt border">
                                    
                                </ul>
                            </div>
                        </div>

                        <div class="col-md-5 col-md-offset-1 form-fields">
                                <div class="form-group">
                                    <label for="inputUsername">Username</label>
                                    <input
                                        type="text" class="form-control"
                                        id="inputUsername" placeholder="username"
                                        value={username} onChange={(e) => changeInput(e, "username")}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword">Password</label>
                                    <input
                                        type="password" class="form-control"
                                        id="inputPassword" placeholder="Password"
                                        value={password} onChange={(e) => changeInput(e, "password")}
                                    />
                                </div>
                                
                                <span class="sdw-wrap">
                                    <button onClick={() => logIn()} class="sdw-hover btn btn-material btn-yellow btn-lg ripple-cont">ยืนยัน</button>
                                    <span class="sdw"></span>
                                </span>

                                <ul class="addon-login-btn">
                                    <li>
                                        <Link to="/register">สมัครสมาชิกใหม่</Link>
                                    </li>
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (account) => {
            dispatch(signInUser(account)).then((response) => {
                console.log('signInRes: ', response.payload);
                if(response.payload.modUser && (response.payload.modUser.username == account.username)) {
                    !response.error ? dispatch(signInUserSuccess(response.payload)) : dispatch(signInUserFailure(response.payload));
                    alert("เข้าสู่ระบบสำเร็จ!!!");
                    localStorage.setItem('eCommerceAuth', JSON.stringify(response.payload));
                } else {
                    alert("กรุณาตรวจสอบ username และ password ของท่านใหม่");
                }
            });
        }
    };
};
  
  
function mapStateToProps(state, ownProps) {
    return {
        toggleNavbar: ownProps.toggleNavbar,
        member: state.member
    };
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);