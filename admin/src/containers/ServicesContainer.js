import Services from '../components/ServicesComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    services: ownProps.services
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);