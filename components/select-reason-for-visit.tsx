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
import { Button } from '@components/button';
import { g } from '@styles';

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: g.black,
    opacity: 0.5,
  },
  modal: {
    paddingHorizontal: g.ws(8),
    paddingBottom: g.hs(12),
    backgroundColor: g.white,
    width: '85%',
    maxWidth: 375,
    borderRadius: g.ms(16),
    gap: g.hs(4),
    alignSelf: 'center',
  },
  modalContainer: {
    marginTop: -g.hs(12),
  },
  modalToggleButton: {
    backgroundColor: g.neutral150,
    paddingVertical: g.hs(8),
    paddingHorizontal: g.ms(16),
    borderRadius: g.ms(50),
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
  pickerItem: {
    ...g.bodyLarge,
    color: g.neutral900,
  },
  sectionContainer: {
    gap: g.hs(12),
  },
  sectionHeader: {
    ...g.labelMedium,
    color: g.neutral700,
    marginLeft: g.ms(4),
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
          <Text
            style={[
              s.modalToggleButtonLabel,
              !appointmentReason && s.modalToggleButtonPlaceholder,
            ]}
          >
            {appointmentReason || 'Select'}
          </Text>
          <Feather name="chevron-down" size={g.ms(20)} color={g.neutral700} />
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
                itemStyle={s.pickerItem}
                selectedValue={provisionalReason}
                onValueChange={(itemValue) => {
                  if (itemValue !== 'Select One') setProvisionalReason(itemValue);
                }}
              >
                {reasonsForDoctorVisit?.map((item: { reasonLabel: string }) => (
                  <Picker.Item
                    key={item?.reasonLabel}
                    label={item?.reasonLabel}
                    value={item?.reasonLabel}
                  />
                ))}
              </Picker>
              <Button
                label="Select"
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
