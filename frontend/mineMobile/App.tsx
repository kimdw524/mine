/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView source={{uri: 'https://99zdiary.com'}} />
    </SafeAreaView>
  );
}

export default App;
