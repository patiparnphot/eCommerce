import Good from '../components/GoodComponent';
import { fetchGood, fetchGoodSuccess, fetchGoodFailure } from '../actions/goods';
import {
  createComment,
  createCommentSuccess,
  createCommentFailure,
  resetNewComment
} from '../actions/comments';
import { signInUser, signInUserSuccess, signInUserFailure } from '../actions/users';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    fetchGood: (slug) => {
      dispatch(fetchGood(slug)).then((response) => {
        console.log('good: ', response.payload);
        !response.error ? dispatch(fetchGoodSuccess(response.payload)) : dispatch(fetchGoodFailure(response.payload));
      });
    },
    signIn: () => {
      dispatch(signInUser()).then((response) => {
        console.log('signInRes: ', response.payload);
        !response.error ? dispatch(signInUserSuccess(response.payload)) : dispatch(signInUserFailure(response.payload));
      });
    },
    createComment: (slug, comment, token) => {
      dispatch(createComment(slug, comment, token)).then((response) => {
        console.log('newComment: ', response.payload);
        !response.error ? dispatch(createCommentSuccess(response.payload)) : dispatch(createCommentFailure(response.payload));
      });
    },
    resetNewComment: () => {
      dispatch(resetNewComment());
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    activeGood: state.goods.activeGood,
    goodSlug: ownProps.slug,
    goodTag: ownProps.tag,
    member: state.member,
    newComment: state.comments.newComment
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Good);