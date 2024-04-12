let botonPredecir=document.getElementById("buttonPredecir")
let botonEntrenar=document.getElementById("buttonEntrenar")

function predecir(){
    let input=document.getElementById("input_number").value
    if (isNaN(input)){
        alert("!!!Ingrese un numero porfavor!!!")
    }else if (input.trim() === "") {
        alert("Por favor, ingrese un número.");
    }else{
        alert("el valor del input: " + input)
        learnLinear(input)
    }
}

function entrenar(){
    
}

botonPredecir.addEventListener("click", predecir)
botonPredecir.addEventListener("click", entrenar)


async function learnLinear() {
    // Crea un modelo secuencial
    const model = tf.sequential();

    // Agrega una capa densa con una neurona
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));

    // Compila el modelo
    model.compile({
      loss: 'meanSquaredError',
      optimizer: 'sgd'
    });

    // Define los datos de entrenamiento
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([4, 6, 8, 10, 12, 14], [6, 1]);

    // Entrena el modelo
    await model.fit(xs, ys, {epochs: 250});

    // Predice el valor para un nuevo punto
    const prediction = model.predict(tf.tensor2d([2], [1, 1]));

    // Muestra la predicción
    document.getElementById('output_field').innerText = prediction;
  }

  // Llama a la función para entrenar y predecir
//   learnLinear();

