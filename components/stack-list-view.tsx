import { ReactNode, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QueryObserverResult } from '@tanstack/react-query';
import MaskedView from '@react-native-masked-view/masked-view';
import { Header } from '@components/header';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: g.neutral100,
  },
  loading: {
    flex: 1,
    paddingBottom: g.hs(120),
  },
  maskedView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: g.hs(16),
    paddingHorizontal: g.ws(16),
    paddingTop: g.hs(40),
  },
  title: {
    ...g.titleLarge,
    color: g.neutral700,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.ms(12),
    paddingLeft: g.ws(16),
    marginTop: g.hs(20),
  },
});

export function StackListView({
  icon,
  title,
  isLoading,
  refetch,
  scrollEnabled = true,
  children,
}: {
  icon: ReactNode,
  title: string,
  isLoading: boolean,
  refetch: () => Promise<QueryObserverResult<any, Error>>,
  scrollEnabled?: boolean,
  children: ReactNode,
}) {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View style={s.container}>
      <Header />
      <View style={s.titleContainer}>
        {icon}
        <Text style={s.title}>
          {title}
        </Text>
      </View>
      {isLoading
        ? <ActivityIndicator size="large" color={g.primaryBlue} style={s.loading} />
        : (
          <MaskedView
            style={s.maskedView}
            maskElement={(
              <LinearGradient
                style={s.maskedView}
                colors={[g.transparent, g.white]}
                locations={[0.0175, 0.065]}
              />
            )}
          >
            <ScrollView
              scrollEnabled={scrollEnabled}
              contentContainerStyle={[
                s.scrollContent,
                { paddingBottom: g.tabBarHeight + g.hs(120) }
              ]}
              refreshControl={(
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={g.primaryBlue}
                  colors={[g.primaryBlue]}
                  progressViewOffset={g.hs(32)}
                />
              )}
            >
              {children}
            </ScrollView>
          </MaskedView>
        )}
    </View>
  );
}
