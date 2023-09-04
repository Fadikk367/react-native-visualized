import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface GroupProps {
  title?: string;
  children: React.ReactNode;
}

const Group = ({ title, children }: GroupProps) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default Group;

const styles = StyleSheet.create({
  container: {},
  content: {
    rowGap: 2,
    borderRadius: 24,
    overflow: 'hidden',
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
});
