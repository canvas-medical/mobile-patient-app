// ReasonForVisit.tsx
import { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import { Button, BlurFill } from '@components';
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
    paddingVertical: g.size(8),
    paddingHorizontal: g.size(16),
    borderRadius: g.size(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalToggleButtonLabel: {
    ...g.bodyLarge,
    color: g.black,
  },
  modalToggleButtonPlaceholder: {
    color: g.neutral400,
  },
  sectionContainer: {
    gap: g.size(12),
  },
  sectionHeader: {
    ...g.labelMedium,
    color: g.black,
    marginLeft: g.size(4),
  },
});

interface ReasonForVisitProps {
  reasonsForDoctorVisit: { reasonLabel: string, appointmentDuration: number }[];
  appointmentReason: string;
  setAppointmentReason: (reason: string) => void;
  setAppointmentDuration: (duration: number) => void;
}

export function SelectReasonForVisit({
  reasonsForDoctorVisit,
  appointmentReason,
  setAppointmentReason,
  setAppointmentDuration
}: ReasonForVisitProps) {
  const [showReasonPicker, setShowReasonPicker] = useState<boolean>(false);
  const [provisionalReason, setProvisionalReason] = useState<string>('');

  return (
    <View style={s.sectionContainer}>
      <Text style={s.sectionHeader}>
        Reason for Visit
      </Text>
      <>
        <TouchableOpacity
          style={s.modalToggleButton}
          onPress={() => setShowReasonPicker(true)}
        >
          <BlurFill />
          <Text
            style={[
              s.modalToggleButtonLabel,
              !appointmentReason && s.modalToggleButtonPlaceholder,
            ]}
          >
            {appointmentReason || 'Select'}
          </Text>
          <Feather name="chevron-down" size={g.size(20)} color={g.black} />
        </TouchableOpacity>
        <View style={s.modalContainer}>
          <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={showReasonPicker}
            swipeDirection="right"
            onSwipeComplete={() => setShowReasonPicker(false)}
            customBackdrop={(
              <TouchableWithoutFeedback onPress={() => setShowReasonPicker(false)}>
                <View style={s.backdrop} />
              </TouchableWithoutFeedback>
            )}
          >
            <View style={s.modal}>
              <Picker
                selectedValue={provisionalReason}
                onValueChange={(itemValue) => setProvisionalReason(itemValue)}
              >
                {reasonsForDoctorVisit.map((item: { reasonLabel: string }) => (
                  <Picker.Item
                    key={item.reasonLabel}
                    label={item.reasonLabel}
                    value={item.reasonLabel}
                  />
                ))}
              </Picker>
              <Button
                label="Select Reason"
                theme="primary"
                onPress={() => {
                  setShowReasonPicker(false);
                  if (reasonsForDoctorVisit.find((item) => item.reasonLabel === provisionalReason)?.appointmentDuration) {
                    setAppointmentReason(provisionalReason);
                    setAppointmentDuration(reasonsForDoctorVisit.find((item) => item.reasonLabel === provisionalReason)?.appointmentDuration);
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
