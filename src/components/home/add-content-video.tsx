import { Dimensions, StyleSheet, View } from "react-native";
import React, { memo, useEffect, useRef } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { theme } from "../../constants/theme";
import { hp } from "../../helper/common";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("window").height;

const AddContentVideo = memo(({ videoSource }: { videoSource: string }) => {
  const ref = useRef(null);
  const player = useVideoPlayer(videoSource, (player) => {
    player.play();
  });

  return (
    <VideoView
      ref={ref}
      style={styles.video}
      player={player}
      allowsFullscreen
    />
  );
});

AddContentVideo.displayName = "AddContentVideo";

export { AddContentVideo };

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: hp(45),
    backgroundColor: theme.colors.neutral(0.1),
  },
});
