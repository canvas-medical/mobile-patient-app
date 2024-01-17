import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Octicons,
  Feather,
  Fontisto,
  Ionicons,
  Entypo,
} from '@expo/vector-icons';
import { Vital } from '@interfaces';
import { g } from '@styles';

/**
 * Converts the vital data value based on the type of vital.
 *
 * @param type - The type of vital.
 * @param vitalData - The vital data object.
 * @returns The converted vital value.
 */
export function vitalsValueSwitch(type: string, vitalData: Vital) {
  switch (type) {
    case 'Weight':
    case 'Pulse':
    case 'Respiration Rate':
    case 'Waist Circumference':
      return `${vitalData.valueQuantity.value} ${vitalData.valueQuantity.unit}`;
    case 'Body Temperature':
    case 'Oxygen Saturation Arterial':
      return `${vitalData.valueQuantity.value}${vitalData.valueQuantity.unit}`;
    case 'Blood Pressure':
      return `${vitalData.component[0].valueQuantity.value}/${vitalData.component[1].valueQuantity.value}`;
    case 'Height':
      return `${Math.floor(vitalData.valueQuantity.value / 12)}' ${vitalData.valueQuantity.value % 12}"`;
    case 'Pulse Rhythm':
      return vitalData.valueString;
    default:
      return 'N/A';
  }
}

/**
 * Returns the corresponding icon component based on the given type.
 *
 * @param type - The type of vital.
 * @returns The icon component.
 */
export function vitalsIconSwitch(type: string) {
  switch (type) {
    case 'Weight':
      return <FontAwesome5 name="weight" size={g.size(20)} color={g.neutral500} />;
    case 'Pulse':
      return <FontAwesome name="heartbeat" size={g.size(20)} color={g.neutral500} />;
    case 'Respiration Rate':
      return <MaterialCommunityIcons name="lungs" size={g.size(20)} color={g.neutral500} />;
    case 'Blood Pressure':
      return <Fontisto name="blood-drop" size={g.size(20)} color={g.neutral500} />;
    case 'Height':
      return <MaterialCommunityIcons name="human-male-height-variant" size={g.size(20)} color={g.neutral500} />;
    case 'Pulse Rhythm':
      return <Octicons name="pulse" size={g.size(20)} color={g.neutral500} />;
    case 'Body Temperature':
      return <FontAwesome5 name="temperature-high" size={g.size(20)} color={g.neutral500} />;
    case 'Waist Circumference':
      return <Ionicons name="body" size={g.size(20)} color={g.neutral500} />;
    case 'Oxygen Saturation Arterial':
      return <Entypo name="air" size={g.size(20)} color={g.neutral500} />;
    default:
      return <Feather name="heart" size={g.size(20)} color={g.neutral500} />;
  }
}
