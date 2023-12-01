import { ListView } from '@components';
import { g } from '@styles';
import { Immunization } from '@interfaces';
import { Fontisto } from '@expo/vector-icons';
import { useImmunizations } from '@services';

export default function Immunizations() {
  const { data: immunizations, isFetching } = useImmunizations();
  const icon = <Fontisto name="injection-syringe" size={g.size(36)} color={g.white} />;

  return (
    <ListView icon={icon} items={immunizations?.entry as Immunization[] || []} title="Immunizations" isFetching={isFetching} />
  );
}
