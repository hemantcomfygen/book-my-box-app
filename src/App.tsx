import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SplashScreen } from './components/SplashScreen';
import { OfflineScreen } from './components/OfflineScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [webViewKey, setWebViewKey] = useState(0);

  const webViewRef = useRef<WebView>(null);

  // Handle hardware back button on Android
  useEffect(() => {
    const onBackPress = () => {
      if (webViewRef.current && canGoBack) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      subscription.remove();
    };
  }, [canGoBack]);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setWebViewKey((prev) => prev + 1);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.rootContainer}>
        <StatusBar backgroundColor="#0F1012" barStyle="light-content" />

        {/* 1. Splash Screen Overlay */}
        {showSplash && (
          <SplashScreen onAnimationEnd={() => setShowSplash(false)} />
        )}

        {/* 2. Main App Content */}
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {/* Top Loading Progress Bar */}
            {isLoading && progress < 1 && (
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${Math.max(progress * 100, 5)}%` },
                  ]}
                />
              </View>
            )}

            {/* Offline/Error State Screen */}
            {hasError ? (
              <OfflineScreen onRetry={handleRetry} />
            ) : (
              <WebView
                key={webViewKey}
                ref={webViewRef}
                source={{ uri: 'https://bookmybox.jamsara.com/' }}
                style={styles.webview}
                containerStyle={styles.webviewContainer}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onLoadStart={() => {
                  setIsLoading(true);
                  setProgress(0);
                }}
                onLoadProgress={({ nativeEvent }: any) => {
                  setProgress(nativeEvent.progress);
                }}
                onLoadEnd={() => {
                  setIsLoading(false);
                }}
                onError={() => {
                  setHasError(true);
                  setIsLoading(false);
                }}
                onHttpError={() => {
                  setHasError(true);
                  setIsLoading(false);
                }}
                onNavigationStateChange={(navState: any) => {
                  setCanGoBack(navState.canGoBack);
                }}
                renderLoading={() => (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#10B981" />
                  </View>
                )}
                // Avoid displaying native white error page
                renderError={() => <OfflineScreen onRetry={handleRetry} />}
              />
            )}
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#0F1012',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0F1012',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#0F1012',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#0F1012',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0F1012', // Match dark theme to prevent white flashes
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#1E2024',
    zIndex: 100,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10B981', // Sporty emerald green
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0F1012',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
