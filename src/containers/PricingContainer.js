import Pricing from '../components/PricingComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    pricing: ownProps.pricing
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);