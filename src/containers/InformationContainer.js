import Information from '../components/InformationComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    information: ownProps.information
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Information);