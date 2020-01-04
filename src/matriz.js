class Matriz {

    constructor (rows, cols) {
        this.rows = rows
        this.cols = cols
        
        this.data = []

        this.startData()
    }

    startData = _ => {
        for (let i = 0; i < this.rows; i++) {
            let arr = []
            for (let j = 0; j < this.cols; j++) arr.push(0)
            this.data.push(arr)
        }
    }

    print = _ => console.table(this.data)

    randomize = _ => this.map(_ => Math.random() * 2 - 1)

    map (func) {
        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j)
            })
        })

        return this
    }

    static map (A, func) {
        let matriz = new Matriz(A.rows, A.cols)

        matriz.data = A.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j)
            })
        })

        return matriz
    }

    static transpose (A) {
        var matriz = new Matriz(A.cols, A.rows)

        matriz.map((num,i,j) => A.data[j][i])

        return matriz
    }

    static escalarMultiply (A, escalar) {
        let func = (num, i, j) => A.data[i][j] * escalar
        return Matriz.action(A, func)
    }

    static hadamard (A, B) {
        let func = (num, i, j) => A.data[i][j] * B.data[i][j]
        return Matriz.action(A, func)
    }

    static add (A, B) {
        let func = (num, i, j) => A.data[i][j] + B.data[i][j]
        return Matriz.action(A, func)
    }

    static subtract (A, B) {
        let func = (num, i, j) => A.data[i][j] - B.data[i][j]
        return Matriz.action(A, func)
    }

    static action (A, func) {
        let matriz = new Matriz(A.rows, A.cols)

        matriz.map((num, i, j) => func(num, i, j))

        return matriz
    }

    static multiply (A, B) {
        var matriz = new Matriz(A.rows, B.cols)

        matriz.map((num, i, j) => {
            let sum = 0
            for (let k = 0; k < A.cols; k++) {
                sum += A.data[i][k] * B.data[k][j]
            }
            return sum
        })

        return matriz
    }

    static arrayToMatriz (arr) {
        let matriz = new Matriz(arr.length, 1)
        matriz.map((element, i, j) => arr[i])
        return matriz
    }

    static matrizToArray (obj) {
        let arr = []
        obj.map((element) => arr.push(element))
        return arr
    }
}