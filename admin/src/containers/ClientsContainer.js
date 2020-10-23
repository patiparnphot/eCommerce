import Clients from '../components/ClientsComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    clients: ownProps.clients
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);