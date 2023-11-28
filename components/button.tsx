import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { g } from '@styles';

const s = StyleSheet.create({
  button: {
    borderRadius: g.size(40),
    display: 'flex',
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    paddingVertical: g.size(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...g.labelLarge,
  },
  primaryLabel: {
    color: g.white,
  },
  secondaryLabel: {
    color: g.secondaryBlue,
  },
  tertiary: {
    borderWidth: 1,
    borderColor: g.white,
  },
  tertiaryLabel: {
    color: g.white,
  }
});

interface Props {
  label: string;
  theme: 'primary' | 'secondary' | 'tertiary';
  onPress: () => void;
  disabled?: boolean;
}

export function Button(props: Props) {
  const { label, onPress, theme, disabled } = props;

  const gradients = {
    primary: [g.primaryBlue, g.secondaryBlue],
    secondary: [g.white, g.white],
    tertiary: ['transparent', 'transparent'],
  };

  return (
    <TouchableOpacity
      style={[s.button, theme === 'tertiary' && s.tertiary, disabled && s.disabled]}
      disabled={disabled}
      onPress={onPress}
    >
      <LinearGradient
        style={s.gradient}
        colors={gradients[theme]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      >
        <Text
          style={[
            s.label,
            theme === 'primary' && s.primaryLabel,
            theme === 'secondary' && s.secondaryLabel,
            theme === 'tertiary' && s.tertiaryLabel,
          ]}
        >
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
