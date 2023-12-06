import { g } from '@styles';
import { Goal } from '@interfaces';
import { Fontisto } from '@expo/vector-icons';
import { useGoals } from '@services';
import { GoalListView } from '@components';

export default function Goals() {
  const { data: goals, isFetching } = useGoals();
  const icon = <Fontisto name="injection-syringe" size={g.size(36)} color={g.white} />;

  return (
    <GoalListView icon={icon} items={goals?.entry as Goal[] || []} title="Goals" isFetching={isFetching} />
  );
}
