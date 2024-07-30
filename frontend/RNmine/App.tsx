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
      <WebView
        source={{uri: 'ec2-3-26-2-105.ap-southeast-2.compute.amazonaws.com'}}
      />
    </SafeAreaView>
  );
}

export default App;
