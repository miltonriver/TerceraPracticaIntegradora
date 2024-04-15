const suma = (numero1, numero2) => {    
    if(!numero1 || !numero2) return 0

    if(typeof numero1 !== "number" || typeof numero2 !== "number") return null

    let result = numero1 + numero2;
    return result
}

let testValidos = 0
let testTotales = 4

console.log('test de la función suma______________________________________________________')
console.log('test 1_______________________________________________________________________')
console.log('test 1, la función debe devolver null si algún parámetro es no numérico')

let test1 = suma("2", 2)
if(test1 === null){
    console.log('Test 1 pasó correctamente')
    testValidos++
} else {
    console.log(`Test 1 no ha pasado, se recibió ${typeof test1} pero se esperaba null`)
}

console.log('test 2 ______________________________________________________________________')
console.log('test 2, la función debe devolver 0 si no se recibe algún parámetro')
let test2 = suma(3)
if(test2 === 0){
    console.log('Test 2 pasó correctamente')
    testValidos++
} else {
    console.log(`Test 2 no ha pasado, se recibió ${typeof test2} pero se esperaba 0`)
}

console.log('test 3 ______________________________________________________________________')
console.log('test 3, la función debe devolver el resultado correcto')
let test3 = suma(3, 2)
if(test3 === 5){
    console.log('Test 3 pasó correctamente')
    testValidos++
} else {
    console.log(`Test 3 no ha pasado, se recibió ${typeof test3} pero se esperaba ${test3}`)
}

console.log('test 4 ______________________________________________________________________')
console.log('test 4, la función debe devolver la suma de todos los parámetros')
let test4 = suma(1, 2, 3, 4, 5)
if(test4 === suma){
    console.log('Test 4 pasó correctamente')
    testValidos++
} else {
    console.log(`Test 4 no ha pasado, se recibió ${typeof test1} pero se esperaba ${test4}`)
}

let testSuperados = testValidos + " de " + testTotales

console.log("test superados: ", testSuperados)