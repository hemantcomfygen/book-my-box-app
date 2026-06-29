import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationEnd: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationEnd }) => {
  // Animation refs
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(30)).current;
  const loaderWidth = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // 1. Logo fades in and scales up
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // 2. Text slides up and fades in
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // 3. Loading bar animates
      Animated.timing(loaderWidth, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false, // width cannot use native driver
      }),
      // 4. Fade out entire screen
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onAnimationEnd();
    });
  }, [logoScale, logoOpacity, textOpacity, textTranslateY, loaderWidth, screenOpacity, onAnimationEnd]);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <StatusBar backgroundColor="#0F1012" barStyle="light-content" />

      {/* Decorative background grid/glowing circles */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.contentContainer}>
        {/* Emblem / Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          {/* Glowing Cricket Field & Wicket Design */}
          <View style={styles.outerRing}>
            <View style={styles.innerField}>
              <View style={styles.pitchLine} />
              <View style={styles.stumpContainer}>
                <View style={styles.stump} />
                <View style={styles.stump} />
                <View style={styles.stump} />
                <View style={styles.bail} />
              </View>
              <View style={styles.ballGlow} />
            </View>
          </View>
        </Animated.View>

        {/* Brand Name & Slogan */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <Text style={styles.brandText}>BOOK MY BOX</Text>
          <Text style={styles.sloganText}>Your turf. Your squad. Your game.</Text>
        </Animated.View>
      </View>

      {/* Loading Progress Bar */}
      <View style={styles.loaderContainer}>
        <Animated.View
          style={[
            styles.loaderBar,
            {
              width: loaderWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0F1012',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  glowTop: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(52, 211, 153, 0.15)', // Neon emerald glow
    blurRadius: 100,
  },
  glowBottom: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(16, 185, 129, 0.1)', // Forest green glow
    blurRadius: 120,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 30,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 20,
  },
  outerRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1E2024',
    borderWidth: 2,
    borderColor: '#10B981', // Emerald green border
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  innerField: {
    width: '100%',
    height: '100%',
    borderRadius: 65,
    backgroundColor: '#0F5132', // Deep turf green
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  pitchLine: {
    position: 'absolute',
    width: 2,
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  stumpContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: 42,
    height: 60,
    position: 'relative',
  },
  stump: {
    width: 4,
    height: 50,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  bail: {
    position: 'absolute',
    top: 6,
    width: '100%',
    height: 4,
    backgroundColor: '#EF4444', // Red bails
    borderRadius: 2,
  },
  ballGlow: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#34D399', // Bright neon ball
    right: 28,
    top: 40,
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  brandText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 3,
    textShadowColor: 'rgba(16, 185, 129, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  sloganText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    letterSpacing: 1.5,
    fontWeight: '500',
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.6,
    height: 3,
    backgroundColor: '#1F2937',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loaderBar: {
    height: '100%',
    backgroundColor: '#10B981', // Emerald green loader
    borderRadius: 2,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});
