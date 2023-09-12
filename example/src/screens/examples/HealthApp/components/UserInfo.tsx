import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const UserInfo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/240' }}
        style={styles.profileImage}
      />
      <View style={styles.details}>
        <Text style={styles.fullName}>John Doe</Text>
        <Text style={styles.activity}>Cyclist</Text>
      </View>
    </View>
  );
};

export default React.memo(UserInfo);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d36e6e',
    paddingTop: 60,
    padding: 20,
    flexDirection: 'row',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },
  details: {
    padding: 20,
  },
  fullName: {
    fontSize: 18,
    fontWeight: '700',
  },
  activity: { fontSize: 14, fontWeight: '500' },
});
