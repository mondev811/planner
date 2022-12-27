import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {globalStyles} from '../styles';
import {formatAmount} from '../helpers';

const AmountDisplay = ({label, amount}) => {
  return (
    <Text style={styles.amount}>
      <Text style={styles.label}>{label} </Text>
      {formatAmount(amount)}
    </Text>
  );
};
export const ControlBudget = ({budget, expenditures}) => {
  const [available, setAvailable] = useState(0);
  const [used, setUsed] = useState(0);

  useEffect(() => {
    const totalUsed = expenditures.reduce(
      (total, expense) => Number(expense.amount) + total,
      0,
    );
    setUsed(totalUsed);
    setAvailable(budget - totalUsed);
  }, [budget, expenditures]);

  return (
    <View style={styles.container}>
      <View style={styles.centerImg}>
        <CircularProgress
          value={(used * 100) / budget}
          inActiveStrokeColor={'#3B82F6'}
          inActiveStrokeOpacity={0.2}
          progressValueColor={'#3B82F6'}
          activeStrokeColor={'#3B82F6'}
          valueSuffix={'%'}
          radius={125}
          inActiveStrokeWidth={35}
          activeStrokeWidth={35}
          strokeLinecap={'butt'}
        />
      </View>
      <View style={styles.containerText}>
        <AmountDisplay label="Budget: " amount={budget} />
        <AmountDisplay label="Available: " amount={available} />
        <AmountDisplay label="Used: " amount={used} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  centerImg: {
    alignItems: 'center',
  },
  containerText: {
    marginTop: 50,
  },
  label: {
    fontWeight: '700',
    color: '#3B82F6',
  },
  amount: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
});
