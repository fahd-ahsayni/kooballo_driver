import { View, Pressable, Image } from "react-native";
import React, { useMemo } from "react";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { setIsActive } from "../../config/app-slice";

export default function SwitchMode({ size }) {
  const isActive = useSelector((state) => state.appSlice.isActive);
  const dispatch = useDispatch();
  const TrackWidth = useMemo(() => {
    return size * 1.5;
  }, [size]);
  const TrackHight = useMemo(() => {
    return size;
  }, [size]);
  const knobSize = useMemo(() => {
    return size * 0.6;
  }, [size]);

  const colorsMode = {
    active: "#22c55e",
    notActive: "#ef4444",
  };

  return (
    <Pressable
      className="w-1/2 items-end justify-end"
      onPress={() => dispatch(setIsActive(!isActive))}
    >
      <View className="items-center relative justify-center">
        <MotiView
          className="absolute"
          style={{
            width: TrackWidth,
            height: TrackHight,
            borderRadius: TrackHight / 2,
          }}
          from={{
            backgroundColor: isActive
              ? colorsMode.active
              : colorsMode.notActive,
          }}
          animate={{
            backgroundColor: isActive
              ? colorsMode.active
              : colorsMode.notActive,
          }}
          transition={{
            type: "timing",
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }}
        />

        <MotiView
          transition={{
            type: "timing",
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }}
          from={{
            translateX: isActive ? TrackWidth / 4 : -TrackWidth / 4,
          }}
          className="bg-white items-center justify-center"
          style={{ width: size, height: size, borderRadius: size / 2 }}
        >
          <MotiView
            transition={{
              type: "timing",
              duration: 300,
              easing: Easing.inOut(Easing.ease),
            }}
            animate={{
              borderColor: isActive ? colorsMode.active : colorsMode.notActive,
            }}
            className="bg-white"
            style={{
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              borderWidth: knobSize * 0.1,
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
}
