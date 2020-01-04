const sigmoid = x => 1 / (1 + Math.exp(-x))

const derivativeSigmoid = x => x * (1 - x)

class NeuralNetwork {
    constructor (iNodes, hNodes, oNodes) {
        this.iNodes = iNodes
        this.hNodes = hNodes
        this.oNodes = oNodes

        this.biasIH = new Matriz(this.hNodes, 1)
        this.biasIH.randomize()
        this.biasHO = new Matriz(this.oNodes, 1)
        this.biasHO.randomize()

        this.weigthsIH = new Matriz(this.hNodes, this.iNodes)
        this.weigthsIH.randomize()

        this.weigthsHO = new Matriz(this.oNodes, this.hNodes)
        this.weigthsHO.randomize()

        this.learningRate = 0.1
    }

    train (arr, target) {
        let input = Matriz.arrayToMatriz(arr)

        let hidden = Matriz.multiply(this.weigthsIH, input)
        hidden = Matriz.add(hidden, this.biasIH)
        hidden.map(sigmoid)

        let output = Matriz.multiply(this.weigthsHO, hidden)
        output = Matriz.add(output, this.biasHO)
        output.map(sigmoid)

        let expected = Matriz.arrayToMatriz(target)
        let outputError = Matriz.subtract(expected, output)
        let derivativeOutput = Matriz.map(output, derivativeSigmoid)
        let hiddenTranspose = Matriz.transpose(hidden)

        let gradient = Matriz.hadamard(derivativeOutput, outputError)
        gradient = Matriz.escalarMultiply(gradient, this.learningRate)

        this.biasHO = Matriz.add(this.biasHO, gradient)

        let weigthsHODeltas = Matriz.multiply(gradient, hiddenTranspose)
        this.weigthsHO = Matriz.add(this.weigthsHO, weigthsHODeltas)

        let weigthsHOTranspose = Matriz.transpose(this.weigthsHO)
        let hiddenError = Matriz.multiply(weigthsHOTranspose, outputError)
        let derivativeHidden = Matriz.map(hidden, derivativeSigmoid)
        let inputTranspose = Matriz.transpose(input)

        let gradientHidden = Matriz.hadamard(derivativeHidden, hiddenError)
        gradientHidden = Matriz.escalarMultiply(gradientHidden, this.learningRate)

        this.biasIH = Matriz.add(this.biasIH, gradientHidden)
        
        let weigthsIHDeltas = Matriz.multiply(gradientHidden, inputTranspose)
        this.weigthsIH = Matriz.add(this.weigthsIH, weigthsIHDeltas)
    }

    predict (arr) {
        // Input => Hidden
        let input = Matriz.arrayToMatriz(arr)

        let hidden = Matriz.multiply(this.weigthsIH, input)
        hidden = Matriz.add(hidden, this.biasIH)
        hidden.map(sigmoid)

        // Hidden => Output
        let output = Matriz.multiply(this.weigthsHO, hidden)
        output = Matriz.add(output, this.biasHO)
        output.map(sigmoid)

        return Matriz.matrizToArray(output)
    }
}