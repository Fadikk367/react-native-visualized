import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    alignItems: 'center',
    // Shadows
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
  },
});
