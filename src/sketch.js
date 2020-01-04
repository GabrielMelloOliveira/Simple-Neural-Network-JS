var train = true

function setup() {
    createCanvas(500, 500)
    background(0)
    
    neuralNetwork = new NeuralNetwork(2, 3, 1)

    // XOR Problem
    dataset = {
        inputs: [
            [1, 1],
            [1, 0],
            [0, 1],
            [0, 0],
        ],
        outputs: [
            [0],
            [1],
            [1],
            [0],
        ]
    }
}

function trainNeuralNetwork (times) {
    for (var i = 0; i < times; i++) {
        var index = floor(random(4))
        neuralNetwork.train(dataset.inputs[index], dataset.outputs[index])
    }

    console.log(`Treinamento concluido!`)
}

function resultTrain () {
    let result = {
        test_1_1: [ neuralNetwork.predict([1, 1])[0], 0],
        test_1_0: [ neuralNetwork.predict([1, 0])[0], 1],
        test_0_1: [ neuralNetwork.predict([0, 1])[0], 1],
        test_0_0: [ neuralNetwork.predict([0, 0])[0], 0]
    }

    console.table(result)
}

function draw() {
    if (train) {
        trainNeuralNetwork(500000)
        
        if (neuralNetwork.predict([0, 0])[0] < 0.04 && neuralNetwork.predict([1, 0])[0] > 0.98) {
            train = false
            console.log('Terminou!')
        }
    }
}