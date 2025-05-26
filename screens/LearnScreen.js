import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Categories with their respective tutorials
const tutorialCategories = [
  {
    id: '1',
    title: 'Irrigation Basics',
    icon: '💧',
    color: '#E3F2FD',
    tutorials: [
      {
        id: '101',
        title: 'Understanding Irrigation Timing',
        duration: '5 min',
        level: 'Beginner'
      },
      {
        id: '102',
        title: 'Types of Irrigation Systems',
        duration: '8 min',
        level: 'Beginner'
      },
      {
        id: '103',
        title: 'Water Conservation Techniques',
        duration: '6 min',
        level: 'Intermediate'
      }
    ]
  },
  {
    id: '2',
    title: 'Smart Farming',
    icon: '🤖',
    color: '#E8F5E9',
    tutorials: [
      {
        id: '201',
        title: 'Using Soil Moisture Sensors',
        duration: '7 min',
        level: 'Intermediate'
      },
      {
        id: '202',
        title: 'Automated Irrigation Systems',
        duration: '10 min',
        level: 'Advanced'
      },
      {
        id: '203',
        title: 'Weather Data Integration',
        duration: '6 min',
        level: 'Intermediate'
      }
    ]
  },
  {
    id: '3',
    title: 'Crop-Specific Guides',
    icon: '🌾',
    color: '#FFF8E1',
    tutorials: [
      {
        id: '301',
        title: 'Rice Paddy Water Management',
        duration: '9 min',
        level: 'Intermediate'
      },
      {
        id: '302',
        title: 'Drip Irrigation for Vegetables',
        duration: '7 min',
        level: 'Beginner'
      },
      {
        id: '303',
        title: 'Fruit Trees Watering Schedule',
        duration: '8 min',
        level: 'Advanced'
      }
    ]
  },
  {
    id: '4',
    title: 'Water Management',
    icon: '🚰',
    color: '#E0F7FA',
    tutorials: [
      {
        id: '401',
        title: 'Rainwater Harvesting',
        duration: '6 min',
        level: 'Beginner'
      },
      {
        id: '402',
        title: 'Groundwater Conservation',
        duration: '8 min',
        level: 'Intermediate'
      },
      {
        id: '403',
        title: 'Water Quality Testing',
        duration: '5 min',
        level: 'Intermediate'
      }
    ]
  }
];

// Featured tutorials to showcase on the main screen
const featuredTutorials = [
  {
    id: '501',
    title: 'Setting Up Your First Drip Irrigation System',
    image: '💧',
    duration: '15 min',
    level: 'Beginner'
  },
  {
    id: '502',
    title: 'Monsoon Season Irrigation Planning',
    image: '☔',
    duration: '10 min',
    level: 'Intermediate'
  },
  {
    id: '503',
    title: 'AI-Powered Water Management',
    image: '🤖',
    duration: '12 min',
    level: 'Advanced'
  }
];

export default function LearnScreen() {
  const navigation = useNavigation();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  // Render a tutorial item
  const renderTutorialItem = ({ item }) => (
    <TouchableOpacity style={styles.tutorialItem}>
      <View style={styles.tutorialContent}>
        <Text style={styles.tutorialTitle}>{item.title}</Text>
        <View style={styles.tutorialMeta}>
          <Text style={styles.tutorialDuration}>⏱️ {item.duration}</Text>
          <Text style={styles.tutorialLevel}>📊 {item.level}</Text>
        </View>
      </View>
      <Text style={styles.arrowIcon}>▶️</Text>
    </TouchableOpacity>
  );

  // Render a featured tutorial item
  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity style={styles.featuredItem}>
      <Text style={styles.featuredImage}>{item.image}</Text>
      <Text style={styles.featuredTitle}>{item.title}</Text>
      <View style={styles.featuredMeta}>
        <Text style={styles.featuredDuration}>{item.duration}</Text>
        <Text style={styles.featuredLevel}>{item.level}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📚 Learn & Improve</Text>
        <Text style={styles.subtitle}>
          Enhance your farming knowledge with our educational content
        </Text>
      </View>

      {/* Featured Tutorials */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Tutorials</Text>
        <FlatList
          data={featuredTutorials}
          renderItem={renderFeaturedItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        />
      </View>

      {/* Tutorial Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        
        {tutorialCategories.map(category => (
          <View key={category.id} style={styles.categoryContainer}>
            <TouchableOpacity
              style={[styles.categoryHeader, { backgroundColor: category.color }]}
              onPress={() => toggleCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.expandIcon}>
                {expandedCategory === category.id ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>
            
            {expandedCategory === category.id && (
              <View style={styles.tutorialsList}>
                {category.tutorials.map(tutorial => (
                  <TouchableOpacity 
                    key={tutorial.id} 
                    style={styles.tutorialItem}
                    onPress={() => {
                      // In a real app, navigate to the tutorial detail screen
                      console.log(`Opening tutorial: ${tutorial.title}`);
                    }}
                  >
                    <View style={styles.tutorialContent}>
                      <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
                      <View style={styles.tutorialMeta}>
                        <Text style={styles.tutorialDuration}>⏱️ {tutorial.duration}</Text>
                        <Text style={styles.tutorialLevel}>📊 {tutorial.level}</Text>
                      </View>
                    </View>
                    <Text style={styles.arrowIcon}>▶️</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Quick Access Section */}
      <View style={styles.quickAccessSection}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        
        <View style={styles.quickAccessRow}>
          <TouchableOpacity 
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate('CropTutorials')}
          >
            <Text style={styles.quickAccessIcon}>🌾</Text>
            <Text style={styles.quickAccessText}>Crop Guides</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate('Weather')}
          >
            <Text style={styles.quickAccessIcon}>🌦️</Text>
            <Text style={styles.quickAccessText}>Weather</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.quickAccessRow}>
          <TouchableOpacity 
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate('AITips')}
          >
            <Text style={styles.quickAccessIcon}>🤖</Text>
            <Text style={styles.quickAccessText}>AI Tips</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate('DIYTools')}
          >
            <Text style={styles.quickAccessIcon}>🛠️</Text>
            <Text style={styles.quickAccessText}>DIY Tools</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FAF3',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#064420',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'center',
  },
  featuredSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#064420',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  featuredList: {
    paddingHorizontal: 15,
  },
  featuredItem: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featuredImage: {
    fontSize: 30,
    marginBottom: 10,
    alignSelf: 'center',
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#064420',
    marginBottom: 10,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredDuration: {
    fontSize: 12,
    color: '#2E7D32',
  },
  featuredLevel: {
    fontSize: 12,
    color: '#2E7D32',
  },
  categoriesSection: {
    marginBottom: 20,
  },
  categoryContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#064420',
  },
  expandIcon: {
    fontSize: 14,
    color: '#064420',
  },
  tutorialsList: {
    backgroundColor: '#FFFFFF',
  },
  tutorialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tutorialContent: {
    flex: 1,
  },
  tutorialTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#064420',
    marginBottom: 5,
  },
  tutorialMeta: {
    flexDirection: 'row',
  },
  tutorialDuration: {
    fontSize: 12,
    color: '#2E7D32',
    marginRight: 10,
  },
  tutorialLevel: {
    fontSize: 12,
    color: '#2E7D32',
  },
  arrowIcon: {
    fontSize: 14,
    color: '#064420',
  },
  quickAccessSection: {
    marginBottom: 30,
  },
  quickAccessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  quickAccessButton: {
    flex: 1,
    backgroundColor: '#E6F2E9',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: 'center',
  },
  quickAccessIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#064420',
  },
});