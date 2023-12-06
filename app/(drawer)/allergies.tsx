import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Allergy } from '@interfaces';
import { useAllergies } from '@services';
import { ListView } from '@components';
import { g } from '@styles';

export default function Allergies() {
  const { data: allergies, isFetching } = useAllergies();
  const icon = <MaterialCommunityIcons name="peanut-off-outline" size={g.size(36)} color={g.white} />;

  return (
    <ListView icon={icon} items={allergies?.entry as Allergy[] || []} title="Allergies" isFetching={isFetching} />
  );
}
