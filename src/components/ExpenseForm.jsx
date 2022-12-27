import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {globalStyles} from '../styles';

const InputField = ({label, placeholder, value, onSetValue}) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onSetValue}
      />
    </View>
  );
};

export const ExpenseForm = ({
  setModalVisible,
  newExpenseHandler,
  initialExpense,
  setInitialExpense,
}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState();
  const [expenseDate, setDate] = useState();

  useEffect(() => {
    if (!initialExpense) return;
    setName(initialExpense.name);
    setAmount(initialExpense.amount);
    setCategory(initialExpense.category);
    setId(initialExpense.id);
    setDate(initialExpense.expenseDate);
  }, [initialExpense]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Pressable
          style={styles.btnCancel}
          onLongPress={() => {
            setInitialExpense({});
            setModalVisible(false);
          }}>
          <Text style={styles.btnCancelText}>Cancel</Text>
        </Pressable>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>
          {initialExpense?.id ? 'Modify expense' : 'New expense'}
        </Text>
        <InputField
          label="Description"
          placeholder="Expense description. Example: food"
          value={name}
          onSetValue={setName}
        />
        <InputField
          label="Amount"
          placeholder="Expense amount. Example: 300"
          value={amount}
          onSetValue={setAmount}
        />
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <Picker
            selectedValue={category}
            onValueChange={value => setCategory(value)}>
            <Picker.Item label="--- Select ---" value="" />
            <Picker.Item label="Savings" value="savings" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Household" value="household" />
            <Picker.Item label="Miscelaneous" value="misc" />
            <Picker.Item label="Entertainment" value="entertainment" />
            <Picker.Item label="Health" value="health" />
            <Picker.Item label="Subscriptions" value="subscriptions" />
          </Picker>
        </View>
        <Pressable
          style={styles.submitBtn}
          onPress={() =>
            newExpenseHandler({name, amount, category, id, expenseDate})
          }>
          <Text style={styles.submitBtnText}>
            {initialExpense?.id ? 'Save changes' : 'Add expense'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e40af',
  },
  btnCancel: {
    backgroundColor: '#DB2777',
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  btnCancelText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
  form: {
    ...globalStyles.container,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748B',
  },
  field: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5f5f5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: '#3b82F6',
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
  },
  submitBtnText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
