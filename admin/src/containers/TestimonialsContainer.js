import Testimonials from '../components/TestimonialsComponent';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


function mapStateToProps(state, ownProps) {
  return {
    testimonials: ownProps.testimonials
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Testimonials);