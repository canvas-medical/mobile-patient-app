import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Entypo } from '@expo/vector-icons';
import { g } from '@styles';
import { router } from 'expo-router';
import { DocumentResource } from '@interfaces';

const s = StyleSheet.create({
  blurContainer: {
    width: g.width - g.size(32),
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  invoiceBlur: {
    flex: 1,
    padding: g.size(12),
    gap: g.size(8),
  },
  invoiceData: {
    ...g.labelMedium,
    color: g.white,
  },
  invoiceDate: {
    ...g.labelSmall,
    color: g.white,
  },
  invoiceLabel: {
    flex: 1,
    ...g.labelMedium,
    color: g.white,
  },
  invoiceRow: {
    flexDirection: 'row',
    gap: g.size(8),
    justifyContent: 'space-between',
  },
});

export function ClickableCard({ resource, uri }: {
  resource: DocumentResource, // TODO: add types as this card is used for more resources
  uri: string,
}) {
  return (
    <TouchableOpacity
      style={s.blurContainer}
      onPress={() => router.push({ pathname: 'pdf-modal', params: { uri, noActionOnClose: true } })}
    >
      <BlurView
        style={s.invoiceBlur}
        tint="light"
        intensity={50}
      >
        <View style={s.invoiceRow}>
          <Text style={s.invoiceLabel}>
            Text
          </Text>
          <Entypo name="chevron-thin-right" size={20} color={g.white} />
        </View>
        <View style={s.invoiceRow}>
          <Text style={s.invoiceDate}>
            <Text style={s.invoiceDate}>
              {new Date().toLocaleDateString('en-US', {
                year: '2-digit',
                month: 'short',
                day: 'numeric'
              })}
            </Text>
          </Text>
          <Text style={s.invoiceData}>
            Text
          </Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}
