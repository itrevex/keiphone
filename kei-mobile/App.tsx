import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View } from "react-native";
import { initializeApp } from "firebase/app";
import ShoppingListForm from "./components/shoppingList";

const firebaseConfig = {
  apiKey: "AIzaSyBE_n8uqutcAZFNwqYRtXVXXeY3AQ8uDhk",
  authDomain: "keiphone-8c01b.firebaseapp.com",
  projectId: "keiphone-8c01b",
  storageBucket: "keiphone-8c01b.appspot.com",
  messagingSenderId: "399017469017",
  appId: "1:399017469017:web:8d94dc813854a8bd08fd48",
  measurementId: "G-FG3N5S56P4",
};

export default function App() {
  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("./assets/keiphone.webp")} />
      </View>
      <ShoppingListForm />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding:16
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  imageContainer: {
    height: 48,
    marginBottom: 72
  },
});
