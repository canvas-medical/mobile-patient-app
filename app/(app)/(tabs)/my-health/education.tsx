import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DocumentResource } from '@interfaces';
import { useEducationalMaterials } from '@services';
import { EducationalMaterialCard, StackListView } from '@components';
import { g } from '@styles';

export default function Education() {
  const { data, isLoading, refetch } = useEducationalMaterials();

  return (
    <StackListView
      title="Education"
      icon={<MaterialCommunityIcons name="book-open-page-variant-outline" size={g.size(36)} color={g.neutral700} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {data?.length > 0 && data?.map((item: DocumentResource) => (
        <EducationalMaterialCard
          key={item.id}
          data={item}
        />
      ))}
    </StackListView>
  );
}
