import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { BlurFill } from '@components';
import { Invoice } from '@interfaces';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    padding: g.size(12),
    paddingRight: g.size(8),
  },
  date: {
    ...g.labelSmall,
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
        pathname: '../pdf-modal',
        params: { uri: url }
      })}
    >
      <BlurFill />
      <View style={s.row}>
        <Text style={s.label}>
          {display}
        </Text>
        <Feather name="chevron-right" size={g.size(28)} color={g.white} />
      </View>
      <Text style={s.date}>
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </Text>

    </TouchableOpacity>
  );
}
