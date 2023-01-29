import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import * as ImagePicker from "expo-image-picker";
import { upload } from "../utils/upload";
import { createPost } from "../actions/post";
import { PostInfo } from "../@types/postInfo";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export const ScreenPostAdd = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const richText = useRef();

  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);
  const [sampleImage, setSampleImage] = useState<string | null>(null);

  const richTextHandle = (descriptionText: string) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  const submitContentHandle = async () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
      Alert.alert("글을 작성해 주세요 :)");
    } else {
      // send data to your server!
      console.log("add post!!");
      const post = {
        id: `post-${new Date().getTime()}`,
        title: "TEST_03",
        description: replaceWhiteSpace,
        imageUrl: sampleImage,
        originDescription: descHTML,
      } as PostInfo;
      await dispatch(createPost({ ...post }));
      navigation.goBack();
    }
  };

  const pickImage = async () => {
    return await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  const onPressAddImage = async () => {
    const images = await pickImage();
    if (images.canceled) return;
    await upload(images?.assets?.[0]).then((data) => {
      console.log("imageUri :::", data);
      setSampleImage(data);
      richText.current?.insertImage(data);
    });
  };

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView>
            <Pressable onPress={() => richText.current?.dismissKeyboard()}>
              <Text style={styles.headerStyle}>Add Post</Text>
              <View style={styles.htmlBoxStyle}>
                <Text>{descHTML}</Text>
              </View>
            </Pressable>
            <View style={styles.richTextContainer}>
              <RichEditor
                ref={richText}
                onChange={richTextHandle}
                placeholder="Write your cool content here :)"
                androidHardwareAccelerationDisabled={true}
                style={styles.richTextEditorStyle}
                initialHeight={250}
              />
              <RichToolbar
                editor={richText}
                selectedIconTint="#873c1e"
                iconTint="#312921"
                actions={[
                  actions.insertImage,
                  actions.setBold,
                  actions.setItalic,
                  // actions.insertBulletsList,
                  // actions.insertOrderedList,
                  // actions.insertLink,
                  actions.setStrikethrough,
                  actions.setUnderline,
                ]}
                onPressAddImage={onPressAddImage}
                style={styles.richTextToolbarStyle}
              />
            </View>
            {showDescError && <Text style={styles.errorTextStyle}>Your content shouldn't be empty 🤔</Text>}

            <TouchableOpacity style={styles.saveButtonStyle} onPress={submitContentHandle}>
              <Text style={styles.textButtonStyle}>저장 </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
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
