import IndexContent from '../components/IndexContentComponent ';
import { 
  fetchContent,
  fetchContentSuccess,
  fetchContentFailure,
  resetActiveContent,
  resetNewContent
} from '../actions/contents';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    fetchContent: (contentType) => {
      dispatch(fetchContent(contentType)).then((response) => {
        console.log('active indexContent: ', response.payload);
        !response.error ? dispatch(fetchContentSuccess(response.payload)) : dispatch(fetchContentFailure(response.payload));
      });
    },
    resetActiveContent: () => {
      dispatch(resetActiveContent());
    },
    resetNewContent: () => {
      dispatch(resetNewContent());
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    activeContent: state.contents.activeContent,
    newContent: state.contents.newContent
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContent);