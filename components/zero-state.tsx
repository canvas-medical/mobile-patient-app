import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: g.width * 0.8,
  },
  text: {
    ...g.bodyLarge,
    color: g.white,
    textAlign: 'center',
    maxWidth: g.width * 0.8,
    marginTop: g.size(16),
    lineHeight: g.size(24),
  },
});

export function ZeroState({
  image,
  text,
  imageAspectRatio,
  marginBottom = g.size(120),
}: {
  image: any;
  text: string;
  imageAspectRatio: number;
  marginBottom?: number;
}) {
  return (
    <View
      style={[
        s.container,
        { marginBottom },
      ]}
    >
      <Image
        source={image}
        contentFit="contain"
        style={[
          s.image,
          { aspectRatio: imageAspectRatio }
        ]}
        priority="high"
      />
      <Text style={s.text}>
        {text}
      </Text>
    </View>
  );
}
