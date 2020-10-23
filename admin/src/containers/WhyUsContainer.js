import WhyUs from '../components/WhyUsComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    whyUs: ownProps.whyUs
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WhyUs);