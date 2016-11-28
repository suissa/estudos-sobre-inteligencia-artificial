const neuronLayer = require('./neuronLayer')

const createNet = (numInputs, neuronsPerHiddenLayer, numHiddenLayers, numOutputs) => {

  let arrLayers = []

  if (amountHiddenLayers) {
    arrLayers.push(neuronLayer(neuronsPerHiddenLayer, numInputs))

    for (let i = 0; i < numHiddenLayers - 1; ++i) 
      arrLayers.push(neuronLayer(neuronsPerHiddenLayer, neuronsPerHiddenLayer))

    arrLayers.push(neuronLayer(numOutputs, neuronsPerHiddenLayer))
  }
  else 
    arrLayers.push(neuronLayer(numOutputs, numInputs))

  return arrLayers
}

module.exports = createNet