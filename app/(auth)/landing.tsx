import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'; // Using Expo Router

// Placeholder for useLanguage and useTranslation - you'll need to implement these
// based on your context and i18n setup in React Native
const useLanguage = () => {
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false); // Example state
  const setLanguage = (lang: string) => {
    console.log('Setting language:', lang);
    setHasSelectedLanguage(true); // Example action
    // Implement actual language setting logic
  };
  return { hasSelectedLanguage, setLanguage };
};

const useTranslation = () => {
  const t = (key: string) => {
    // Placeholder translation logic
    if (key === 'tagline') return 'Your Companion for Faith';
    if (key === 'selectLanguage') return 'Select your language';
    return key;
  };
  return { t };
};

const WelcomePage: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { hasSelectedLanguage, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const splashOpacity = new Animated.Value(1);
  const contentOpacity = new Animated.Value(0);
  const sparkleRotation = new Animated.Value(0);
  const textTranslateY = new Animated.Value(20);
  const textOpacity = new Animated.Value(0);
  const languageButtonTranslateXEnglish = new Animated.Value(-20);
  const languageButtonOpacityEnglish = new Animated.Value(0);
  const languageButtonTranslateXArabic = new Animated.Value(20);
  const languageButtonOpacityArabic = new Animated.Value(0);
  const footerTextOpacity = new Animated.Value(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShowSplash(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      Animated.sequence([
        Animated.delay(200),
        Animated.parallel([
          Animated.timing(textTranslateY, { toValue: 0, duration: 500, useNativeDriver: true }),
          Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]),
        Animated.delay(200),
        Animated.parallel([
          Animated.timing(languageButtonTranslateXEnglish, { toValue: 0, duration: 500, useNativeDriver: true }),
          Animated.timing(languageButtonOpacityEnglish, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]),
        Animated.delay(200),
        Animated.parallel([
          Animated.timing(languageButtonTranslateXArabic, { toValue: 0, duration: 500, useNativeDriver: true }),
          Animated.timing(languageButtonOpacityArabic, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]),
        Animated.delay(400),
        Animated.timing(footerTextOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
    }
  }, [showSplash]);

  // If user has already selected language, redirect to dashboard
  useEffect(() => {
    if (hasSelectedLanguage && !showSplash) {
      // Use React Navigation to navigate
      router.replace('/(tabs)'); // Assuming '/(tabs)' is the Expo Router path for the dashboard
    }
  }, [hasSelectedLanguage, showSplash]);

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    // Small delay for smooth transition
    setTimeout(() => {
      router.replace('/(tabs)'); // Assuming '/(tabs)' is the Expo Router path for the dashboard
    }, 500);
  };

  // Continuous sparkle rotation animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(sparkleRotation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = sparkleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {showSplash && (
        <Animated.View style={[styles.splashContainer, { opacity: splashOpacity }]}>
          <LinearGradient
            colors={['rgba(100, 50, 150, 0.2)', '#ffffff', 'rgba(150, 50, 100, 0.2)']} // Example gradient
            style={styles.splashBackground}
          >
            <Animated.View
              style={[
                styles.splashContent,
                {
                  transform: [
                    { scale: splashOpacity.interpolate({ inputRange: [0, 1], outputRange: [1, 0.8] }) },
                  ],
                  opacity: splashOpacity.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.sparkleContainer,
                  { transform: [{ rotate: rotateInterpolate }] },
                ]}
              >
                <Ionicons name="sparkles" size={40} color="#fff" />
              </Animated.View>
              <Animated.Text
                style={[
                  styles.splashTitle,
                  { transform: [{ translateY: textTranslateY }], opacity: textOpacity },
                ]}
              >
                YaQeen
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.splashSubtitle,
                  { transform: [{ translateY: textTranslateY }], opacity: textOpacity },
                ]}
              >
                Your Companion for Faith
              </Animated.Text>
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      )}

      <Animated.View style={[styles.contentContainer, { opacity: contentOpacity }]}>
        <LinearGradient
          colors={['rgba(100, 50, 150, 0.1)', '#ffffff', 'rgba(150, 50, 100, 0.1)']} // Example gradient
          style={styles.contentBackground}
        >
          {/* Islamic geometric pattern background - simplified */}
          <View style={styles.geometricPatternContainer}>
            <View style={[styles.geometricShape, styles.shape1]} />
            <View style={[styles.geometricShape, styles.shape2]} />
            <View style={[styles.geometricShape, styles.shape3]} />
            <View style={[styles.geometricShape, styles.shape4]} />
          </View>

          <View style={styles.card}>
            <Animated.View
              style={[
                styles.cardHeader,
                { transform: [{ translateY: textTranslateY }], opacity: textOpacity },
              ]}
            >
              <View style={styles.cardSparkleContainer}>
                <Ionicons name="sparkles" size={30} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>YaQeen</Text>
              <Text style={styles.cardSubtitle}>{t("tagline")}</Text>
              <View style={styles.languageSelectContainer}>
                <Ionicons name="globe-outline" size={16} color="#666" />
                <Text style={styles.languageSelectText}>{t("selectLanguage")}</Text>
              </View>
            </Animated.View>

            <View style={styles.languageButtonsContainer}>
              <Animated.View style={{ transform: [{ translateX: languageButtonTranslateXEnglish }], opacity: languageButtonOpacityEnglish }}>
                <TouchableOpacity
                  style={[styles.button, styles.englishButton]}
                  onPress={() => handleLanguageSelect("en")}
                >
                  <Text style={styles.flag}>🇬🇧</Text>
                  <Text style={styles.buttonText}>English</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View style={{ transform: [{ translateX: languageButtonTranslateXArabic }], opacity: languageButtonOpacityArabic }}>
                <TouchableOpacity
                  style={[styles.button, styles.arabicButton]}
                  onPress={() => handleLanguageSelect("ar")}
                >
                  <Text style={styles.flag}>🇸🇦</Text>
                  <Text style={styles.buttonText}>العربية</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          <Animated.Text style={[styles.footerText, { opacity: footerTextOpacity }]}>
            Experience the serenity of faith with our modern Islamic companion app
          </Animated.Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Default background
  },
  splashContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  splashContent: {
    alignItems: 'center',
  },
  sparkleContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'purple', // Example color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  splashTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'purple', // Example color
    marginBottom: 5,
  },
  splashSubtitle: {
    fontSize: 16,
    color: '#666', // Example color
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  geometricPatternContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
  },
  geometricShape: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'purple', // Example color
  },
  shape1: {
    top: 40,
    left: 40,
    width: 128,
    height: 128,
    transform: [{ rotate: '45deg' }],
  },
  shape2: {
    top: 80,
    right: 80,
    width: 96,
    height: 96,
    transform: [{ rotate: '12deg' }],
    borderColor: 'orange', // Example color
  },
  shape3: {
    bottom: 80,
    left: 80,
    width: 112,
    height: 112,
    transform: [{ rotate: '-12deg' }],
    borderColor: 'rgba(128, 0, 128, 0.5)', // Example color with opacity
  },
  shape4: {
    bottom: 40,
    right: 40,
    width: 80,
    height: 80,
    transform: [{ rotate: '45deg' }],
    borderColor: 'rgba(255, 165, 0, 0.5)', // Example color with opacity
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Example with opacity
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
    zIndex: 10,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  cardSparkleContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'purple', // Example color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'purple', // Example color
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666', // Example color
    marginBottom: 15,
  },
  languageSelectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: '#666', // Example color
  },
  languageSelectText: {
    fontSize: 14,
    color: '#666', // Example color
  },
  languageButtonsContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  englishButton: {
    backgroundColor: '#3b82f6', // Example blue
  },
  arabicButton: {
    backgroundColor: '#22c55e', // Example green
  },
  flag: {
    fontSize: 24,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 30,
    fontSize: 12,
    color: '#666', // Example color
    textAlign: 'center',
    maxWidth: 250,
  },
});

export default WelcomePage;