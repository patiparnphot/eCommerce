import Features from '../components/FeaturesComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    features: ownProps.features
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Features);