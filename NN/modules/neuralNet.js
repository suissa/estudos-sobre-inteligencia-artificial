
//*************************** methods for Neuron **********************
//---------------------------------------------------------------------
function SNeuron(amountWeights){

	const defaultValue = 0.0
	return require('./neuron')(amountWeights, defaultValue)
}
// console.log('SNeuron', SNeuron(9))
//************************ methods for NeuronLayer **********************
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
function SNeuronLayer(NumNeurons, NumInputsPerNeuron){

	return require('./neuronLayer')(NumNeurons, NumInputsPerNeuron)
}
console.log('SNeuronLayer', SNeuronLayer(9, 2))

const infos = {
	m_NumInputs: 8,
	m_NumOutputs: 8,
	m_NumHiddenLayers: 0,
	m_NeuronsPerHiddenLyr: 0,
}

const layers = SNeuronLayer(9, 2)

function CNeuralNet(infos = {}, layers = []) {
	// const infos = {
	// 	m_NumInputs: 8,
	// 	m_NumOutputs: 8,
	// 	m_NumHiddenLayers: 0,
	// 	m_NeuronsPerHiddenLyr: 0,
	// 	m_vecLayers: [],
	// }

	// Object.assign(I, infos);

	Object.assign(this, Object.assign(I, infos));

	this.CreateNet = function(iNumInputs, iNeuronsPerHiddenLayer, iNumHiddenLayers, iNumOutputs) {

		this.m_NumInputs = iNumInputs;
		this.m_NumOutputs = iNumOutputs;
		this.m_NumHiddenLayers = iNumHiddenLayers;
		this.m_NeuronsPerHiddenLyr = iNeuronsPerHiddenLayer;
		
		//create the layers of the network
		if (!this.m_NumHiddenLayers) { // > 0
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
			if (i) inputs = outputs;

			outputs = [];
			cWeight = 0;

			//for each neuron sum the (inputs * corresponding weights).Throw 
			//the total at our sigmoid function to get the output.

			var layer = this.m_vecLayers[i];
			console.log('this', this)
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

module.exports = CNeuralNet
