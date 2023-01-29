import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { PostInfo } from "../@types/postInfo";

export const Post: React.FC<{ post: PostInfo }> = ({ post }) => {
  const navigation = useNavigation();
  const goDetail = () => {
    navigation.navigate("PostDetail", {});
  };
  return (
    <TouchableOpacity onPress={goDetail}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 21, borderBottomColor: "lightgrey", borderBottomWidth: 1 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 12 }}>{post.title}</Text>
        <Text style={{ marginBottom: 12 }}>{post.description}</Text>
        <Image source={{ uri: post.imageUrl }} style={{ width: 72, height: 72 }} />
      </View>
    </TouchableOpacity>
  );
};
