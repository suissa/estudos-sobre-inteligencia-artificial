/**
struct SNeuron
{

   //the number of inputs into the neuron

   int m_NumInputs;

 

   //the weights for each input

   vector<double> m_vecWeight;

 

   //ctor

   SNeuron(int NumInputs);

};

SNeuron::SNeuron(int NumInputs): m_NumInputs(NumInputs+1)
{

  //we need an additional weight for the bias hence the +1

  for (int i=0; i<NumInputs+1; ++i)

  {

    //set up the weights with an initial random value

    m_vecWeight.push_back(RandomClamped());

  }

}
*/