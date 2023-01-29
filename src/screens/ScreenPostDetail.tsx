import React, { useEffect } from "react";
import parseHtmlTextContent from "parse-html-text-content";
import { SafeAreaView, Text, View } from "react-native";

export const ScreenPostDetail = () => {
  const [desc, setDesc] = useState("");
  const getDescription = (html) => {
    const description = parseHtmlTextContent(html);
    return description.length > 100 ? `${description.substring(0, 100)}...` : description;
  };

  useEffect(() => {
    const descHtml = `
      <div>안녕하세요<div><br><div>반갑습니다<div>
    `;
    setDesc(getDescription(descHtml));
  }, []);

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Add Post</Text>
        <View style={styles.htmlBoxStyle}>
          <Text>{desc}</Text>
        </View>
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
    height: 200,
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
