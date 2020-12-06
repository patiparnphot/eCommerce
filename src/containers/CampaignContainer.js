import Campaign from '../components/CampaignComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    campaign: ownProps.campaign
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);