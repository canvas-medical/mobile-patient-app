import { Fontisto } from '@expo/vector-icons';
import { useImmunizations } from '@services';
import { Immunization } from '@interfaces';
import { ImmunizationCard, StackListView } from '@components';
import { g } from '@styles';

export default function Immunizations() {
  const { data, isLoading, refetch } = useImmunizations();
  return (
    <StackListView
      title="Immunizations"
      icon={<Fontisto name="injection-syringe" size={g.size(36)} color={g.neutral800} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {data?.length > 0 && data?.map((immunization: Immunization) => (
        <ImmunizationCard
          key={immunization.id}
          immunization={immunization}
        />
      ))}
    </StackListView>
  );
}
