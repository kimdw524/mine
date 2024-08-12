/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {Alert, AppState, BackHandler, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';
import CookieManager, {Cookies} from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface INav {
  url: string;
  canGoBack: boolean;
}

const COOKIE_KEY = '@webview_cookies';

function App(): React.JSX.Element {
  const webViewRef = useRef<WebView>(null);
  const [nav, setNav] = useState<INav>({
    url: '',
    canGoBack: false,
  });

  const close = () => {
    Alert.alert('나와 좀 더 놀지 않을래?', '확인을 누르면 종료됩니다.', [
      {
        text: '취소',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
  };

  const handleWebViewLoadEnd = async () => {
    SplashScreen.hide();

    try {
      const storedCookies = await AsyncStorage.getItem(COOKIE_KEY);

      if (storedCookies) {
        const cookies: Cookies = JSON.parse(storedCookies);

        for (const [key, cookie] of Object.entries(cookies)) {
          await CookieManager.set('https://99zdiary.com', cookie);
          Alert.alert(cookie.name + cookie.value + cookie.domain + cookie.path);
        }
      }
    } catch (e) {
      Alert.alert(e);
    }
  };

  useEffect(() => {
    const handleAppStateChange = async nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        try {
          const cookies = await CookieManager.getAll(true);
          await AsyncStorage.setItem(COOKIE_KEY, JSON.stringify(cookies));
        } catch (e) {
          Alert.alert(e);
        }
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const handleBack = () => {
      if (nav.canGoBack) {
        if (
          nav.url === 'https://99zdiary.com' ||
          nav.url === 'https://99zdiary.com/user/login'
        ) {
          close();
        } else {
          webViewRef.current?.goBack();
        }
      } else {
        close();
      }
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, [nav]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        ref={webViewRef}
        source={{uri: 'https://99zdiary.com'}}
        onNavigationStateChange={(nav: INav) => {
          setNav({url: nav.url, canGoBack: nav.canGoBack});
        }}
        onLoadEnd={handleWebViewLoadEnd}
      />
    </SafeAreaView>
  );
}

export default App;
