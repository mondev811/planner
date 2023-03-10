import React from 'react';
import {Picker} from '@react-native-picker/picker';

export const CategoriesPicker = ({initialValue, setInitialValue, isClosed}) => {
  const pickerRef = React.useRef();
  if (isClosed) {
    pickerRef.current.blur();
    return <></>;
  }
  return (
    <Picker
      ref={pickerRef}
      selectedValue={initialValue}
      onValueChange={value => setInitialValue(value)}>
      <Picker.Item label="--- Select ---" value="" />
      <Picker.Item label="Savings" value="savings" />
      <Picker.Item label="Food" value="food" />
      <Picker.Item label="Household" value="household" />
      <Picker.Item label="Miscelaneous" value="misc" />
      <Picker.Item label="Entertainment" value="entertainment" />
      <Picker.Item label="Health" value="health" />
      <Picker.Item label="Subscriptions" value="subscriptions" />
    </Picker>
  );
};
