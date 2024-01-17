import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { g } from '@styles';

const s = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    borderTopLeftRadius: g.size(40),
    borderTopRightRadius: g.size(40),
    overflow: 'hidden',
    paddingTop: g.size(8),
    paddingBottom: g.size(20),
    paddingHorizontal: g.size(10),
    backgroundColor: g.white,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowOffset: {
      width: 0,
      height: g.size(-2),
    },
    shadowOpacity: 0.25,
    shadowRadius: g.size(4),
  },
  tabButton: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: g.size(50),
    paddingVertical: g.size(8),
    marginHorizontal: g.size(1),
  },
  tabLabel: {
    ...g.labelXSmall,
  },
});

export function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={s.container}>
      <View style={[s.buttonContainer, Platform.OS === 'android' && { paddingBottom: g.size(0) }]}>
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
    </View>
  );
}
