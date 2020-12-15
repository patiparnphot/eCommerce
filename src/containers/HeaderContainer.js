import Header from '../components/HeaderComponent';
import {
  signInUser,
  signInUserSuccess,
  signInUserFailure,
  logoutUser
} from '../actions/users';
import {
  fetchCartGoods
} from '../actions/goods'
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    fetchGoodInCart: () => {
      dispatch(fetchCartGoods());
    },
    signIn: () => {
      dispatch(signInUser()).then((response) => {
        console.log('signInRes: ', response.payload);
        !response.error ? dispatch(signInUserSuccess(response.payload)) : dispatch(signInUserFailure(response.payload));
      });
    },
    logOut: () => dispatch(logoutUser())
    // resetPage: () => {
    //     dispatch(resetPage());
    // },
    // loadUserFromPage: () => {
    //     let username = sessionStorage.getItem('username');
  	 //	if(!username || username === '') {//if there is no token, dont bother
  	 //		return console.log("no username in storage");
  	 //	}
  	 //	//fetch user from token (if server deems it's valid token)
  	 //	dispatch(meFromPage(username)).then((response) => {
  	 //	  console.log(JSON.stringify(response));
  	 //	    if (!response.error) {
  	 //	        dispatch(meFromPageSuccess(response.payload))
  	 //	    } else {
  	 //	        sessionStorage.removeItem('username');//remove token from storage
  	 //	        dispatch(meFromPageFailure(response.payload));
  	 //	    }
    //     })
    // },
    // signOut: () => {
    //     sessionStorage.removeItem('username');
    //     dispatch(logoutUser());
    // }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    headerTag: ownProps.headerTag,
    incartGoods: state.goods.incartGoods,
    member: state.member
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);