import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import {
  Pressable,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TextInput, // Added TextInput import
} from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import * as Font from "expo-font";

export default function CreateMusicVideo() {
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(Dimensions.get("window").width);
    };

    Dimensions.addEventListener("change", updateWindowWidth);

    return () => {
      Dimensions.removeEventListener("change", updateWindowWidth);
    };
  }, []);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const colorScheme = useColorScheme();
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  const [preference, setPreference] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [musicGenre, setMusicGenre] = useState("");

  return (
    <>
      {/* Add the custom header with shadow separator */}

      <View
        style={{
          height: 2,
          backgroundColor: "#E0E0E0",
          width: "100%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 5,
        }}
      />

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 32,
          backgroundColor: "white",
        }}
      >
        <View style={{ width: "100%", alignItems: "center", marginBottom: 20 }}>
          <Text style={{ marginBottom: 8, fontSize: 16 }}>
            Enter your loved one's preferences (favorite cartoons, favorite
            superhero, etc):
          </Text>
          <TextInput
            style={{
              height: 40,
              width: "90%",
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
              paddingHorizontal: 10,
            }}
            placeholder="Preferences"
            value={preference}
            onChangeText={setPreference}
          />
        </View>
        <View style={{ width: "100%", alignItems: "center", marginBottom: 20 }}>
          <Text style={{ marginBottom: 8, fontSize: 16 }}>
            Enter a video of your loved one (we'll copy their moves with the
            character provided!):
          </Text>
          <TextInput
            style={{
              height: 40,
              width: "90%",
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
              paddingHorizontal: 10,
            }}
            placeholder="Video URL"
            value={videoURL}
            onChangeText={setVideoURL}
          />
        </View>
        <View style={{ width: "100%", alignItems: "center", marginBottom: 20 }}>
          <Text style={{ marginBottom: 8, fontSize: 16 }}>
            Let us know the music genre:
          </Text>
          <TextInput
            style={{
              height: 40,
              width: "90%",
              borderColor: "gray",
              borderWidth: 1,
              paddingHorizontal: 10,
            }}
            placeholder="Music Genre"
            value={musicGenre}
            onChangeText={setMusicGenre}
          />
        </View>
        <Pressable
          onPress={() => {
            localStorage.setItem("preference", preference);
            localStorage.setItem("videoURL", videoURL);
            localStorage.setItem("musicGenre", musicGenre);

            fetch("/.netlify/functions/create-checkout-session", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                priceId: process.env.EXPO_PUBLIC_STRIPE_SONG_PROD,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.url) {
                  console.log("Redirecting to Stripe Checkout URL:", data.url);
                  //setIsPaywallVisible(false); // Dismiss the modal before redirecting
                  window.location.href = data.url;
                } else {
                  throw new Error("Stripe Checkout URL not found");
                }
              })
              .catch((error) => {
                console.error("Error redirecting to Stripe Checkout:", error);
              });
          }}
          style={{
            backgroundColor: "blue",
            borderRadius: 9999,
            paddingHorizontal: 32,
            paddingVertical: 16,
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Create Video
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}
