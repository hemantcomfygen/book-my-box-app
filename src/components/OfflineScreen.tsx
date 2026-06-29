import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';

interface OfflineScreenProps {
  onRetry: () => void;
}

export const OfflineScreen: React.FC<OfflineScreenProps> = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0F1012" barStyle="light-content" />

      {/* Decorative background glows */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.content}>
        {/* Offline Icon Illustration */}
        <View style={styles.iconContainer}>
          <View style={styles.wifiRingOuter}>
            <View style={styles.wifiRingInner}>
              <Text style={styles.wifiSlash}>🏏</Text>
            </View>
          </View>
        </View>

        {/* Messaging */}
        <Text style={styles.title}>No Internet Connection</Text>
        <Text style={styles.description}>
          We couldn't connect to the turf booking server. Please check your internet connection and try again.
        </Text>

        {/* Premium Retry Button */}
        <TouchableOpacity style={styles.button} onPress={onRetry} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1012',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  glowTop: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(239, 68, 68, 0.08)', // Soft red glow for offline
    blurRadius: 100,
  },
  glowBottom: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(16, 185, 129, 0.05)', // Soft green glow
    blurRadius: 120,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    marginBottom: 40,
  },
  wifiRingOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1E2024',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  wifiRingInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EF4444', // Red border for error/offline status
  },
  wifiSlash: {
    fontSize: 38,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    maxWidth: 260,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#10B981', // Premium emerald green button
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
