import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles';

export const NewBudget = ({budget, setBudget, handleNewBudget}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Define Budget</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Add new budget: Example: 300"
        style={styles.input}
        value={budget.toString()}
        onChangeText={setBudget}
      />
      <Pressable style={styles.button} onPress={() => handleNewBudget(budget)}>
        <Text style={styles.buttonText}>Add budget</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3b82f6',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#1048a4',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
