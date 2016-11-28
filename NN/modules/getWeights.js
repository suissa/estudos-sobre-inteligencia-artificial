const getWeights = (numHiddenLayers, vecLayers) => {
  weights = []

  //for each layer
  for (let i = 0; i < numHiddenLayers + 1; ++i)
    //for each neuron
    for (let j = 0; j < vecLayers[i].numNeurons; ++j)
      //for each weight
      for (let k = 0; k < vecLayers[i].vecNeurons[j].numInputs; ++k)
        weights.push(vecLayers[i].vecNeurons[j].m_vecWeight[k])

  return weights
}
module.exports = getWeights