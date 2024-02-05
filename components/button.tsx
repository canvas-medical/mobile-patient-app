import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { g } from '@styles';

const s = StyleSheet.create({
  button: {
    borderRadius: g.ms(40),
    paddingVertical: g.hs(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...g.labelLarge,
  },
  primary: {
    backgroundColor: g.secondaryBlue,
  },
  primaryLabel: {
    color: g.white,
  },
  secondary: {
    backgroundColor: g.white,
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
  style?: { [key: string]: number | string } | { [key: string]: number | string }[];
}

export function Button(props: Props) {
  const { label, onPress, theme, disabled, style = {} } = props;

  return (
    <TouchableOpacity
      style={[
        s.button,
        theme === 'primary' && s.primary,
        theme === 'secondary' && s.secondary,
        theme === 'tertiary' && s.tertiary,
        disabled && s.disabled,
        style,
      ]}
      disabled={disabled}
      onPress={onPress}
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
    </TouchableOpacity>
  );
}
