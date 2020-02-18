import Team from '../components/TeamComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    team: ownProps.team
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);