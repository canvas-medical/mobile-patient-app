/*  eslint-disable max-len */
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  createAnimatedPropAdapter,
  interpolateColor,
  processColor,
  useAnimatedProps,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    position: 'absolute',
    right: g.size(8),
    top: g.size(8),
    zIndex: 1,
  }
});

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function LightbulbOnSVG({
  color,
  width,
  height,
  fill,
  lightbulbOn
}: {
  color: string,
  width: number,
  height: number,
  fill?: string,
  lightbulbOn: boolean
}) {
  const fillProgress = useSharedValue(lightbulbOn ? 1 : 0);
  const animatedProps = useAnimatedProps(
    () => {
      const fillValue = interpolateColor(fillProgress.value, [0, 1], ['transparent', 'yellow']);
      return {
        fill: fillValue
      };
    },
    [],
    createAnimatedPropAdapter((props) => {
      if (Object.keys(props).includes('fill')) {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        props.fill = { type: 0, payload: processColor(props.fill) };
      }
    })
  );
  useEffect(() => {
    fillProgress.value = withTiming(lightbulbOn ? 1 : 0, { duration: 500 });
  }, [lightbulbOn]);

  return (
    <View style={s.container}>
      <Svg
        width={width}
        height={height}
        fill={fill}
        viewBox="0 0 512 512"
      >
        <AnimatedPath
          d="M416.28 155.16c-8.533-76.8-69.973-138.24-146.773-146.773-4.267 0-9.387-.853-14.507-.853s-9.387 0-14.507.853c-76.8 8.533-138.24 70.827-146.773 146.773-5.973 54.613 14.507 104.107 50.347 138.24 20.48 19.627 37.547 45.227 42.667 72.533h136.533c5.12-27.307 22.187-52.907 42.667-72.533 35.839-34.133 56.319-83.627 50.346-138.24"
          style={{ fill }}
          animatedProps={animatedProps}
          transform="translate(1 1)"
        />
        <AnimatedPath
          d="M416.28 155.16c-8.533-76.8-69.973-138.24-146.773-146.773-4.267-.854-9.387-.854-14.507-.854-4.267 0-8.533 0-12.8.853h1.707C319.853 16.92 382.147 78.36 390.68 155.16c5.973 54.613-14.507 104.107-50.347 138.24-20.48 19.627-37.547 45.227-42.667 72.533h25.6c5.12-27.307 22.187-52.907 42.667-72.533 35.84-34.133 56.32-83.627 50.347-138.24"
          style={{ fill }}
          animatedProps={animatedProps}
          transform="translate(1 1)"
        />
        <AnimatedPath
          d="M186.733 365.933v102.4h136.533v-102.4H186.733z"
          style={{ fill }}
          animatedProps={animatedProps}
          transform="translate(1 1)"
        />
        <AnimatedPath
          d="M297.667 468.333h25.6v-102.4h-25.6v102.4z"
          style={{ fill }}
          animatedProps={animatedProps}
          transform="translate(1 1)"
        />
        <Path
          d="M186.733 468.333h25.6v-102.4h-25.6v102.4z"
          fill="#fff"
          transform="translate(1 1)"
        />
        <AnimatedPath
          d="M267.8 502.467h-25.6c-7.68 0-15.36-3.413-20.48-10.24l-17.92-23.893h102.4l-17.92 23.893c-5.12 6.826-11.947 10.24-20.48 10.24"
          style={{ fill }}
          animatedProps={animatedProps}
          transform="translate(1 1)"
        />
        <Path fill={color} d="M324.267 477.867H187.733c-5.12 0-8.533-3.413-8.533-8.533v-102.4c0-5.12 3.413-8.533 8.533-8.533h136.533c5.12 0 8.533 3.413 8.533 8.533v102.4c.001 5.119-3.412 8.533-8.532 8.533zm-128-17.067h119.467v-85.333H196.267V460.8z" />
        <Path fill={color} d="M268.8 512h-25.6c-11.093 0-20.48-5.12-27.307-13.653l-17.92-23.893c-1.707-2.56-2.56-5.973-.853-8.533s4.267-5.12 7.68-5.12h102.4c3.413 0 5.973 1.707 7.68 5.12 1.707 2.56.853 5.973-.853 8.533l-17.92 23.893C290.133 506.88 279.893 512 268.8 512zm-46.933-34.133 7.68 10.24c3.413 4.267 8.533 6.827 13.653 6.827h25.6c5.12 0 10.24-2.56 13.653-6.827l7.68-10.24h-68.266zM247.467 409.6h-59.733c-5.12 0-8.533-3.413-8.533-8.533s3.413-8.533 8.533-8.533h59.733c5.12 0 8.533 3.413 8.533 8.533s-3.413 8.533-8.533 8.533zM324.267 443.733h-59.733c-5.12 0-8.533-3.413-8.533-8.533 0-5.12 3.413-8.533 8.533-8.533h59.733c5.12 0 8.533 3.413 8.533 8.533 0 5.12-3.413 8.533-8.533 8.533zM324.267 409.6h-34.133c-5.12 0-8.533-3.413-8.533-8.533s3.413-8.533 8.533-8.533h34.133c5.12 0 8.533 3.413 8.533 8.533s-3.413 8.533-8.533 8.533zM221.867 443.733h-34.133c-5.12 0-8.533-3.413-8.533-8.533 0-5.12 3.413-8.533 8.533-8.533h34.133c5.12 0 8.533 3.413 8.533 8.533 0 5.12-3.413 8.533-8.533 8.533zM324.267 375.467H187.733c-4.267 0-7.68-2.56-8.533-6.827-5.12-23.04-18.773-46.933-40.107-67.413-39.253-37.547-58.88-91.307-52.907-145.92C94.72 75.093 159.573 10.24 239.787.853 244.907.853 250.027 0 256 0c5.973 0 11.093.853 16.213.853 80.213 8.533 145.067 73.387 153.6 154.453 5.973 54.613-13.653 107.52-52.907 145.92-21.333 20.48-35.84 44.373-40.107 67.413-.852 4.268-4.266 6.828-8.532 6.828zM194.56 358.4h122.88c6.827-24.747 22.187-48.64 43.52-69.973 35.84-34.133 52.907-81.92 47.787-131.413-7.68-72.533-66.56-130.56-139.093-139.093-4.267 0-8.533-.853-13.653-.853s-9.387.853-13.653.853c-72.533 8.533-130.56 66.56-139.093 139.093-5.12 49.493 11.947 97.28 47.787 131.413 21.331 21.333 36.691 45.226 43.518 69.973z" />
        <Path fill={color} d="M281.6 375.467c-5.12 0-8.533-3.413-8.533-8.533V230.4h-34.133v136.533c0 5.12-3.413 8.533-8.533 8.533-5.12 0-8.533-3.413-8.533-8.533V230.4H204.8c-18.773 0-34.133-15.36-34.133-34.133s15.36-34.133 34.133-34.133 34.133 15.36 34.133 34.133v17.067h34.133v-17.067c0-18.773 15.36-34.133 34.133-34.133s34.133 15.36 34.133 34.133S325.973 230.4 307.2 230.4h-17.067v136.533c0 5.12-3.413 8.534-8.533 8.534zm8.533-162.134H307.2c9.387 0 17.067-7.68 17.067-17.067S316.587 179.2 307.2 179.2s-17.067 7.68-17.067 17.067v17.066zM204.8 179.2c-9.387 0-17.067 7.68-17.067 17.067s7.68 17.067 17.067 17.067h17.067v-17.067c0-9.387-7.68-17.067-17.067-17.067z" />
      </Svg>
    </View>
  );
}
