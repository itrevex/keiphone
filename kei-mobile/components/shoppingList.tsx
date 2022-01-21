import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getFirestore, setDoc, doc, collection } from "firebase/firestore";

const App = () => {
  const [title, setTitle] = useState("dummy title");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [content, setContent] = useState("dummy content");

  const onSubmit = () => {
    // if (!title) {
    //   setTitleError("Please enter a title");
    //   return;
    // }
    // if (!content) {
    //   setContentError("Please enter shopping list content");
    //   return;
    // }

    const db = getFirestore();

    const listsRef = collection(db, "shopping_lists");

    setDoc(doc(listsRef), {
      title,
      content,
    }).then(() => {
      Alert.alert(title, "Shopping list submitted!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    });
  };

  return (
    <>
      <Text style={styles.title}>
        Enter your shopping list "Title" and "Content"
      </Text>
      <Text style={{ color: "red" }}>{titleError}</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Title"
          placeholderTextColor="#003f5c"
          value={title}
          onChangeText={(title) => {
            setTitleError("");
            setTitle(title);
          }}
        />
      </View>
      <Text style={{ color: "red" }}>{contentError}</Text>

      <View style={styles.inputView}>
        <TextInput
          editable
          style={styles.TextInput}
          placeholder="Content"
          placeholderTextColor="#003f5c"
          value={content}
          onChangeText={(content) => {
            setContentError("");
            setContent(content);
          }}
        />
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
        <Text>Submit To vendor</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  submitBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  title: {
    marginBottom: 24,
    fontSize: 18,
  },
});
export default App;
