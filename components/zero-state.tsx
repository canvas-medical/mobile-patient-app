import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 650,
    alignSelf: 'center',
  },
  image: {
    width: '80%',
  },
  text: {
    ...g.bodyLarge,
    color: g.neutral700,
    textAlign: 'center',
    maxWidth: g.width * 0.8,
    marginTop: g.hs(16),
    lineHeight: g.ms(24),
  },
});

export function ZeroState({
  image,
  text,
  textColor,
  imageAspectRatio,
  marginBottom = g.hs(120),
}: {
  image: any;
  text: string;
  textColor?: string;
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
      <Text style={[s.text, { color: textColor }]}>
        {text}
      </Text>
    </View>
  );
}
