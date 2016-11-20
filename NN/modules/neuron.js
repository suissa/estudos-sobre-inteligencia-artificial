module.exports = (amountWeights, defaultValue=Math.random()) => 
  Array.from({ length: amountWeights }, () => defaultValue)