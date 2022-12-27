import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Expense} from './';

export const ExpenseList = ({expenses, expenseSelectedHandler}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
      {expenses.length === 0 ? (
        <Text>There are no expenses.</Text>
      ) : (
        expenses.map(expense => (
          <Expense
            key={expense.id}
            expense={expense}
            expenseSelectedHandler={expenseSelectedHandler}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    marginBottom: 100,
  },
  title: {
    color: '#64748B',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
  noExpenses: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});
