import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Allergy } from '@interfaces';
import { useAllergies } from '@services';
import { AllergyCard, StackListView } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  label: {
    ...g.titleXSmall,
    color: g.neutral700,
  },
  scrollSection: {
    gap: g.size(16),
  },
});

export default function Allergies() {
  const { data, isLoading, refetch } = useAllergies();
  const activeAllergies = data?.filter((allergy: Allergy) => allergy.clinicalStatus.text === 'Active');
  const inactiveAllergies = data?.filter((allergy: Allergy) => allergy.clinicalStatus.text !== 'Active');

  return (
    <StackListView
      title="Allergies"
      icon={<MaterialCommunityIcons name="peanut-off-outline" size={g.size(36)} color={g.neutral700} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {activeAllergies.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Active
          </Text>
          {activeAllergies.map((allergy: Allergy) => (
            <AllergyCard
              key={allergy.id}
              allergy={allergy}
            />
          ))}
        </View>
      )}
      {inactiveAllergies.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Inactive
          </Text>
          {inactiveAllergies.map((allergy: Allergy) => (
            <AllergyCard
              key={allergy.id}
              allergy={allergy}
            />
          ))}
        </View>
      )}
    </StackListView>
  );
}
