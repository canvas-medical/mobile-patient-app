import { g } from '@styles';
import { Goal } from '@interfaces';
import { Feather } from '@expo/vector-icons';
import { useGoals } from '@services';
import { GoalListView } from '@components';

export default function Goals() {
  const { data: goals, isFetching } = useGoals();
  const icon = <Feather name="target" size={g.size(36)} color={g.white} />;

  return (
    <GoalListView icon={icon} items={goals?.entry as Goal[] || []} title="Goals" isFetching={isFetching} />
  );
}
