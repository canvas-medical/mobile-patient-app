import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '@utils';
import { Invoice } from '@interfaces';
import { BlurFill } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
  },
  chevron: {
    left: g.size(8),
    bottom: g.size(4),
  },
  date: {
    ...g.bodySmall,
    color: g.white,
  },
  label: {
    flex: 1,
    ...g.labelMedium,
    color: g.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const {
    date,
    content: [{ attachment: { url } }],
    type: { coding: [{ display }] },
  } = invoice;
  return (
    <TouchableOpacity
      style={s.card}
      onPress={() => router.push({
        pathname: 'pdf-modal',
        params: { uri: url }
      })}
    >
      <BlurFill />
      <View style={s.row}>
        <Text style={s.label}>
          {display}
        </Text>
        <Feather name="chevron-right" size={g.size(28)} color={g.white} style={s.chevron} />
      </View>
      <Text style={s.date}>
        {formatDate(date)}
      </Text>
    </TouchableOpacity>
  );
}
