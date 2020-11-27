import Intro from '../components/IntroComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    intro: ownProps.intro
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);