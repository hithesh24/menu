import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';

// Sample data for DIY tools
const diyTools = [
  {
    id: '1',
    name: 'Bottle Drip Irrigation',
    description: 'Create a low-cost drip irrigation system using recycled plastic bottles.',
    difficulty: 'Easy',
    time: '30 minutes',
    materials: [
      '5-10 plastic bottles',
      'Scissors or craft knife',
      'Thin nail or skewer',
      'String or wire (optional)'
    ],
    steps: [
      'Clean plastic bottles thoroughly and remove labels.',
      'Cut off the bottom of each bottle.',
      'Make 3-4 small holes in the bottle cap using a nail or skewer.',
      'Dig small holes near plant roots and bury the bottles cap-down, with the open bottom exposed.',
      'Fill bottles with water as needed - they will slowly release water to plant roots.'
    ],
    tips: 'Use larger bottles for plants that need more water. Cover the open bottom with mesh to prevent mosquito breeding.'
  },
  {
    id: '2',
    name: 'PVC Pipe Irrigation System',
    description: 'Build a simple but effective irrigation pipeline using PVC pipes.',
    difficulty: 'Medium',
    time: '2-3 hours',
    materials: [
      'PVC pipes (diameter depends on your needs)',
      'PVC connectors (elbows, T-joints)',
      'PVC glue',
      'Drill with small bits',
      'Measuring tape',
      'Saw for cutting pipes'
    ],
    steps: [
      'Plan your irrigation layout based on your garden or field size.',
      'Cut PVC pipes to appropriate lengths.',
      'Drill small holes in pipes where water should come out.',
      'Connect pipes using appropriate connectors and PVC glue.',
      'Ensure one end connects to your water source.',
      'Test the system to ensure proper water flow and adjust hole sizes if needed.'
    ],
    tips: 'Make holes smaller at the far end of pipes to ensure even water distribution throughout the system.'
  },
  {
    id: '3',
    name: 'Soil Moisture Meter',
    description: 'Create a simple electronic soil moisture meter to determine when to water your plants.',
    difficulty: 'Advanced',
    time: '1-2 hours',
    materials: [
      'Arduino or similar microcontroller',
      'Soil moisture sensor probes',
      'Jumper wires',
      'Small display (optional)',
      'Power source (battery or USB)',
      'Project box or waterproof enclosure'
    ],
    steps: [
      'Connect soil moisture sensor to Arduino using jumper wires.',
      'Upload the provided code to your Arduino.',
      'Calibrate your sensor in dry soil and in water to set thresholds.',
      'Place sensor probes in soil near plant roots.',
      'Read moisture levels and water accordingly.'
    ],
    tips: 'Different plants have different moisture needs. Research optimal moisture levels for your specific crops.'
  },
  {
    id: '4',
    name: 'Rain Barrel Collection System',
    description: 'Harvest rainwater for irrigation to save costs and conserve water.',
    difficulty: 'Medium',
    time: '3-4 hours',
    materials: [
      'Large plastic drum or barrel',
      'Downspout diverter',
      'Mesh screen',
      'Spigot kit',
      'Drill with bits',
      'Silicone sealant',
      'Overflow pipe'
    ],
    steps: [
      'Clean the barrel thoroughly.',
      'Cut a hole near the bottom and install the spigot.',
      'Cut a hole in the lid for the downspout connection.',
      'Install mesh screen to filter debris.',
      'Position barrel under a downspout and connect.',
      'Create an overflow system to direct excess water away from buildings.'
    ],
    tips: 'Elevate your rain barrel on a sturdy platform to increase water pressure and make filling watering cans easier.'
  },
  {
    id: '5',
    name: 'Solar-Powered Water Pump',
    description: 'Create a sustainable irrigation system powered by solar energy.',
    difficulty: 'Advanced',
    time: '4-5 hours',
    materials: [
      'Small solar panel (5-20W depending on pump size)',
      'DC water pump',
      'Wires and connectors',
      'Small battery bank (optional, for cloudy days)',
      'Charge controller (if using battery)',
      'Water tubing',
      'Mounting hardware'
    ],
    steps: [
      'Mount the solar panel in a sunny location.',
      'Connect the solar panel to the charge controller (if using battery).',
      'Connect the pump to the power system.',
      'Attach water tubing to the pump inlet and outlet.',
      'Place the pump inlet in your water source.',
      'Direct the outlet tubing to your garden or field.'
    ],
    tips: 'Adding a small battery allows the system to work during cloudy periods or to run on a timer.'
  }
];

export default function DIYToolsScreen() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openToolDetails = (tool) => {
    setSelectedTool(tool);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🛠️ DIY Irrigation Tools</Text>
        <Text style={styles.subtitle}>
          Build your own affordable and effective irrigation solutions
        </Text>
      </View>

      {/* Main content */}
      <View style={styles.toolsContainer}>
        {diyTools.map((tool) => (
          <TouchableOpacity
            key={tool.id}
            style={styles.toolCard}
            onPress={() => openToolDetails(tool)}
          >
            <Text style={styles.toolIcon}>
              {tool.id === '1' ? '🍶' : 
               tool.id === '2' ? '🔧' :
               tool.id === '3' ? '📊' :
               tool.id === '4' ? '🌧️' : '☀️'}
            </Text>
            <View style={styles.toolInfo}>
              <Text style={styles.toolName}>{tool.name}</Text>
              <Text style={styles.toolDescription} numberOfLines={2}>
                {tool.description}
              </Text>
              <View style={styles.toolMeta}>
                <Text style={styles.difficultyLabel}>{tool.difficulty}</Text>
                <Text style={styles.timeLabel}>{tool.time}</Text>
              </View>
            </View>
            <Text style={styles.detailsArrow}>▶</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Innovation Corner */}
      <View style={styles.innovationCorner}>
        <Text style={styles.sectionTitle}>💡 Innovation Corner</Text>
        <Text style={styles.innovationText}>
          Have you created an innovative irrigation solution? Share your design with our community and help fellow farmers!
        </Text>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share Your Design</Text>
        </TouchableOpacity>
      </View>

      {/* Tool Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTool && (
              <ScrollView>
                <Text style={styles.modalTitle}>{selectedTool.name}</Text>
                
                <View style={styles.modalMeta}>
                  <Text style={styles.modalDifficulty}>Difficulty: {selectedTool.difficulty}</Text>
                  <Text style={styles.modalTime}>⏱️ {selectedTool.time}</Text>
                </View>
                
                <Text style={styles.modalDescription}>{selectedTool.description}</Text>
                
                <Text style={styles.modalSectionTitle}>Materials Needed:</Text>
                {selectedTool.materials.map((material, index) => (
                  <Text key={index} style={styles.listItem}>• {material}</Text>
                ))}
                
                <Text style={styles.modalSectionTitle}>Steps:</Text>
                {selectedTool.steps.map((step, index) => (
                  <Text key={index} style={styles.listItem}>
                    {index + 1}. {step}
                  </Text>
                ))}
                
                <View style={styles.tipsContainer}>
                  <Text style={styles.tipsTitle}>💡 Pro Tips:</Text>
                  <Text style={styles.tipsText}>{selectedTool.tips}</Text>
                </View>
                
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
  toolsContainer: {
    padding: 15,
  },
  toolCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toolIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  toolInfo: {
    flex: 1,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064420',
    marginBottom: 5,
  },
  toolDescription: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 8,
  },
  toolMeta: {
    flexDirection: 'row',
  },
  difficultyLabel: {
    fontSize: 12,
    color: '#2E7D32',
    backgroundColor: '#E6F2E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  timeLabel: {
    fontSize: 12,
    color: '#2E7D32',
    backgroundColor: '#E6F2E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  detailsArrow: {
    fontSize: 14,
    color: '#064420',
  },
  innovationCorner: {
    backgroundColor: '#E6F2E9',
    margin: 15,
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#064420',
    marginBottom: 10,
  },
  innovationText: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 15,
  },
  shareButton: {
    backgroundColor: '#064420',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#064420',
    marginBottom: 10,
  },
  modalMeta: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  modalDifficulty: {
    fontSize: 14,
    color: '#2E7D32',
    backgroundColor: '#E6F2E9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 10,
  },
  modalTime: {
    fontSize: 14,
    color: '#2E7D32',
  },
  modalDescription: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#064420',
    marginTop: 10,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 5,
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: '#F4FAF3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#064420',
    marginBottom: 5,
  },
  tipsText: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#064420',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});