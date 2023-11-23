import {GET_REVIEW_DETAIL, REMOVE_REVIEW_DETAIL} from "./action";

const initialState = {
    reviewDetail: {},
    isPending: false
};

const ReviewReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_REVIEW_DETAIL:
            return {
                ...state,
                reviewDetail: payload,
                isPending: true
            };
        case REMOVE_REVIEW_DETAIL:
            return {
                ...state,
                reviewDetail: {},
                isPending: false
            };
        default :
            return state;
    }
};

export default ReviewReducer