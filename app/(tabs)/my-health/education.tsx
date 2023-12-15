import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { EducationalMaterial } from '@interfaces';
import { useEducationalMaterials } from '@services';
// import { StackListView, EducationalMaterialCard } from '@components';
import { StackListView } from '@components';
import { g } from '@styles';

export default function Education() {
  const { data, isLoading, refetch } = useEducationalMaterials();

  console.log('Hello: ', data);

  return (
    <StackListView
      title="Education"
      icon={<MaterialCommunityIcons name="book-open-page-variant-outline" size={g.size(36)} color={g.white} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      <Text>Educational Materials</Text>
      {/* {data?.length > 0 && data.map((item: any) => ( // TODO: update type
        <EducationalMaterialCard
          key={item.id}
          data={item}
        />
      ))} */}
    </StackListView>
  );
}
