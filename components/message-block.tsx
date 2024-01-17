import { View, Text, StyleSheet } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { g } from '@styles';

const s = StyleSheet.create({
  leftArrow: {
    position: 'absolute',
    borderWidth: g.size(10),
    borderColor: g.transparent,
    borderTopColor: g.secondaryBlue,
    borderLeftColor: g.secondaryBlue,
    bottom: g.size(-15),
    left: 0
  },
  message: {
    backgroundColor: g.neutral200,
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
    backgroundColor: g.secondaryBlue,
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
    color: g.neutral900,
  },
  rightArrow: {
    position: 'absolute',
    borderWidth: g.size(10),
    borderColor: g.transparent,
    borderTopColor: g.neutral200,
    borderRightColor: g.neutral200,
    bottom: g.size(-15),
    right: 0
  },
});
export function MessageBlock({ received, message }: { received: boolean, message: string }) {
  return (
    <>
      {received ? (
        <View style={s.messageReceived}>
          <RenderHtml
            baseStyle={s.messageReceivedText}
            source={{ html: message }}
            tagsStyles={{ p: { padding: 0, margin: 0, } }}
          />
          <View style={s.leftArrow} />
        </View>
      ) : (
        <View style={s.message}>
          <Text style={s.messageText}>{message.replaceAll('<br>', '\n')}</Text>
          <View style={s.rightArrow} />
        </View>
      )}
    </>
  );
}
