let botonPredecir = document.getElementById("buttonPredecir");
let botonEntrenar = document.getElementById("buttonEntrenar");
let entrenadoLabel = document.getElementById("entrenado");
let model; // Variable global para el modelo
let entrenado=false

function predecir() {
    let input = document.getElementById("input_number").value;
    if (isNaN(input)) {
        alert("!!!Ingrese un numero porfavor!!!");
    } else if (input.trim() === "") {
        alert("Por favor, ingrese un número.");
    } else {
        return parseFloat(input); // Convertir a número flotante
    }
}

async function entrenar() {
    // Crea un modelo secuencial
    model = tf.sequential();

    // Agrega una capa densa con una neurona
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Compila el modelo
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });

    // Define los datos de entrenamiento
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([4, 6, 8, 10, 12, 14], [6, 1]);

    // Entrena el modelo
    // await model.fit(xs, ys, { epochs: 250 });
    const surface = { name: "Loss", tab: "Training" };
    const history = [];
  
    await model.fit(xs, ys, {
      epochs: 2,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          history.push(logs);
          await tfvis.show.history(surface, history, ["loss"]);
          console.log(`Epoch ${epoch + 1}, Loss: ${logs.loss}`);
        }
      }
    });

    entrenadoLabel.innerText = "Ya está entrenado tu IA";
    entrenado=true
}

async function mostrarPrediccion() {
    let cajaResultado=document.getElementById("Caja")
    let input = predecir();
    console.log('Estado actual del div:', cajaResultado.style.display);
    
    if (entrenado==false){
            alert("Aun no has entrenado la IA")
            return
        }
        cajaResultado.style.display = 'block'

        // Predice el valor para un nuevo punto
        const prediction = model.predict(tf.tensor2d([[input]], [1, 1]));

        // Muestra la predicción
        const output = await prediction.data();
        document.getElementById('output_field').innerText = output;
}

botonPredecir.addEventListener("click", mostrarPrediccion);
botonEntrenar.addEventListener("click", entrenar);
