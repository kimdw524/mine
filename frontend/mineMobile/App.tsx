/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  AppState,
  AppStateStatus,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
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

  const setCookies = async () => {
    try {
      const cookies = await CookieManager.get('https://99zdiary.com/');
      if (cookies) {
        await AsyncStorage.setItem(COOKIE_KEY, JSON.stringify(cookies));
        Alert.alert('after login' + JSON.stringify(cookies));
      }
    } catch (e) {
      console.error('it"s error');
    }
  };

  const getCookies = async () => {
    try {
      const storedCookies = await AsyncStorage.getItem(COOKIE_KEY);
      if (storedCookies) {
        const cookies: Cookies = JSON.parse(storedCookies);

        for (const [key, cookie] of Object.entries(cookies)) {
          await CookieManager.set('https://99zdiary.com', cookie);
        }
      }
    } catch (e) {
      console.error('it"s error');
    }
  };

  const onMessage = async (e: WebViewMessageEvent) => {
    const data = e.nativeEvent.data;
    Alert.alert(data);
    if (data === 'login') await setCookies();
  };

  const handleWebViewLoadEnd = async () => {
    await getCookies();
    SplashScreen.hide();
  };

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
        onMessage={onMessage}
      />
    </SafeAreaView>
  );
}

export default App;
