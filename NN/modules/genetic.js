const MAX_PERTUBATION = 0.3
const NUM_ELITE = 20
const NUM_ELITE_COPIES = 3
//returns a random integer between x and y
const RandInt = (x, y) => Math.floor(Math.random() *(y-x+1)) + x;

//returns a random float between zero and 1
const RandFloat = () => Math.rand() 

//returns a random bool
const RandBool = () => Math.round(Math.rand()) 

//returns a random float in the range -1 < n < 1
const  RandomClamped = () => RandFloat() - RandFloat()

function SGenome(_vecWeights, _dFitness)
{
	this.dFitness = _dFitness;
	this.vecWeights = _vecWeights;
};

function CGenAlg(I = {}) {

	const infos = {
		//this holds the entire population of chromosomes
		m_vecPop: [],

		//size of population
		m_iPopSize: 0,
		
		//amount of weights per chromo
		m_iChromoLength: 0,

		//total fitness of population
		m_dTotalFitness: 0,

		//best fitness this population
		m_dBestFitness: 0,

		//mean fitness this population
		m_dMeanFitness: 0,

		//stddev fitness this population
		m_dStdDevFitness: 0,

		//average fitness
		m_dAverageFitness: 0,

		//worst
		m_dWorstFitness: 0,

		//keeps track of the best genome
		m_iFittestGenome: 0,

		//probability that a chromosones bits will mutate.
		//Try figures around 0.05 to 0.3 ish
		m_dMutationRate: 0.0, 

		//probability of chromosones crossing over bits
		//0.7 is pretty good
		m_dCrossoverRate: 0.0,

		//generation counter
		m_cGeneration: 0
	}
	// Object.assign(I, infos);

	Object.assign(this, Object.assign(I, infos));

	this.init = function(popsize, MutRat, CrossRat, numweights){
		
		this.m_iPopSize = popsize;
		this.m_dMutationRate = MutRat;
		this.m_dCrossoverRate = CrossRat;
		this.m_iChromoLength = numwheights; 
		
		for (i=0; i<this.m_iPopSize; ++i)
		{
			this.m_vecPop.push(new SGenome());

			for (j=0; j<this.m_iChromoLength; ++j)
			{
				this.m_vecPop[i].vecWeights.push(RandomClamped());
			}
		}
	};
	
	//---------------------------------Mutate--------------------------------
	//
//		mutates a chromosome by perturbing its weights by an amount not 
//		greater than CParams::dMaxPerturbation
	//-----------------------------------------------------------------------
	this.Mutate = function(chromo)
	{
		//traverse the chromosome and mutate each weight dependent
		//on the mutation rate
		for (i=0; i < chromo.length; ++i)
		{
			//do we perturb this weight?
			if (RandFloat() < this.m_dMutationRate)
			{
				//add or subtract a small value to the weight
				chromo[i] += (RandomClamped() * MAX_PERTUBATION);
			}
		}
		return chromo;
	};
	
	//----------------------------------GetChromoRoulette()------------------
	//
//		returns a chromo based on roulette wheel sampling
	//
	//-----------------------------------------------------------------------
	this.GetChromoRoulette = function()
	{
		//generate a random number between 0 & total fitness count
		Slice = (RandFloat() * this.m_dTotalFitness);

		//this will be set to the chosen chromosome
		//TheChosenOne = SGenome({});
		
		//go through the chromosones adding up the fitness so far
		FitnessSoFar = 0;
		
		for (i = 0; i < this.m_vecPop.length; ++i)
		{
			FitnessSoFar += this.m_vecPop[i].dFitness;
			
			//if the fitness so far > random number return the chromo at 
			//this point
			if (FitnessSoFar >= Slice)
			{
				TheChosenOne = this.m_vecPop[i];

				break;
			}
		}

		return TheChosenOne;
	};
		
	
	//-------------------------------------Crossover()-----------------------
	//	
	//  given parents and storage for the offspring this method performs
	//		crossover according to the GAs crossover rate
	//-----------------------------------------------------------------------
	this.Crossover = function(mum,dad)
	{
		//just return parents as offspring dependent on the rate
		//or if parents are the same
		if ( (RandFloat() > this.m_dCrossoverRate) || (mum == dad)) 
		{
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
	
	this.CalculateBestWorstAvTot = function()
	{

		this.m_dBestFitness = this.m_vecPop[this.m_vecPop.length-1].dFitness;
		this.m_dWorstFitness = this.m_vecPop[0].dFitness;
		this.m_dTotalFitness = this.m_vecPop.reduce(function(a, b) { return a.dFitness + b.dFitness; });
		this.m_dAverageFitness = this.m_dTotalFitness / this.m_vecPop.length;

		accum = this.m_vecPop.reduce(function(a, b) {
			  return a + (b.dFitness - this.m_dAverageFitness) * (b.dFitness - this.m_dAverageFitness);
		}, 0);
	
		this.m_dStdDevFitness = Math.sqrt(accum / (this.m_vecPop.length-1));

	};


	//-------------------------GrabNBest----------------------------------
	//
    //		This works like an advanced form of elitism by inserting NumCopies
	//  copies of the NBest most fittest genomes into a population vector
	//--------------------------------------------------------------------
	this.GrabNBest = function(NBest,NumCopies)
	{
	  //add the required amount of copies of the n most fittest 
		//to the supplied vector
		if(NBest > this.m_vecPop.length)
			NBest = this.m_vecPop.length;

		best = 0;
		Pop = [];
		while(best < NBest)
		{
			for (i=0; i < NumCopies; ++i)
				Pop.push(this.m_vecPop[best]);
			best++;
		}
		return Pop;
	}


	//-----------------------------------Epoch()-----------------------------
	//
	//		takes a population of chromosones and runs the algorithm through one
	//		 cycle.
	//		Returns a new population of chromosones.
	//
	//-----------------------------------------------------------------------
	this.Epoch = function(old_pop){
		//assign the given population to the classes population
	  this.m_vecPop = old_pop;

	  //reset the appropriate variables
	  this.Reset();

	  this.m_vecPop.sort(function(a,b){ a.dFitness < b.dFitness; });
	   
	  //calculate best, worst, average and total fitness
	  this.CalculateBestWorstAvTot();
	  
	  //create a temporary vector to store new chromosones
	  vecNewPop = [];

	  //Now to add a little elitism we shall add in some copies of the
	  //fittest genomes. Make sure we add an EVEN number or the roulette
	  //wheel sampling will crash
		//if (!(CParams::iNumCopiesElite * CParams::iNumElite % 2))
		//{

	  vecNewPop = this.GrabNBest(NUM_ELITE, NUM_ELITE_COPIES);
		//}else
			//cout << "Odds number of copies!!" << endl;
		
		//repeat until a new population is generated
	 num_babies = vecNewPop.length;

	 if(num_babies%2){
		vecNewPop.push(vecNewPop[0]);
		num_babies++;
	 } 

	 while (vecNewPop.length < this.m_iPopSize)
		{
			//grab two chromosones
			mum = this.GetChromoRoulette();
			dad = this.GetChromoRoulette();

			//create some offspring via crossover
			
			babies = Crossover(mum.vecWeights, dad.vecWeights);
			
			//now we mutate
			baby1 = Mutate(baby[0]);
			baby2 = Mutate(baby[1]);

			//now copy into vecNewPop population
			vecNewPop.push(new SGenome(baby1, 0));
			vecNewPop.push(new SGenome(baby2, 0));
		}

		num_babies = vecNewPop.length - num_babies;

		//finished so assign new pop back into m_vecPop
		this.m_vecPop = vecNewPop;
		return this.m_vecPop;
	};

	//-------------------------Reset()------------------------------
	//
    //		resets all the relevant variables ready for a new generation
	//--------------------------------------------------------------
	this.Reset = function()
	{
		this.m_dTotalFitness	= 0;
		this.m_dBestFitness		= 0;
		this.m_dWorstFitness	= 9999999;
		this.m_dAverageFitness	= 0;
	};

	this.SetChromos = function(newPop){
		for(i=0;i<newPop.length;i++)
			this.m_vecPop[i] = newPop[i];
	}	
}

module.exports = CGenAlg
