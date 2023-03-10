import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {globalStyles} from '../styles';
import {CategoriesPicker} from './';

const InputField = ({
  label,
  placeholder,
  value,
  onSetValue,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onSetValue}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export const ExpenseForm = ({
  setModalVisible,
  newExpenseHandler,
  initialExpense,
  setInitialExpense,
  deleteExpenseHandler,
}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState();
  const [expenseDate, setDate] = useState();
  const [deleteDisabled, setDeleteDisabled] = useState(true);

  useEffect(() => {
    if (!initialExpense.id) {
      setDeleteDisabled(true);
      return;
    }
    setName(initialExpense.name);
    setAmount(initialExpense.amount);
    setCategory(initialExpense.category);
    setId(initialExpense.id);
    setDate(initialExpense.expenseDate);
    setDeleteDisabled(false);
  }, [initialExpense]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnGroup}>
        <Pressable
          style={styles.btnTop}
          onLongPress={() => {
            setInitialExpense({});
            setModalVisible(false);
          }}>
          <Text style={styles.btnTopText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={deleteDisabled ? styles.btnTopDisabled : styles.btnTop}
          onLongPress={() => deleteExpenseHandler(id)}
          disabled={deleteDisabled}>
          <Text
            style={
              deleteDisabled ? styles.btnTopTextDisabled : styles.btnTopText
            }>
            Delete
          </Text>
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
          keyboardType="numeric"
        />
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <CategoriesPicker
            initialValue={category}
            setInitialValue={setCategory}
          />
        </View>
        <Pressable
          style={styles.submitBtn}
          onPress={() =>
            newExpenseHandler({name, amount, category, id, expenseDate})
          }
          disabled={deleteDisabled.current}>
          <Text style={styles.submitBtnText}>
            {initialExpense?.id ? 'Save changes' : 'Add expense'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const btnTopBase = {
  padding: 10,
  marginTop: 30,
  marginHorizontal: 10,
  borderRadius: 8,
  width: '45%',
};

const btnTopTextBase = {
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: 'bold',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e40af',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTop: {
    backgroundColor: '#DB2777',
    ...btnTopBase,
  },
  btnTopText: {
    color: '#FFF',
    ...btnTopTextBase,
  },
  btnTopDisabled: {
    backgroundColor: '#de8cb1',
    ...btnTopBase,
  },
  btnTopTextDisabled: {
    color: '#9c9c9c',
    ...btnTopTextBase,
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
