import CallToAction from '../components/CallToActionComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    callToAction: ownProps.callToAction
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CallToAction);