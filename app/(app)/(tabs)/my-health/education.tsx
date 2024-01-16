import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { EducationalMaterial } from '@interfaces';
import { useEducationalMaterials } from '@services';
// import { StackListView, EducationalMaterialCard } from '@components';
import { EducationalMaterialCard, StackListView } from '@components';
import { g } from '@styles';

export default function Education() {
  const { data, isLoading, refetch } = useEducationalMaterials();

  // TODO: update with education components and data

  return (
    <StackListView
      title="Education"
      icon={<MaterialCommunityIcons name="book-open-page-variant-outline" size={g.size(36)} color={g.black} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      <Text>Educational Materials</Text>
      {data?.length > 0 && data.map((item: any) => ( // TODO: update type
        <EducationalMaterialCard
          key={item.id}
          data={item}
        />
      ))}
    </StackListView>
  );
}
