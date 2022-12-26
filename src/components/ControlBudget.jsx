import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles';

export const ControlBudget = () => {
  return (
    <View style={globalStyles.container}>
      <View>
        <Image source={require('../img/grafico.jpg')} />
        <Text>ControlBudget</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
