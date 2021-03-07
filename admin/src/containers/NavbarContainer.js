import Navbar from '../components/NavbarComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleNavbar: () => {
      dispatch({type: "TOGGLE_NAV"});
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    pagename: ownProps.pagename
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);