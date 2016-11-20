
//returns a random integer between x and y
const RandInt = (x, y) => Math.floor(Math.random() *(y-x+1)) + x;

//returns a random float between zero and 1
const RandFloat = () => Math.rand() 

const CrossoverRate = 0.1

const Crossover = function(mum,dad) {
  //just return parents as offspring dependent on the rate
  //or if parents are the same
  if ((RandFloat() > this.m_dCrossoverRate) || (mum == dad)) {
    baby1 = mum;
    baby2 = dad;

    return [baby1,baby2];
  }

  //determine a crossover point
  cp = RandInt(0, this.m_iChromoLength - 1);

  //create the offspring
  for (i=0; i<cp; ++i)
  {
    baby1.push(mum[i]);
    baby2.push(dad[i]);
  }

  for (i=cp; i<mum.size(); ++i)
  {
    baby1.push(dad[i]);
    baby2.push(mum[i]);
  }
  
  return[baby1,baby2];
};