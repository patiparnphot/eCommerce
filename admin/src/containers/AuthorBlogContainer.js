import AuthorBlogComponent from '../components/AuthorBlogComponent';
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
    fetchContent: (contentType, setAlreadyFetch) => {
      dispatch(fetchContent(contentType)).then((response) => {
        console.log('active authorBlog: ', response.payload);
        !response.error ? dispatch(fetchContentSuccess(response.payload)) : dispatch(fetchContentFailure(response.payload));
        setAlreadyFetch(true);
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
    newContent: state.contents.newContent,
    member: state.member
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorBlogComponent);