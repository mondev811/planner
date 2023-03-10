import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../styles';
import {CategoriesPicker} from '../components';

export const Filter = ({initialValue, setInitialValue}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter expenses</Text>
      <CategoriesPicker
        initialValue={initialValue}
        setInitialValue={setInitialValue}
        defaultLabel={'---Select filter---'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    transform: [{translateY: 0}],
    marginTop: 80,
  },
  label: {
    fontSize: 22,
    fontWeight: '900',
    color: '#64748B',
  },
});
