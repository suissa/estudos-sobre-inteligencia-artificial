
//*************************** methods for Neuron **********************
//---------------------------------------------------------------------
function SNeuron(NumInputs){
	
	this.m_NumInputs = NumInputs + 1;
	this.m_vecWeight = [];
	
	//we need an additional weight for the bias hence the +1
	for (let i = 0; i < NumInputs + 1; ++i) {
		//set up the weights with an initial random value
		this.m_vecWeight[i] = 0.0;
	}
}

//************************ methods for NeuronLayer **********************
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
function SNeuronLayer(NumNeurons, NumInputsPerNeuron){
	
	this.m_NumNeurons = NumNeurons;
	this.m_vecNeurons = [];
	
	for(var i = 0; i < NumNeurons; i++){
		this.m_vecNeurons.push(new SNeuron(NumInputsPerNeuron));
	}
	
}

function CNeuralNet(I) {
	I = I || {};

	$.extend(I, {
		m_NumInputs: 0,
		m_NumOutputs: 0,
		m_NumHiddenLayers: 0,
		m_NeuronsPerHiddenLyr: 0,
		m_vecLayers: [],
	});

	$.extend(this, I);

	this.CreateNet = function(iNumInputs, iNeuronsPerHiddenLayer, iNumHiddenLayers, iNumOutputs) {

		this.m_NumInputs = iNumInputs;
		this.m_NumOutputs = iNumOutputs;
		this.m_NumHiddenLayers = iNumHiddenLayers;
		this.m_NeuronsPerHiddenLyr = iNeuronsPerHiddenLayer;
		
		//create the layers of the network
		if (this.m_NumHiddenLayers > 0) {
			//create first hidden layer
			this.m_vecLayers.push(new SNeuronLayer(this.m_NeuronsPerHiddenLyr, this.m_NumInputs));

			for (let i = 0; i < this.m_NumHiddenLayers - 1; ++i) 
				this.m_vecLayers.push(new SNeuronLayer(this.m_NeuronsPerHiddenLyr, this.m_NeuronsPerHiddenLyr));
			
			//create output layer
			this.m_vecLayers.push(new SNeuronLayer(this.m_NumOutputs, this.m_NeuronsPerHiddenLyr));
		}
		else 
			//create output layer
			this.m_vecLayers.push(new SNeuronLayer(this.m_NumOutputs, this.m_NumInputs));
		
	}

	//---------------------------------GetWeights-----------------------------
	//
   //		returns a vector containing the weights
	//
	//------------------------------------------------------------------------
	this.GetWeights = function() {
		//this will hold the weights
		weights = [];

		//for each layer
		for (let i = 0; i < this.m_NumHiddenLayers + 1; ++i)
			//for each neuron
			for (let j = 0; j < this.m_vecLayers[i].m_NumNeurons; ++j)
				//for each weight
				for (let k = 0; k < this.m_vecLayers[i].m_vecNeurons[j].m_NumInputs;++k)
					weights.push(this.m_vecLayers[i].m_vecNeurons[j].m_vecWeight[k]);

		return weights;
	}
	
	this.PutWeights = function(weights) {
		cWeight = 0;
		//for each layer
		for (let i = 0; i < this.m_NumHiddenLayers + 1; ++i) 
			//for each neuron
			for (let j = 0; j < this.m_vecLayers[i].m_NumNeurons; ++j) 
				//for each weight
				for (let k = 0; k < this.m_vecLayers[i].m_vecNeurons[j].m_NumInputs; ++k) 
					this.m_vecLayers[i].m_vecNeurons[j].m_vecWeight[k] = weights[cWeight++];
		
		return;
	}
	
	this.GetNumberOfWeights = function(){

		weights = 0;

		//for each layer
		for (let i = 0; i <= this.m_NumHiddenLayers; ++i) {
			//for each neuron
			for (let j = 0; j < this.m_vecLayers[i].m_NumNeurons; ++j) {
				//for each weight
				for (let k = 0; k < this.m_vecLayers[i].m_vecNeurons[j].m_NumInputs; ++k)
					weights++;
			}
		}
		return weights;
	}

	
	this.Update = function(inputs) {
		//stores the resultant outputs from each layer
		outputs = [];
		cWeight = 0;

		//first check that we have the correct amount of inputs
		if (inputs.length != this.m_NumInputs+1) {
			console.log("Wrong input size!", inputs.length, this.m_NumInputs+1);
			//just return an empty vector if incorrect.
			return outputs;
		}

		//For each layer....
		for (let i = 0; i < this.m_NumHiddenLayers + 1; ++i) {
			if (i > 0) {
				inputs = outputs;
			}

			outputs = [];
		
			cWeight = 0;

			//for each neuron sum the (inputs * corresponding weights).Throw 
			//the total at our sigmoid function to get the output.

			var layer = this.m_vecLayers[i];
				
			for (let j = 0; j < layer.m_NumNeurons; ++j) {
				var neuron = layer.m_vecNeurons[j];
				netinput = 0.0;

				NumInputs = neuron.m_NumInputs;
				//for each weight
				//netinput = inner_product(neuron->m_vecWeight.begin(),neuron->m_vecWeight.end(),inputs.begin(),0.0);
	
				for (let k = 0; k < NumInputs - 1; ++k){
					//sum the weights x inputs
					netinput += neuron.m_vecWeight[k] * inputs[cWeight++];
				}
				//add in the bias
				netinput += neuron.m_vecWeight[NumInputs - 1] * -1;
				
				outputs.push(0.5*Math.tanh(netinput*0.5)+0.5);
				cWeight = 0;
			}
		}

		return outputs;
	}

}
