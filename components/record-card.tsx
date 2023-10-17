import { StyleSheet, View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { MedicalRecord } from '@interfaces';
import { BlurView } from '@ui';
import { g } from '@styles';

const s = StyleSheet.create({
  baseInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: g.size(4),
    overflow: 'hidden',
  },
  card: {
    paddingVertical: g.size(16),
    paddingHorizontal: g.size(20),
    gap: g.size(12),
    borderRadius: g.size(8),
  },
  costAndDate: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  cube: {
    width: g.size(70),
    height: g.size(70),
    backgroundColor: g.white,
    borderRadius: g.size(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    flexDirection: 'row',
    gap: g.size(12),
  },
  physician: {
    ...g.bodyMedium,
    color: g.white,
  },
  price: {
    ...g.bodySmall,
    color: g.secondaryBlue,
  },
  pricePill: {
    backgroundColor: g.white,
    paddingVertical: g.size(2),
    paddingHorizontal: g.size(8),
    borderRadius: g.size(50),
  },
  procedure: {
    ...g.bodyLarge,
    color: g.white,
  },
  summary: {
    ...g.bodySmall,
    color: g.white,
  },
});

interface Props {
  rec: MedicalRecord,
  index: number,
}

export function RecordCard(props: Props) {
  const {
    index,
    rec: {
      type,
      procedure,
      physician,
      insurance_provider: insuranceProvider,
      cost,
      date,
      summary,
    }
  } = props;

  const iconSwitch = () => {
    switch (type) {
      case 'Vision':
        return <Ionicons name="glasses" size={48} color={g.blurBlue} />;
      case 'Dental':
        return <MaterialCommunityIcons name="tooth" size={48} color={g.blurBlue} />;
      case 'Medical':
        return <FontAwesome5 name="briefcase-medical" size={48} color={g.blurBlue} />;
      default:
        return <FontAwesome5 name="briefcase-medical" size={48} color={g.blurBlue} />;
    }
  };

  return (
    <BlurView intensity={40} style={s.card}>
      <View style={s.dataContainer}>
        <View style={s.cube}>
          {iconSwitch()}
        </View>
        <View style={s.baseInfo}>
          <Text
            style={s.procedure}
            numberOfLines={1}
          >
            {procedure}
          </Text>
          <Text
            style={s.physician}
            numberOfLines={1}
          >
            {physician}
          </Text>
          <Text
            style={s.summary}
            numberOfLines={1}
          >
            {insuranceProvider}
          </Text>
        </View>
        <View style={s.costAndDate}>
          <View style={s.pricePill}>
            <Text style={s.price}>
              $
              {cost}
            </Text>
          </View>
          <Text style={s.physician}>
            {date}
          </Text>
        </View>
      </View>
      {index === 0 && (
        <Text
          style={s.summary}
          numberOfLines={4}
        >
          {summary}
        </Text>
      )}
    </BlurView>
  );
}
