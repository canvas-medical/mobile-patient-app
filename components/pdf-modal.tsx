import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { g } from '@styles';
import Pdf from 'react-native-pdf';
import { useEffect, useState } from 'react';
import { Button } from '@components/button';

const s = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: 300,
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
  },
});
export function PdfModal({ uri, modalVisible, setModalVisible }: {uri: string, modalVisible: boolean, setModalVisible: (visible: boolean) => void}) {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={s.contentContainer}>
        <Pdf
          source={{ uri }}
          style={s.pdf}
        />
        <View style={s.buttonContainer}>
          <Button
            theme="primary"
            onPress={() => setModalVisible(!modalVisible)}
            label="Accept and Continue"
          />
        </View>
      </View>
    </Modal>
  );
}
