
//returns a random integer between x and y
const RandInt = (x, y) => Math.floor(Math.random() *(y-x+1)) + x;

//returns a random float between zero and 1
const RandFloat = () => Math.rand() 

const CROSSOVER_RATE = 0.1
const WEIGHT_TOTAL = 10

const Crossover = (mum, dad) => {
  //just return parents as offspring dependent on the rate
  //or if parents are the same
  let baby1 = []
  let baby2 = []

  if ((RandFloat() > CROSSOVER_RATE) || (mum == dad)) {
    return [mum, dad]
  }
  //determine a crossover point
  cp = RandInt(0, WEIGHT_TOTAL - 1);

  //create the offspring
  for (let i=0; i < cp; ++i) {
    baby1.push(mum[i])
    baby2.push(dad[i])
  }

  for (i=cp; i < mum.size(); ++i) {
    baby1.push(dad[i])
    baby2.push(mum[i])
  }
  
  return[baby1,baby2]
}

module.exports = Crossover