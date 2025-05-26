import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Switch
} from 'react-native';

export default function AITipsScreen() {
  const [cropType, setCropType] = useState('');
  const [soilType, setSoilType] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [rainSensor, setRainSensor] = useState(false);
  const [soilMoistureSensor, setSoilMoistureSensor] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [irrigationResults, setIrrigationResults] = useState(null);
  const [fertilizerTip, setFertilizerTip] = useState('');

  const getFertilizerTips = () => {
    const crop = cropType.toLowerCase();
    const stage = growthStage.toLowerCase();

    let recommendation = "Use a balanced fertilizer like NPK 10:10:10";

    if (crop === 'paddy') {
      if (stage === 'seedling') recommendation = "Use NPK 20:10:10 lightly for root development";
      else if (stage === 'vegetative') recommendation = "Apply Urea (46% N) to boost growth";
      else if (stage === 'flowering') recommendation = "Use DAP (Diammonium Phosphate)";
    } else if (crop === 'tomato') {
      if (stage === 'vegetative') recommendation = "Apply NPK 19:19:19 and Calcium Nitrate weekly";
      else if (stage === 'fruiting') recommendation = "Use Potassium-rich fertilizer like NPK 0:0:50";
    }

    return recommendation;
  };

  const calculateIrrigation = () => {
    const cropWaterNeeds = {
      paddy: 7.5,
      tomato: 5.0,
      potato: 4.0,
      onion: 3.5,
      carrot: 3.0,
      maize: 6.0,
      groundnut: 5.5,
      banana: 8.0,
      coffee: 4.5,
      default: 5.0
    };

    const soilAdjustment = {
      clay: 0.8,
      loam: 1.0,
      sandy: 1.3,
      silt: 0.9,
      default: 1.0
    };

    const cropKey = cropType.toLowerCase();
    const waterNeed = cropWaterNeeds[cropKey] || cropWaterNeeds.default;
    const soilKey = soilType.toLowerCase();
    const soilFactor = soilAdjustment[soilKey] || soilAdjustment.default;
    const sizeInSqMeters = parseFloat(fieldSize) * 4047 || 1000;
    const dailyWaterNeed = waterNeed * soilFactor * sizeInSqMeters;
    const technologyFactor = (rainSensor ? 0.85 : 1.0) * (soilMoistureSensor ? 0.8 : 1.0);
    const optimizedWaterNeed = dailyWaterNeed * technologyFactor;
    const traditionalMethod = dailyWaterNeed * 1.3;
    const waterSaved = traditionalMethod - optimizedWaterNeed;
    const percentSaved = (waterSaved / traditionalMethod) * 100;

    let scheduleRecommendation = "Water once daily in the morning";
    if (soilKey === 'sandy') {
      scheduleRecommendation = "Water twice daily in small amounts";
    } else if (soilKey === 'clay') {
      scheduleRecommendation = "Water every other day but deeply";
    }
    if (rainSensor) {
      scheduleRecommendation += " and skip during rainfall";
    }

    const fertilizer = getFertilizerTips();
    setFertilizerTip(fertilizer);

    setIrrigationResults({
      dailyWaterNeed: Math.round(optimizedWaterNeed),
      waterSaved: Math.round(waterSaved),
      percentSaved: Math.round(percentSaved),
      scheduleRecommendation,
      estimatedCost: Math.round(optimizedWaterNeed * 0.002)
    });

    setModalVisible(true);
  };

  const resetForm = () => {
    setCropType('');
    setSoilType('');
    setFieldSize('');
    setGrowthStage('');
    setRainSensor(false);
    setSoilMoistureSensor(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🤖 AI Irrigation Assistant</Text>
        <Text style={styles.subtitle}>
          Get smart irrigation and fertilizer tips based on your farm's condition
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Crop Type</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Paddy, Tomato"
            value={cropType}
            onChangeText={setCropType}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Soil Type</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Clay, Loam"
            value={soilType}
            onChangeText={setSoilType}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Field Size (acres)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. 1.5"
            value={fieldSize}
            onChangeText={setFieldSize}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Crop Growth Stage</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Seedling, Vegetative"
            value={growthStage}
            onChangeText={setGrowthStage}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Available Technology</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Rain Sensor</Text>
            <Switch value={rainSensor} onValueChange={() => setRainSensor(!rainSensor)} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Soil Moisture Sensor</Text>
            <Switch value={soilMoistureSensor} onValueChange={() => setSoilMoistureSensor(!soilMoistureSensor)} />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.calculateButton} onPress={calculateIrrigation}>
            <Text style={styles.buttonText}>Calculate Optimal Irrigation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>AI Recommendations</Text>
            {irrigationResults && (
              <>
                <Text style={styles.resultValue}>💧 Daily Water Need: {irrigationResults.dailyWaterNeed} liters</Text>
                <Text style={styles.resultValue}>💦 Water Saved: {irrigationResults.waterSaved} liters ({irrigationResults.percentSaved}%)</Text>
                <Text style={styles.resultValue}>💰 Estimated Cost: ₹{irrigationResults.estimatedCost}/day</Text>
                <Text style={styles.resultValue}>🕒 Schedule: {irrigationResults.scheduleRecommendation}</Text>
                <Text style={styles.resultValue}>🌿 Fertilizer Tip: {fertilizerTip}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FAF3' },
  header: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#064420', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#2E7D32', textAlign: 'center' },
  formContainer: { backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 10 },
  inputGroup: { marginBottom: 15 },
  inputLabel: { fontSize: 16, fontWeight: 'bold', color: '#064420' },
  textInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  switchLabel: { fontSize: 16, color: '#064420' },
  buttonContainer: { marginTop: 20 },
  calculateButton: { backgroundColor: '#064420', padding: 15, borderRadius: 10, marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  resetButton: { backgroundColor: '#e6f2e9', padding: 12, borderRadius: 10 },
  resetButtonText: { color: '#064420', textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '85%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#064420' },
  resultValue: { fontSize: 15, marginBottom: 8, color: '#2E7D32' },
  closeButton: { backgroundColor: '#064420', padding: 12, borderRadius: 10, marginTop: 10 },
  closeButtonText: { color: '#fff', textAlign: 'center' }
});
