import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ControlBudget,
  ExpenseForm,
  ExpenseList,
  Filter,
  Header,
  NewBudget,
} from './src/components';
import {generateId} from './src/helpers';

const App = () => {
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [budget, setBudget] = useState(0);
  const [expenditures, setExpenditures] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [expenseSelected, setExpenseSelected] = useState({});
  const [filterSelection, setFilterSelection] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    if (filterSelection === '') {
      setFilteredExpenses(expenditures);
      return;
    }

    const filtered = expenditures.filter(
      item => item.category === filterSelection,
    );
    setFilteredExpenses(filtered);
  }, [filterSelection, expenditures]);

  useEffect(() => {
    const getBudgetStorage = async () => {
      try {
        const budgetStorage =
          (await AsyncStorage.getItem('planner_budget')) ?? 0;

        if (budgetStorage > 0) {
          setBudget(budgetStorage);
          setIsValidBudget(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBudgetStorage();
  }, []);

  useEffect(() => {
    const getExpensesStorage = async () => {
      try {
        const expensesStorage =
          (await AsyncStorage.getItem('planner_expenses')) ?? [];

        if (expensesStorage.length > 0) {
          setExpenditures(JSON.parse(expensesStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getExpensesStorage();
  }, []);

  useEffect(() => {
    if (isValidBudget) {
      const storeBudgetToStorage = async () => {
        try {
          await AsyncStorage.setItem('planner_budget', budget);
        } catch (error) {
          console.log(error);
        }
      };
      storeBudgetToStorage();
    }
  }, [isValidBudget]);

  useEffect(() => {
    if (expenditures.length > 0) {
      const storeExpendituresToStorage = async () => {
        try {
          await AsyncStorage.setItem(
            'planner_expenses',
            JSON.stringify(expenditures),
          );
        } catch (error) {
          console.log(error);
        }
      };
      storeExpendituresToStorage();
    }
  }, [expenditures]);

  const newBudgetHandler = budget => {
    if (Number(budget) > 0) {
      setIsValidBudget(true);
    } else {
      Alert.alert('Error', 'The amount must be greater than zero');
    }
  };

  const newExpenseHandler = expense => {
    const {id, name, amount, category} = expense;

    if (!name || !amount || !category) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (id) {
      const newExpenses = expenditures.map(savedExpense => {
        if (savedExpense.id === id) {
          return expense;
        } else {
          return savedExpense;
        }
      });
      setExpenditures(newExpenses);
    } else {
      const newExpense = {
        id: generateId(),
        expenseDate: Date.now(),
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
      };
      setExpenditures([...expenditures, newExpense]);
    }
    setModalVisible(false);
    setExpenseSelected({});
  };

  const expenseSelectedHandler = expense => {
    setModalVisible(true);
    setExpenseSelected(expense);
  };

  const deleteExpenseHandler = id => {
    console.log('deleting ', id);
    Alert.alert(
      'Are you sure you want to delete this expense?',
      'This action cannot be reversed',
      [
        {
          text: 'Cancel',
          onPress: () => {
            setModalVisible(false);
          },
        },
        {
          text: 'Yes, delete it',
          onPress: () => {
            const newExpenses = expenditures.filter(
              savedExpense => savedExpense.id !== id,
            );
            setExpenditures(newExpenses);
            setModalVisible(false);
          },
        },
      ],
    );
  };

  const resetAppHandler = () => {
    Alert.alert(
      'Do you want to reset the app? ',
      'This action will the budget and all saved expenses',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes, reset the app',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setIsValidBudget(false);
              setBudget(0);
              setExpenditures([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {!isValidBudget ? (
            <NewBudget
              budget={budget}
              setBudget={setBudget}
              newBudgetHandler={newBudgetHandler}
            />
          ) : (
            <ControlBudget
              budget={budget}
              expenditures={expenditures}
              resetAppHandler={resetAppHandler}
            />
          )}
        </View>
        {isValidBudget && (
          <>
            <Filter
              initialValue={filterSelection}
              setInitialValue={setFilterSelection}
            />
            <ExpenseList
              expenses={filteredExpenses}
              expenseSelectedHandler={expenseSelectedHandler}
            />
          </>
        )}
      </ScrollView>
      {modalVisible && (
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <ExpenseForm
            setModalVisible={() => setModalVisible(false)}
            newExpenseHandler={newExpenseHandler}
            initialExpense={expenseSelected}
            setInitialExpense={setExpenseSelected}
            deleteExpenseHandler={deleteExpenseHandler}
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
    minHeight: 400,
  },
  image: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
});
