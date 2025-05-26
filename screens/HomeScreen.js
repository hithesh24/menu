import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Reusable fade-in component
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

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* ✅ Banner Image */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1584382290052-30486e70eb4a' }}
        style={styles.banner}
        resizeMode="cover"
      >
        <Text style={styles.bannerText}>🌾 Welcome to FarmMate EDU</Text>
      </ImageBackground>

      <Text style={styles.title}>“Search tutorial, tips, or guides…”</Text>

      {/* ✅ Fade-in Buttons */}
      <FadeInView delay={200}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CropTutorials')}>
          <Text style={styles.buttonText}>📚 Crop Tutorials</Text>
        </TouchableOpacity>
      </FadeInView>

      <FadeInView delay={400}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AITips')}>
          <Text style={styles.buttonText}>🤖 AI Tips</Text>
        </TouchableOpacity>
      </FadeInView>

      <FadeInView delay={600}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Weather')}>
          <Text style={styles.buttonText}>🌦️ Weather Updates</Text>
        </TouchableOpacity>
      </FadeInView>

      <FadeInView delay={800}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DIYTools')}>
          <Text style={styles.buttonText}>🛠️ DIY Farming Tools</Text>
        </TouchableOpacity>
      </FadeInView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F5F4',
    flex: 1,
  },
  banner: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#2e7d32',
  },
  button: {
    backgroundColor: '#d9f0e4',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#064420',
  },
});
