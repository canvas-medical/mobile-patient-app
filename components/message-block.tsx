import { View, Text, StyleSheet } from 'react-native';
import { g } from '@styles';

const s = StyleSheet.create({
  leftArrow: {
    position: 'absolute',
    borderWidth: g.size(10),
    borderColor: 'transparent',
    borderTopColor: g.primaryBlue,
    borderLeftColor: g.primaryBlue,
    bottom: -15,
    left: -0
  },
  message: {
    backgroundColor: g.neutral100,
    padding: g.size(15),
    borderRadius: g.size(10),
    borderBottomRightRadius: 0,
    maxWidth: '90%',
    marginTop: g.size(5),
    alignSelf: 'flex-end',
  },
  messageReceived: {
    color: g.white,
    maxWidth: '90%',
    backgroundColor: g.primaryBlue,
    borderBottomLeftRadius: 0,
    padding: g.size(15),
    borderRadius: g.size(10),
    marginTop: g.size(5),
    alignSelf: 'flex-start',
  },
  messageReceivedText: {
    ...g.bodyMedium,
    color: g.white,
  },
  messageText: {
    ...g.bodyMedium,
    color: g.black,
  },
  rightArrow: {
    position: 'absolute',
    borderWidth: g.size(10),
    borderColor: 'transparent',
    borderTopColor: g.neutral100,
    borderRightColor: g.neutral100,
    bottom: -15,
    right: 0
  },
});
export function MessageBlock({ received }:{received: boolean}) {
  return (
    <>
      {received ? (
        <View style={s.message}>
          <Text style={s.messageText}>    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          <View style={s.rightArrow} />
        </View>
      ) : (
        <View style={s.messageReceived}>
          <Text style={s.messageReceivedText}>    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          <View style={s.leftArrow} />
        </View>
      )}
    </>
  );
}
