import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../styles';
import {formatAmount} from '../helpers';

const iconsDictionary = {
  savings: require('../img/icono_ahorro.png'),
  food: require('../img/icono_comida.png'),
  household: require('../img/icono_casa.png'),
  expenses: require('../img/icono_gastos.png'),
  entertainment: require('../img/icono_ocio.png'),
  health: require('../img/icono_salud.png'),
  subscriptions: require('../img/icono_suscripciones.png'),
};

export const Expense = ({expense}) => {
  const {name, category, amount, expenseDate, id} = expense;
  console.log(expense);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={iconsDictionary[category]} />
          <View style={styles.containerText}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}>
              Date: {new Date(expenseDate).toDateString()}
            </Text>
          </View>
          <Text style={styles.amount}>{formatAmount(amount)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginBottom: 15,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerImage: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  containerText: {
    flex: 1,
  },
  category: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    color: '#64848B',
    marginBottom: 5,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
  },
  date: {
    fontSize: 15,
  },
});
