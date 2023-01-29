import { useSelector } from "react-redux";
import { PostInfo } from "../@types/postInfo";
import { RootReducer } from "../store/store";

export const useTotalPostList = () => useSelector<RootReducer, PostInfo[]>((state) => state.postList.list);
