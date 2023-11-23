export const GET_REVIEW_DETAIL = "[REVIEW APP] GET REVIEW DETAIL";
export const REMOVE_REVIEW_DETAIL = "[REVIEW APP]  REMOVE REVIEW DETAIL";

export const getReviewDetail = (data) => {
    return {
        type: GET_REVIEW_DETAIL,
        payload: data
    }
}

export const getRemoveDetail = () => {
    return {
        type: REMOVE_REVIEW_DETAIL
    }
}