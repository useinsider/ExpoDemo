import React from 'react';
import { View, Image, useColorScheme } from 'react-native';

function Header() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image source={isDarkMode ? require(`../assets/images/insider-white-logo.png`) : require(`../assets/images/insider-logo.png`)}
                     style={{ width: 320, height: 140, alignSelf: 'center', justifyContent: 'center', margin: 10 }} />
    </View>
  );
}

export default Header;