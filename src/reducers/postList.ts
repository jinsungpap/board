import { PostInfo } from "../@types/postInfo";
import { CREATE_POST_SUCCESS, GET_POST_LIST_SUCCESS, TypePostListAction } from "../actions/post";

export type TypePostListReducer = {
  list: PostInfo[];
};

const defaultPostListReducer = {
  list: [],
};

export const postListReducer = (state: TypePostListReducer = defaultPostListReducer, action: TypePostListAction) => {
  switch (action.type) {
    case GET_POST_LIST_SUCCESS:
      return {
        ...state,
        list: action.list,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        list: state.list.concat([action.post]),
      };
  }
  return {
    ...state,
  };
};
