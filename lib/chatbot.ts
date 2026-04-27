const agriculturalKnowledge: Record<string, string> = {
  'npk ratio': 'NPK (Nitrogen, Phosphorus, Potassium) ratios depend on soil type and crop. General recommendation: 20:20:20 for balanced growth, adjust based on soil test results.',
  'fertilizer': 'Choose between organic (compost, manure) and chemical fertilizers. Organic is sustainable, chemical provides quick nutrition. Apply during specific growth stages.',
  'nitrogen deficiency': 'Signs: yellowing leaves, stunted growth. Fix with urea, ammonium nitrate, or organic sources like neem cake. Apply split doses during growing season.',
  'soil ph': 'Most crops prefer pH 6.0-7.5. Acidic soil (pH<6): add lime. Alkaline soil (pH>7.5): add sulfur. Check pH annually.',
  'watering': 'Water requirements vary by crop and season. Generally, 1-2 inches per week. Water deeply but less frequently to encourage deep root growth.',
  'crop rotation': 'Rotate crops yearly to break pest cycles and improve soil. Legumes fix nitrogen, so plant them before nitrogen-demanding crops.',
  'pest control': 'Organic: neem oil, companion planting, manual removal. Chemical: pesticides as last resort. Integrated pest management (IPM) is most effective.',
  'fungal disease': 'Prevent with proper spacing, avoid overwatering, improve drainage. Treat with fungicide or sulfur spray at first signs.',
  'yield increase': 'Improve yield by: soil testing, proper fertilization, pest management, timely irrigation, quality seeds, and crop rotation.',
  'compost': 'Make compost from kitchen waste, plant residue. Takes 2-3 months. Improve soil structure and add organic matter. Apply 2-4 tons per acre.',
  'monsoon farming': 'Maximize rainfall with mulching, terrace farming, and water harvesting. Choose crops suited to wet conditions: rice, maize, pulses.',
  'summer crop': 'Best for irrigation-dependent crops: tomato, cucumber, onion. Use drip irrigation to save water. Mulch to retain moisture.',
  'micronutrients': 'Boron, zinc, iron, manganese needed in small amounts. Deficiency shows as leaf discoloration. Apply micronutrient fertilizer or foliar spray.',
  'weather advisory': 'Check local weather forecast regularly. Plan sowing based on rainfall predictions, avoid pesticide spray during rain or high wind, and adjust irrigation based on rainfall.',
  'drought': 'In drought conditions: mulch heavily, use drip irrigation, choose drought-resistant crops like millets and pulses, reduce frequency of operations.',
  'flood': 'In flood conditions: improve drainage, avoid waterlogging, plant water-tolerant crops, drain excess water from fields quickly.',
  'frost': 'Protect crops from frost by: mulching, smoke/fire near fields, sprinkle irrigation before frost, choose frost-resistant varieties.',
  'heat stress': 'During heat stress: increase irrigation frequency, apply mulch, use sprinklers for cooling, choose heat-tolerant varieties.',
  'irrigation timing': 'Best time to irrigate: early morning or evening to reduce evaporation. Avoid midday irrigation. Water deeply but infrequently.',
  'soil erosion': 'Prevent erosion with: terracing, contour plowing, crop residue retention, cover crops, windbreaks, and proper drainage.',
  'intercropping': 'Intercropping benefits: better resource use, pest management, improved soil, higher yields. Combine compatible crops like maize + pulses.',
}

export async function getAgriculturalAnswer(question: string): Promise<string> {
  const lowerQuestion = question.toLowerCase()

  // Find matching knowledge
  for (const [key, answer] of Object.entries(agriculturalKnowledge)) {
    if (lowerQuestion.includes(key)) {
      return answer
    }
  }

  // Default response
  return `I don't have specific information about "${question}", but I recommend: 1) Conduct a soil test for accurate data, 2) Consult local agricultural extension services, 3) Use weather-appropriate crop selection, 4) Practice sustainable farming methods. What specific aspect would you like to know more about?`
}
