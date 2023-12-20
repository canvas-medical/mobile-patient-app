import { ReactNode, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { QueryObserverResult } from '@tanstack/react-query';
import MaskedView from '@react-native-masked-view/masked-view';
import { Header, Screen } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
  maskedView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: g.size(16),
    paddingHorizontal: g.size(16),
    paddingTop: g.size(40),
  },
  title: {
    ...g.titleLarge,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(16),
    paddingLeft: g.size(20),
    paddingTop: g.size(20),
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
  const tabBarHeight = useBottomTabBarHeight();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Screen>
      <Header />
      <View style={s.titleContainer}>
        {icon}
        <Text style={s.title}>
          {title}
        </Text>
      </View>
      {isLoading ? <ActivityIndicator size="large" color={g.white} style={s.loading} /> : (
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
              { paddingBottom: tabBarHeight + g.size(32) },
            ]}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={g.white}
                colors={[g.white]}
                progressViewOffset={g.size(40)}
              />
            )}
          >
            {children}
          </ScrollView>
        </MaskedView>
      )}
    </Screen>
  );
}
