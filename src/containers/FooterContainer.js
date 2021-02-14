import Footer from '../components/FooterComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    footerTag: ownProps.footerTag
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Footer));