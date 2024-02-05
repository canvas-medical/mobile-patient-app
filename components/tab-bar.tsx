import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: g.ws(40),
    borderTopRightRadius: g.ws(40),
    paddingTop: g.hs(8),
    paddingBottom: Platform.OS === 'android' ? g.hs(8) : g.hs(20),
    paddingHorizontal: g.ws(10),
    backgroundColor: g.white,
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowOffset: {
      width: 0,
      height: g.ms(-2),
    },
    shadowOpacity: 0.25,
    shadowRadius: g.ms(4),
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: g.ms(100),
    paddingVertical: g.hs(8),
    marginHorizontal: g.ws(1),
    maxWidth: 180,
  },
  tabLabel: {
    ...g.labelXSmall,
  },
});

export function TabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={s.container}
      onLayout={(e) => {
        g.tabBarHeight = e.nativeEvent.layout.height;
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <TouchableOpacity
            key={route.key}
            style={[
              s.tabButton,
              { backgroundColor: isFocused ? g.secondaryBlue : g.transparent },
            ]}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={route.key}
            onPress={onPress}
          >
            {options.tabBarIcon({ color: isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor })}
            <Text
              style={[
                s.tabLabel,
                { color: isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor }
              ]}
            >
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
