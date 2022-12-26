import React, {useState} from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import {ControlBudget, Header, NewBudget} from './src/components';

const App = () => {
  const [isValidBudget, setIsValidBudget] = useState(false);

  const handleNewBudget = budget => {
    if (Number(budget) > 0) {
      setIsValidBudget(true);
    } else {
      Alert.alert('Error', 'The amount must be greater than zero');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        {!isValidBudget ? (
          <NewBudget handleNewBudget={handleNewBudget} />
        ) : (
          <ControlBudget />
        )}
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5f5f5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
  },
});
