import { View, Text, StyleSheet } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { g } from '@styles';
import { formatDate, formatTime } from '@utils';

const s = StyleSheet.create({
  leftArrow: {
    position: 'absolute',
    borderWidth: g.hs(10),
    borderColor: g.transparent,
    borderTopColor: g.secondaryBlue,
    borderLeftColor: g.secondaryBlue,
    bottom: g.ms(-16),
    left: 0
  },
  message: {
    backgroundColor: g.neutral200,
    padding: g.ms(15),
    borderRadius: g.ms(10),
    borderBottomRightRadius: 0,
    maxWidth: '90%',
    marginTop: g.hs(5),
    alignSelf: 'flex-end',
  },
  messageReceived: {
    color: g.white,
    maxWidth: '90%',
    backgroundColor: g.secondaryBlue,
    borderBottomLeftRadius: 0,
    padding: g.ms(15),
    borderRadius: g.ms(10),
    marginTop: g.hs(5),
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
    borderWidth: g.ms(10),
    borderColor: g.transparent,
    borderTopColor: g.neutral200,
    borderRightColor: g.neutral200,
    bottom: g.ms(-16),
    right: 0
  },
  sentTime: {
    ...g.bodySmall,
    color: g.neutral500,
    textAlign: 'center',
    marginTop: g.hs(8),
  }
});

export function MessageBlock({ received, message, sentTime }: { received: boolean, message: string, sentTime?: string }) {
  return (
    <>
      <Text style={s.sentTime}>
        {sentTime ? `${formatDate(sentTime)} ${formatTime(sentTime, true, true)}` : ''}
      </Text>
      {received ? (
        <View style={s.messageReceived}>
          <RenderHtml
            baseStyle={s.messageReceivedText}
            source={{ html: message }}
            tagsStyles={{ p: { padding: 0, margin: 0, } }}
            contentWidth={(g.width - g.ws(40)) * 0.9}
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
