const NN = require('./modules/neuralNet')
const Neural = new NN

const inputs = [0.1, 0.2, 0.3, 0.4, 0.6, 0.9, 0.2, 0.3, 0.4]
const output = Neural.Update(inputs)

console.log('output', output)

// const infos = {
//  m_NumInputs: 8,
//  m_NumOutputs: 8,
//  m_NumHiddenLayers: 0,
//  m_NeuronsPerHiddenLyr: 0,
//  m_vecLayers: [],
// }
