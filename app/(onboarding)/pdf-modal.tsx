import {
  Modal, StyleSheet, TouchableOpacity, View
} from 'react-native';
import { g } from '@styles';
import Pdf from 'react-native-pdf';
import { Button } from '@components/button';
import { Feather } from '@expo/vector-icons';

const s = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: 300,
  },
  close: {
    position: 'absolute',
    top: g.size(36),
    right: g.size(36),
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
    justifyContent: 'center',
    alignItems: 'center',
    width: g.width,
    gap: g.size(48),
  },
  pdf: {
    height: '100%',
    width: '100%',
    paddingBottom: 100,
    backgroundColor: g.white,
  }
});
export function PdfModal(
  { uri, modalVisible, onAccept, setModalVisible }:
  { uri: string, modalVisible: boolean, onAccept: () => void, setModalVisible: (visible: boolean) => void }
) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={s.close}
      >
        <Feather
          name="x"
          size={g.size(24)}
          color={g.neutral500}
        />
      </TouchableOpacity>
      <View style={s.contentContainer}>
        <Pdf
          source={{ uri }}
          style={s.pdf}
        />
        <View style={s.buttonContainer}>
          <Button
            theme="primary"
            onPress={onAccept}
            label="Accept and Continue"
          />
        </View>
      </View>
    </View>
  );
}
