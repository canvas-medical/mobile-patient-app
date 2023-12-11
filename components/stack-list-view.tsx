import { ReactNode } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Header, Screen } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
  maskedView: {
    flex: 1,
  },
  scrollContentContainer: {
    gap: g.size(24),
    paddingHorizontal: g.size(16),
    paddingTop: g.size(40),
    paddingBottom: g.size(36),
  },
  title: {
    ...g.titleLarge,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(16),
    paddingLeft: g.size(20),
  },
});

export function StackListView({
  icon,
  title,
  isFetching,
  children,
}: {
  icon: ReactNode,
  title: string,
  isFetching: boolean,
  children: ReactNode,
}) {
  return (
    <Screen>
      <Header />
      <View style={s.titleContainer}>
        {icon}
        <Text style={s.title}>
          {title}
        </Text>
      </View>
      {isFetching ? <ActivityIndicator size="large" color={g.white} style={s.loading} /> : (
        <MaskedView
          style={s.maskedView}
          maskElement={(
            <LinearGradient
              style={s.gradient}
              colors={[g.transparent, g.white]}
              locations={[0.02, 0.075]}
            />
          )}
        >
          <ScrollView contentContainerStyle={s.scrollContentContainer}>
            {children}
          </ScrollView>
        </MaskedView>
      )}
    </Screen>
  );
}
