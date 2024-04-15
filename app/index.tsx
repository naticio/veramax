import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import YoutubePlayer from "react-native-youtube-iframe";
import { Link, Tabs } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import {
  Pressable,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import YouTube from "react-native-youtube";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import * as Font from "expo-font";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function IndexPage() {
  //STRIPE PAYMENT SUCCESFULL
  useEffect(() => {
    // Parse the URL to check for a session_id query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    const priceId = urlParams.get("priceId");

    if (sessionId) {
      // Check if the session ID has already been processed
      const processedSessions = JSON.parse(
        localStorage.getItem("processedSessions") || "[]"
      );
      if (processedSessions.includes(sessionId)) {
        console.log("Session ID has already been processed.");
        return; // Exit the function if the session ID was already processed
      }

      // Call the Netlify function to validate the session
      fetch("/.netlify/functions/validate-stripe-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.valid) {
            console.log("Session is valid:", data.session);
            // Session is valid, proceed to update credits based on priceId
            if (
              priceId === process.env.EXPO_PUBLIC_STRIPE_SONG_TEST ||
              priceId === process.env.EXPO_PUBLIC_STRIPE_SONG_PROD
            ) {
              //send email to naticio@gmail.com
              //show confirmation to user that payment was succesful
            }

            // Mark the session ID as processed to prevent reprocessing
            processedSessions.push(sessionId);
            localStorage.setItem(
              "processedSessions",
              JSON.stringify(processedSessions)
            );
          } else {
            console.log("Session is not valid:", data.session);
            // Handle invalid session if needed
          }
        })
        .catch((error) => {
          console.error("Error validating session:", error);
        });
    }
  }, []);

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

  const [checkoutModal, setCheckoutModal] = useState(false);

  return (
    <>
      {/* Add the custom header with shadow separator */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#fff",
          elevation: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/images/unicorn_icon.png")}
            style={{
              width: 34,
              height: 34,
              marginRight: 8, // Adjusted margin to keep icon and text close
            }}
          />
          <Text
            style={{
              fontSize: Dimensions.get("window").width < 768 ? 18 : 24,
              fontWeight: "bold",
              marginRight: 16,
            }}
          >
            veramax
          </Text>

          {/* {Dimensions.get("window").width >= 768 && (
            <Image
              source={require("../assets/images/laurel_golden.png")}
              style={{
                width: 30,
                height: 30,
                marginBottom: 0,
              }}
            />
          )} */}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "center", flex: 1 }}
          >
            <Text
              style={{
                marginRight: 16,
                fontSize: Dimensions.get("window").width < 768 ? 1 : 16,
              }}
            >
              Pricing
            </Text>
            <Text
              style={{
                marginRight: 16,
                fontSize: Dimensions.get("window").width < 768 ? 1 : 16,
              }}
            >
              Wall of love
            </Text>
            <Text
              style={{
                marginRight: 16,
                fontSize: Dimensions.get("window").width < 768 ? 1 : 16,
              }}
            >
              Blog
            </Text>
          </View>

          <Link push href="/create-music-video">
            <Pressable
              style={{
                backgroundColor: "blue",
                borderRadius: 9999,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Create a video
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>

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
        {/* <Text
          style={{
            fontSize: 50,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 16,
            marginTop: 16,
          }}
        >
          Create music videos for your loved ones
        </Text> */}
        {/* <Text
          style={{
            fontSize: Dimensions.get("window").width < 768 ? 30 : 45,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 16,
            marginTop: 16,
          }}
        >
          🎉 Surprise your loved ones with a custom music video
        </Text> */}
        <Text
          style={{
            fontSize: Dimensions.get("window").width < 768 ? 30 : 45,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 16,
            marginTop: 16,
          }}
        >
          🎉 Create Birthday videos easily with AI
        </Text>
        <Text
          style={{
            fontSize: Dimensions.get("window").width < 768 ? 13 : 18,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Let your loved one be the main character with his favorite characters,
          music and dance moves. AI will do the rest.
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Link push href="/create-music-video">
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
                Create a video - it's easy
              </Text>
            </Pressable>
          </Link>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <Image
            source={require("../assets/images/laurel_golden.png")}
            style={{
              width: 50,
              height: 50,
              marginRight: 10,
            }}
          />

          <Image
            source={require("../assets/images/pbskids.png")}
            style={{
              width: 50,
              height: 50,
              marginLeft: 10,
            }}
          />

          <Image
            source={require("../assets/images/khanacademy.jpeg")}
            style={{
              width: 50,
              height: 50,
              marginLeft: 10,
            }}
          />
          <Image
            source={require("../assets/images/nbc.png")}
            style={{
              width: 50,
              height: 50,
              marginLeft: 10,
            }}
          />
          <Image
            source={require("../assets/images/gma.png")}
            style={{
              width: 70,
              height: 50,
              marginLeft: 10,
              resizeMode: "contain",
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/images/parent1.webp")}
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              marginRight: -10,
            }}
          />
          <Image
            source={require("../assets/images/parent2.webp")}
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              marginRight: -10,
            }}
          />
          <Image
            source={require("../assets/images/parent4.jpg")}
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              marginRight: -10,
            }}
          />
          <Image
            source={require("../assets/images/parent5.jpeg")}
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: Dimensions.get("window").width < 768 ? 12 : 16,
              paddingBottom: 20,
            }}
          >
            Loved by over 3 million parents (including ourselves)
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ))}
          </View>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* <YoutubePlayer
            height={400}
            width={800}
            play={true}
            playList={["kV__iZuxDGE"]}
            mute={true}
            initialPlayerParams={{
              controls: false,
              loop: true,
              rel: false,
              iv_load_policy: 3,
            }}
          /> */}

          <Video
            style={{
              alignSelf: "center",
              width: Dimensions.get("window").width < 768 ? "20%" : "30%",
              height: "100%",
            }}
            source={require("../assets/images/goodgenesfam.mp4")}
            useNativeControls={true}
            shouldPlay={true}
            resizeMode={ResizeMode.CONTAIN}
            onReadyForDisplay={(videoData) => {
              videoData.srcElement.style.position = "initial"; //only for WEB
            }}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={checkoutModal}
        onRequestClose={() => {
          setCheckoutModal(!checkoutModal);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "#ffffff", // Changed to white color
              borderRadius: 25,
              padding: 40,
              alignItems: "center",
              shadowColor: "#343a40",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 6,
            }}
          >
            <Pressable
              style={{ backgroundColor: "blue", padding: 10 }}
              onPress={() => {
                setCheckoutModal(!setCheckoutModal);
              }}
            >
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
