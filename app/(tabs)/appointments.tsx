import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppointments } from '@services';
import { Appointment } from '@interfaces';
import { AppointmentCard, StackListView } from '@components';
import { g } from '@styles';

export default function Appointments() {
  const { data, isLoading, refetch } = useAppointments();
  return (
    <StackListView
      title="Appointments"
      icon={<MaterialCommunityIcons name="calendar-heart" size={g.size(36)} color={g.white} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {data?.length > 0 && data.map((appointment: Appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
        />
      ))}
    </StackListView>
  );
}
