import alg from './ModExpontentes'

export const DyH = function(x_A, x_B, alfa, primo) {
    // 1) Calcular y_A e y_B
    let y_A = alg.expRapida(alfa, x_A, primo); // alfa^(x_A) % primo
    let y_B = alg.expRapida(alfa, x_B, primo); // alfa^(x_B) % primo

    // 2) Generar clave compartida K
    let K1 = alg.expRapida(y_B, x_A, primo); // y_B^(x_A) % primo
    let K2 = alg.expRapida(y_A, x_B, primo); // y_A^(x_B) % primo

    if(K1 != K2) alert("Error las claves K no son iguales");
    return {"K": K1, "A": y_A, "B": y_B}; 
}