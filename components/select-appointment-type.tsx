// AppointmentType.tsx
import { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import { Button } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: g.black,
    opacity: 0.5,
  },
  modal: {
    paddingHorizontal: g.size(8),
    paddingBottom: g.size(12),
    backgroundColor: g.white,
    borderRadius: g.size(16),
    gap: g.size(4),
  },
  modalContainer: {
    marginTop: -g.size(12),
  },
  modalToggleButton: {
    backgroundColor: g.neutral150,
    paddingVertical: g.size(8),
    paddingHorizontal: g.size(16),
    borderRadius: g.size(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalToggleButtonLabel: {
    ...g.bodyLarge,
    color: g.neutral900,
  },
  modalToggleButtonPlaceholder: {
    color: g.neutral400,
  },
  sectionContainer: {
    gap: g.size(12),
  },
  sectionHeader: {
    ...g.labelMedium,
    color: g.neutral700,
    marginLeft: g.size(4),
  },
});

interface AppointmentTypeProps {
  appointmentType: string;
  setAppointmentType: (type: string) => void;
  setAppointmentTypeCode: (code: string) => void;
}

const appointmentTypes = [
  { appointmentTypeLabel: 'Select One', appointmentTypeCode: '0' },
  { appointmentTypeLabel: 'Office Visit', appointmentTypeCode: '308335008' },
  { appointmentTypeLabel: 'Video Call', appointmentTypeCode: '448337001' },
  { appointmentTypeLabel: 'Phone Call', appointmentTypeCode: '185317003' },
  { appointmentTypeLabel: 'Home Visit', appointmentTypeCode: '439708006' },
  // Patients can not book these types, they are provider only
  // { appointmentTypeLabel: 'Lab Visit', appointmentTypeCode: '31108002' },
  // { appointmentTypeLabel: 'Inpatient', appointmentTypeCode: '53923005' },
];

export function SelectAppointmentType({ appointmentType, setAppointmentType, setAppointmentTypeCode }: AppointmentTypeProps) {
  const [showAppointmentTypePicker, setShowAppointmentTypePicker] = useState<boolean>(false);
  const [provisionalAppointmentType, setProvisionalAppointmentType] = useState<string>('');

  return (
    <View style={s.sectionContainer}>
      <Text style={s.sectionHeader}>
        Appointment Type
      </Text>
      <>
        <TouchableOpacity
          style={s.modalToggleButton}
          onPress={() => setShowAppointmentTypePicker(true)}
        >
          <Text
            style={[
              s.modalToggleButtonLabel,
              !appointmentType && s.modalToggleButtonPlaceholder,
            ]}
          >
            {appointmentType || 'Select'}
          </Text>
          <Feather name="chevron-down" size={g.size(20)} color={g.neutral700} />
        </TouchableOpacity>
        <View style={s.modalContainer}>
          <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={showAppointmentTypePicker}
            swipeDirection="right"
            onSwipeComplete={() => setShowAppointmentTypePicker(false)}
            customBackdrop={(
              <TouchableWithoutFeedback onPress={() => setShowAppointmentTypePicker(false)}>
                <View style={s.backdrop} />
              </TouchableWithoutFeedback>
            )}
          >
            <View style={s.modal}>
              <Picker
                selectedValue={provisionalAppointmentType}
                onValueChange={(itemValue) => {
                  if (itemValue !== 'Select One') setProvisionalAppointmentType(itemValue);
                }}
              >
                {appointmentTypes.map((item: { appointmentTypeLabel: string }) => (
                  <Picker.Item
                    key={item.appointmentTypeLabel}
                    label={item.appointmentTypeLabel}
                    value={item.appointmentTypeLabel}
                  />
                ))}
              </Picker>
              <Button
                label="Select Appointment Type"
                theme="primary"
                onPress={() => {
                  setShowAppointmentTypePicker(false);
                  if (appointmentTypes.find((item) => item.appointmentTypeLabel === provisionalAppointmentType)?.appointmentTypeCode) {
                    setAppointmentType(provisionalAppointmentType);
                    setAppointmentTypeCode(appointmentTypes.find((item) => (
                      item.appointmentTypeLabel === provisionalAppointmentType
                    ))?.appointmentTypeCode);
                  }
                }}
              />
            </View>
          </Modal>
        </View>
      </>
    </View>
  );
}
