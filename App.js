import React, {useState} from 'react';
import {Alert, Image, Modal, Pressable, View, StyleSheet} from 'react-native';
import {ControlBudget, ExpenseForm, Header, NewBudget} from './src/components';

const App = () => {
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [budget, setBudget] = useState(0);
  const [expenditures, setExpenditures] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const newBudgetHandler = budget => {
    if (Number(budget) > 0) {
      setIsValidBudget(true);
    } else {
      Alert.alert('Error', 'The amount must be greater than zero');
    }
  };

  const newExpenseHandler = expense => {
    if (Object.values(expense).includes('')) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    const newExpense = {
      id: Date.now(),
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
    };

    setExpenditures([...expenditures, newExpense]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        {!isValidBudget ? (
          <NewBudget
            budget={budget}
            setBudget={setBudget}
            newBudgetHandler={newBudgetHandler}
          />
        ) : (
          <ControlBudget budget={budget} expenditures={expenditures} />
        )}
      </View>
      {modalVisible && (
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <ExpenseForm
            setModalVisible={() => setModalVisible(false)}
            newExpenseHandler={newExpenseHandler}
          />
        </Modal>
      )}
      {isValidBudget && (
        <Pressable onPress={() => setModalVisible(true)}>
          <Image
            style={styles.image}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
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
  image: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 120,
    right: 20,
  },
});
