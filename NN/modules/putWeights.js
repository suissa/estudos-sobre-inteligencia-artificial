const putWeights = (numHiddenLayers, vecLayers, weights) => {
  weight = 0
  //for each layer
  for (let i = 0; i < numHiddenLayers + 1; ++i) 
    //for each neuron
    for (let j = 0; j < vecLayers[i].m_NumNeurons; ++j) 
      //for each weight
      for (let k = 0; k < vecLayers[i].m_vecNeurons[j].m_NumInputs; ++k) 
        vecLayers[i].m_vecNeurons[j].m_vecWeight[k] = weights[weight++]
  
  return vecLayers
}

module.exports = putWeights