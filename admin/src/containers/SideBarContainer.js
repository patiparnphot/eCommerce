import SideBar from '../components/SideBarComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    pathname: ownProps.pathname
    // member: state.member
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);