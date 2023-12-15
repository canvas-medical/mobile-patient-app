import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Allergy } from '@interfaces';
import { useAllergies } from '@services';
import { AllergyCard, StackListView } from '@components';
import { g } from '@styles';

export default function Allergies() {
  const { data, isLoading, refetch } = useAllergies();

  return (
    <StackListView
      title="Allergies"
      icon={<MaterialCommunityIcons name="peanut-off-outline" size={g.size(36)} color={g.white} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {data?.length > 0 && data.map((allergy: Allergy) => (
        <AllergyCard
          key={allergy.id}
          allergy={allergy}
        />
      ))}
    </StackListView>
  );
}
