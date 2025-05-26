import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const crops = [
  '🌴 Arecanut', '🌾 Paddy', '🌱 Ragi', '🌽 Maize', '🥜 Groundnut',
  '🍅 Tomato', '🥔 Potato', '🍆 Brinjal', '🧅 Onion', '🥕 Carrot',
  '🍉 Watermelon', '🍌 Banana', '🍍 Pineapple', '🌶️ Chilli', '🍋 Lemon',
  '🫑 Capsicum', '🥬 Spinach', '🌻 Sunflower', '🌿 Moringa', '🌰 Coffee'
];

export default function CropTutorialsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌾 Crop Tutorials</Text>
      {crops.map((crop, index) => (
        <TouchableOpacity key={index} style={styles.cropButton}>
          <Text style={styles.cropText}>{crop}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F4FAF3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#064420',
    marginBottom: 20,
  },
  cropButton: {
    backgroundColor: '#CDE4B0',
    padding: 15,
    marginVertical: 8,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  cropText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2E7D32',
  },
});
