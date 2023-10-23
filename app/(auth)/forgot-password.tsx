import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
  },
  header: {
    padding: g.size(36),
    paddingTop: g.size(72),
  },
  title: {
    ...g.titleLarge,
    marginTop: g.size(16),
  },
});

export default function ForgotPassword() {
  return (
    <Screen>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather
            name="arrow-left"
            size={g.size(36)}
            color={g.white}
          />
        </TouchableOpacity>
        <Text style={s.title}>
          Reset Password
        </Text>
      </View>
      <View style={s.formContainer} />
    </Screen>
  );
}
