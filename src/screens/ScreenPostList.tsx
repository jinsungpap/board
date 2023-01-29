import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Button, FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { PostInfo } from "../@types/postInfo";
import { getPostList, TypePostListDispatch } from "../actions/post";
import { Post } from "../components/Post";
import { useTotalPostList } from "../selector/post";

export const ScreenPostList = () => {
  const postList = useTotalPostList();
  const dispatch = useDispatch<TypePostListDispatch>();
  const navigation = useNavigation();

  const goPostAdd = () => {
    navigation.navigate("PostAdd", {});
  };
  useEffect(() => {
    dispatch(getPostList());
  }, []);

  const _renderItem = ({ item }: { item: PostInfo }) => {
    return <Post post={item} />;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Post List</Text>
      <FlatList data={postList} renderItem={_renderItem} />
      <View style={{ position: "absolute", right: 20, bottom: 20 }}>
        <TouchableOpacity
          onPress={goPostAdd}
          activeOpacity={1}
          style={{
            width: 62,
            height: 62,
            backgroundColor: "#444",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "#fff", fontSize: 40, textAlignVertical: "center", textAlign: "center" }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
