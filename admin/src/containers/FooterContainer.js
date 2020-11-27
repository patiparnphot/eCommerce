import Footer from '../components/FooterComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    //footerTag: ownProps.footerTag
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);