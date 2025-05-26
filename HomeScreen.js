import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Animated,
} from 'react-native';

// Fade-in animation wrapper
const FadeInView = ({ children, delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      delay,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>;
};

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
       source={{ uri: 'https://i.ibb.co/7vjmpj7/farm-banner.jpg' }}

        style={styles.banner}
      >
        <Text style={styles.bannerText}>🌾 Welcome to FarmMate EDU</Text>
      </ImageBackground>

      <Text style={styles.subHeader}>“Search tutorial, tips, or guides…”</Text>

      <FadeInView delay={200}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>📚 Crop Tutorials</Text>
        </TouchableOpacity>
      </FadeInView>

      <FadeInView delay={400}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🤖 AI Tips</Text>
        </TouchableOpacity>
      </FadeInView>

      <FadeInView delay={600}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🛠️ DIY Farming Tools</Text>
        </TouchableOpacity>
      </FadeInView>

      <FadeInView delay={800}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🌦️ Weather Updates</Text>
        </TouchableOpacity>
      </FadeInView>

      <Text style={styles.quote}>💡 “Let’s empower every farmer with AI – one crop at a time.”</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fff0',
  },
  banner: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  quote: {
    marginTop: 30,
    marginBottom: 50,
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
