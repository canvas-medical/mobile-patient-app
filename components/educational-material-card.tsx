import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '@utils';
import { DocumentResource } from '@interfaces';
import { BlurFill } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
    gap: g.size(4),
  },
  chevron: {
    left: g.size(8),
    bottom: g.size(4),
  },
  date: {
    ...g.bodySmall,
    color: g.black,
    alignSelf: 'flex-end',
  },
  displayText: {
    flex: 1,
    ...g.labelMedium,
    color: g.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export function EducationalMaterialCard({ data }: { data: DocumentResource }) {
  const {
    date = '',
    type: { coding: [{ display = '' } = {}] = [] } = {},
    content: [{
      attachment: { url = '' } = {},
    } = {}] = []
  } = data ?? {};

  return (
    <TouchableOpacity
      style={s.card}
      onPress={() => {
        if (url) {
          router.push({
            pathname: 'pdf-modal',
            params: { uri: url }
          });
        } else Alert.alert('There is no viewable data for this report.');
      }}
    >
      <BlurFill />
      <View style={s.row}>
        <Text
          style={s.displayText}
          numberOfLines={2}
        >
          {display}
        </Text>
        {data
          ? !!url && <Feather name="chevron-right" size={g.size(28)} color={g.black} style={s.chevron} />
          : <ActivityIndicator color={g.primaryBlue} />}
      </View>
      <Text style={s.date}>
        {formatDate(date)}
      </Text>
    </TouchableOpacity>
  );
}

export function LabReportSkeleton() {
  return (
    <View style={s.card}>
      <BlurFill />
    </View>
  );
}
