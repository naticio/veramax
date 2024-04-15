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

         <Text style={{ fontSize: 32, fontWeight: "bold", color: "green", marginVertical: 20 }}>
            Congratulations on your purchase!
         </Text>
         <Text style={{ fontSize: 16,  color: "green", marginVertical: 20 }}>
            You'll receive the song in your email in less than 24 hrs
         </Text>
         <Link push href="/index">
            <Pressable
              style={{
                backgroundColor: "blue",
                borderRadius: 9999,
                paddingHorizontal: 32,
                paddingVertical: 16,
                flex: 1,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                Ok! 
              </Text>
            </Pressable>
          </Link>
      </ScrollView>
    </>
  );
}
