import {StyleSheet, Text, SafeAreaView} from 'react-native';
import React from 'react';

export const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.headerText}>Expenses Planner</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3b82f6',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: 20,
  },
});
