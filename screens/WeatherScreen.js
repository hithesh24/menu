import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

// Mock weather data - in a real app, this would come from a weather API
const MOCK_WEATHER_DATA = {
  current: {
    temp: 28,
    humidity: 65,
    wind_speed: 12,
    weather_condition: 'Partly Cloudy',
    icon: '🌤️'
  },
  forecast: [
    { day: 'Today', temp: 28, icon: '🌤️', rain_chance: 10 },
    { day: 'Tomorrow', temp: 30, icon: '☀️', rain_chance: 5 },
    { day: 'Wednesday', temp: 29, icon: '⛅', rain_chance: 20 },
    { day: 'Thursday', temp: 27, icon: '🌧️', rain_chance: 60 },
    { day: 'Friday', temp: 26, icon: '🌧️', rain_chance: 70 },
  ],
  irrigation_advice: [
    "Based on upcoming dry conditions, consider irrigating tomatoes and peppers tomorrow",
    "Rain expected on Thursday - hold off on irrigation for field crops",
    "Soil moisture levels expected to drop - monitor crops with shallow roots"
  ]
};

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch weather data - using mock data for now
  const fetchWeatherData = () => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setWeatherData(MOCK_WEATHER_DATA);
      setLoading(false);
    }, 1000);
  };

  // Pull to refresh functionality
  const onRefresh = () => {
    setRefreshing(true);
    fetchWeatherData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Initial data fetch
  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading && !weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#064420" />
        <Text style={styles.loadingText}>Loading weather data...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Weather Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🌦️ Weather & Irrigation</Text>
        <Text style={styles.subtitle}>Optimize irrigation based on weather forecasts</Text>
      </View>

      {/* Current Weather */}
      <View style={styles.currentWeatherCard}>
        <Text style={styles.weatherIcon}>{weatherData.current.icon}</Text>
        <Text style={styles.temperature}>{weatherData.current.temp}°C</Text>
        <Text style={styles.weatherCondition}>{weatherData.current.weather_condition}</Text>
        <View style={styles.weatherDetails}>
          <View style={styles.weatherDetail}>
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>{weatherData.current.humidity}%</Text>
          </View>
          <View style={styles.weatherDetail}>
            <Text style={styles.detailLabel}>Wind</Text>
            <Text style={styles.detailValue}>{weatherData.current.wind_speed} km/h</Text>
          </View>
        </View>
      </View>

      {/* Forecast */}
      <Text style={styles.sectionTitle}>5-Day Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastContainer}>
        {weatherData.forecast.map((day, index) => (
          <View key={index} style={styles.forecastDay}>
            <Text style={styles.forecastDayName}>{day.day}</Text>
            <Text style={styles.forecastIcon}>{day.icon}</Text>
            <Text style={styles.forecastTemp}>{day.temp}°C</Text>
            <Text style={styles.rainChance}>{day.rain_chance}% rain</Text>
          </View>
        ))}
      </ScrollView>

      {/* Irrigation Advice */}
      <Text style={styles.sectionTitle}>Irrigation Recommendations</Text>
      <View style={styles.irrigationAdviceContainer}>
        {weatherData.irrigation_advice.map((advice, index) => (
          <View key={index} style={styles.adviceItem}>
            <Text style={styles.adviceIcon}>💧</Text>
            <Text style={styles.adviceText}>{advice}</Text>
          </View>
        ))}
      </View>

      {/* AI Irrigation Calculator */}
      <TouchableOpacity style={styles.aiButton}>
        <Text style={styles.aiButtonText}>🤖 Calculate Irrigation Needs</Text>
        <Text style={styles.aiButtonSubtext}>Get personalized recommendations based on your crops and soil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FAF3',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4FAF3',
  },
  loadingText: {
    marginTop: 10,
    color: '#064420',
    fontSize: 16,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#064420',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'center',
  },
  currentWeatherCard: {
    backgroundColor: '#CDE4B0',
    borderRadius: 15,
    margin: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  weatherIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#064420',
  },
  weatherCondition: {
    fontSize: 18,
    color: '#2E7D32',
    marginBottom: 15,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  weatherDetail: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#2E7D32',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#064420',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#064420',
    margin: 15,
    marginBottom: 10,
  },
  forecastContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  forecastDay: {
    backgroundColor: '#E6F2E9',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    width: 100,
  },
  forecastDayName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#064420',
    marginBottom: 5,
  },
  forecastIcon: {
    fontSize: 24,
    marginVertical: 5,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#064420',
  },
  rainChance: {
    fontSize: 12,
    color: '#2E7D32',
    marginTop: 5,
  },
  irrigationAdviceContainer: {
    margin: 15,
  },
  adviceItem: {
    flexDirection: 'row',
    backgroundColor: '#E6F2E9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  adviceIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  adviceText: {
    fontSize: 14,
    color: '#064420',
    flex: 1,
  },
  aiButton: {
    backgroundColor: '#064420',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    alignItems: 'center',
  },
  aiButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  aiButtonSubtext: {
    fontSize: 12,
    color: '#E6F2E9',
    textAlign: 'center',
    marginTop: 5,
  },
});