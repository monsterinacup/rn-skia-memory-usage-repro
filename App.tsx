import { Canvas, Fit, Image, useImage } from "@shopify/react-native-skia";
import React, { useState } from "react";
import {
  LayoutChangeEvent,
  LayoutRectangle,
  Text,
  TouchableOpacity,
  View
} from "react-native";

/**
 * A simple view with a button that toggles the display of a Skia Canvas
 */
export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "black",
        paddingTop: 60,
      }}
    >
      <ShowHideContent>
        <SkiaCanvasWithImage />
      </ShowHideContent>
    </View>
  );
}

function SkiaCanvasWithImage() {
  // Layout state to set the size of the Image to be the same size as the Canvas
  const [layout, setLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    console.log("Canvas layout:", event.nativeEvent.layout);
    setLayout(event.nativeEvent.layout);
  };

  return (
    <View
      style={{
        // Make the view fill the space available and give it a dark blue background
        flex: 1,
        backgroundColor: "#00072d",
        alignSelf: "stretch",
        marginTop: 20,
      }}
      onLayout={handleLayout}
    >
      <Canvas
        style={{
          // Make the canvas fill the parent view, and give it a dark red background
          flex: 1,
          alignSelf: "stretch",
          backgroundColor: "#2a0000",
        }}
      >
        <HiResCatImage
          width={layout.width}
          height={layout.height}
          fit="cover"
        />
      </Canvas>
    </View>
  );
}

const imageUrl =
  "https://images.ctfassets.net/ub3bwfd53mwy/5WFv6lEUb1e6kWeP06CLXr/acd328417f24786af98b1750d90813de/4_Image.jpg";

const imageTwoUrl =
  "https://www.holidaysmart.com/sites/default/files/dailyimage/og/2022/cat-scottish-fold-day.jpg";

const hiResCatImageUrl =
  "https://plus.unsplash.com/premium_photo-1664299749481-ac8dc8b49754?fm=jpg";

function HiResCatImage({
  width,
  height,
  fit,
}: {
  width: number;
  height: number;
  fit?: Fit;
}) {
  const img = useImage(hiResCatImageUrl);

  // Simple logging to confirm the image is loaded and its dimensions
  // useEffect(() => {
  //   console.log("Image loaded:", !!img);
  //   if (img) console.log("Image dimensions:", img.width(), img.height());
  // }, [img]);

  if (!img) {
    return null;
  }

  return (
    <Image image={img} x={0} y={0} width={width} height={height} fit={fit} />
  );
}

/**
 * A simple view with a button that toggles the display of child content
 */
function ShowHideContent({ children }: { children?: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  const showHideButton = (
    <View
      style={{
        flex: 0,
        alignSelf: "center",
        padding: 10,
        backgroundColor: "gray",
        borderRadius: 8,
      }}
    >
      <TouchableOpacity onPress={() => setVisible((prev) => !prev)}>
        <Text style={{ color: "white" }}>
          {visible ? "Hide" : "Show"} Content
        </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      {showHideButton}
      {visible && children}
    </>
  );
}
