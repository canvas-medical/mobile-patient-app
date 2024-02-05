import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '@utils';
import { DocumentResource } from '@interfaces';
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
    alignSelf: 'flex-end',
  },
  displayText: {
    flex: 1,
    ...g.labelMedium,
    color: g.neutral900,
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
    <CardContainer
      onPress={() => {
        if (url) {
          router.push({
            pathname: 'pdf-modal',
            params: { uri: url }
          });
        } else Alert.alert('There is no viewable data for this report.');
      }}
    >
      <View style={s.row}>
        <Text
          style={s.displayText}
          numberOfLines={2}
        >
          {display}
        </Text>
        {data
          ? !!url && <Feather name="chevron-right" size={g.ms(28)} color={g.neutral700} style={s.chevron} />
          : <ActivityIndicator color={g.primaryBlue} size="small" />}
      </View>
      <Text style={s.date}>
        {formatDate(date)}
      </Text>
    </CardContainer>
  );
}
