const Neuron = require('./neuron.js')

module.exports = (amountNeurons, amountWeight) => 
  Array.from({length: amountNeurons}, () => Neuron(amountWeight))
  