import React, { useEffect, useState } from "react";
import parseHtmlTextContent from "parse-html-text-content";
import { SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { PostInfo } from "../@types/postInfo";
import RenderHtml from "react-native-render-html";

export const ScreenPostDetail = () => {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const params: any = route?.params;
  const post: PostInfo = params?.post;
  const [desc, setDesc] = useState("");
  const [originDesc, setOriginDesc] = useState("");
  const getDescription = (html) => {
    const description = parseHtmlTextContent(html);
    console.log("description ::", description);
    return description.length > 100 ? `${description.substring(0, 100)}...` : description;
  };

  useEffect(() => {
    if (post?.originDescription) {
      setOriginDesc(post?.originDescription);
      return;
    }
    const descHtml = post?.description || "";
    setDesc(getDescription(descHtml));
  }, []);

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Detail Post</Text>
        <ScrollView>
          <View style={styles.htmlBoxStyle}>
            {originDesc ? (
              <>
                <RenderHtml contentWidth={330} source={{ html: originDesc }} />
              </>
            ) : (
              <Text>{desc}</Text>
            )}
          </View>
        </ScrollView>
        <View style={styles.richTextContainer}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#C3ACD0",
    padding: 20,
    alignItems: "center",
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#312921",
    marginBottom: 10,
  },

  htmlBoxStyle: {
    minHeight: 200,
    width: 330,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },

  richTextContainer: {
    display: "flex",
    width: "100%",
    marginBottom: 10,
  },

  richTextEditorStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  errorTextStyle: {
    color: "#FF0000",
    marginBottom: 10,
  },

  saveButtonStyle: {
    backgroundColor: "#c6c3b3",
    borderWidth: 1,
    borderColor: "#c6c3b3",
    borderRadius: 10,
    padding: 10,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  textButtonStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#312921",
  },
});
