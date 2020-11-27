import Faq from '../components/FaqComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    faq: ownProps.faq
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Faq);