import { Dimensions, StyleSheet, View } from "react-native";
import React, { memo, useEffect, useRef } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { theme } from "../../constants/theme";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("window").height;

const Video = memo(({ videoSource }: { videoSource: string }) => {
  const ref = useRef(null);
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener("playingChange", (isPlaying) => {
      //   setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);
  return (
    <VideoView
      ref={ref}
      style={styles.video}
      player={player}
      allowsFullscreen
    />
  );
});

Video.displayName = "Video";

export { Video };

const styles = StyleSheet.create({
  video: {
    width: width,
    height: height - 300,
    backgroundColor: theme.colors.neutral(0.1),
  },
});
