import About from '../components/AboutComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    about: ownProps.about
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(About);