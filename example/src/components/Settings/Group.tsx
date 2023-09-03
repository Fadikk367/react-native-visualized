import React from 'react';
import { StyleSheet, View } from 'react-native';

interface GroupProps {
  children: React.ReactNode;
}

const Group = ({ children }: GroupProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default Group;

const styles = StyleSheet.create({
  container: {
    rowGap: 2,
    borderRadius: 24,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
});
