import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '@utils';
import { Invoice } from '@interfaces';
import { CardContainer } from '@components/card-container';
import { g } from '@styles';

const s = StyleSheet.create({
  chevron: {
    left: g.ms(8),
    bottom: g.ms(4),
  },
  date: {
    ...g.bodySmall,
    color: g.neutral600,
  },
  label: {
    flex: 1,
    ...g.labelMedium,
    color: g.neutral900,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const {
    date = '',
    content: [{ attachment: { url = '' } = {} } = {}] = [],
    type: { coding: [{ display = '' } = {}] = [] } = {},
  } = invoice ?? {};

  return (
    <CardContainer
      onPress={() => router.push({
        pathname: 'pdf-modal',
        params: { uri: url }
      })}
    >
      <View style={s.row}>
        <Text style={s.label}>
          {display}
        </Text>
        <Feather name="chevron-right" size={g.ms(28)} color={g.neutral700} style={s.chevron} />
      </View>
      <Text style={s.date}>
        {formatDate(date)}
      </Text>
    </CardContainer>
  );
}
