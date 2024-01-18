import { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import graphic from '@assets/images/graphic.png';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: g.tertiaryBlue,
  },
  graphic: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: g.width * 0.66,
    aspectRatio: 1,
  },
  greeting: {
    ...g.labelXLarge,
    color: g.neutral900,
  },
  header: {
    gap: g.size(16),
    padding: g.size(36),
    paddingTop: g.size(72),
    alignItems: 'flex-start',
  },
  scroll: {
    flex: 1,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
  },
  scrollContent: {
    flexGrow: 1,
    padding: g.size(36),
    justifyContent: 'space-between',
    gap: g.size(36),
  },
  subGreeting: {
    ...g.bodyMedium,
    color: g.neutral400,
    marginTop: g.size(2),
  },
  title: {
    ...g.titleLarge,
    color: g.white,
  },
});

export function OnboardingScreen({
  title,
  subGreeting,
  scrollEnabled = true,
  children,
}: {
  title: string,
  subGreeting: string,
  scrollEnabled?: boolean,
  children: ReactNode,
}) {
  return (
    <View style={s.container}>
      <Image
        style={s.graphic}
        source={graphic}
        contentFit="fill"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather
              name="arrow-left"
              size={g.size(40)}
              color={g.white}
            />
          </TouchableOpacity>
          <Text style={s.title}>
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        style={s.scroll}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          scrollEnabled={scrollEnabled}
        >
          <View>
            <Text style={s.greeting}>
              Welcome
            </Text>
            <Text style={s.subGreeting}>
              {subGreeting}
            </Text>
          </View>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
