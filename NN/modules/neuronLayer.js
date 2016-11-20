const SNeuron = require('./neuron.js')

module.exports = (NumNeurons, NumInputsPerNeuron) => 
  Array.from({length: NumNeurons}, () => SNeuron(NumInputsPerNeuron))
  