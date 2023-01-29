import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { PostInfo } from "../@types/postInfo";
import { RootReducer } from "../store/store";

export const GET_POST_LIST_REQUEST = "GET_POST_LIST_REQUEST" as const;
export const GET_POST_LIST_SUCCESS = "GET_POST_LIST_SUCCESS" as const;

export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST" as const;
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS" as const;

export const getPostListRequest = () => {
  return {
    type: GET_POST_LIST_REQUEST,
  };
};

export const getPostListSuccess = (list: PostInfo[]) => {
  return {
    type: GET_POST_LIST_SUCCESS,
    list,
  };
};

export const getPostList = (): TypePostListThunkAction => async (dispatch) => {
  // dispatch(getPostListRequest());
  // back api

  dispatch(
    getPostListSuccess([
      {
        id: "ID_01",
        title: "TEST_01",
        description: "description_01",
        imageUrl: "https://taegon.kim/wp-content/uploads/2018/05/image-9.png",
      },
      {
        id: "ID_02",
        title: "TEST_02",
        description: "description_02",
        imageUrl: "https://item.kakaocdn.net/do/009619490db024d6a8acf277cb93a6c58f324a0b9c48f77dbce3a43bd11ce785",
      },
    ])
  );
};

export const createPostSuccess = (post: PostInfo) => {
  return {
    type: CREATE_POST_SUCCESS,
    post,
  };
};

export const createPost =
  (post: PostInfo): TypePostListThunkAction =>
  async (dispatch) => {
    dispatch(
      createPostSuccess({
        ...post,
      })
    );
  };

export type TypePostListDispatch = ThunkDispatch<RootReducer, undefined, TypePostListAction>;
export type TypePostListThunkAction = ThunkAction<void, RootReducer, undefined, TypePostListAction>;

export type TypePostListAction =
  | ReturnType<typeof getPostListRequest>
  | ReturnType<typeof getPostListSuccess>
  | ReturnType<typeof createPostSuccess>;
