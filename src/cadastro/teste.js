const data = 1714577789907; // Suponha que seja um timestamp em milissegundos
const now = new Date().getTime(); // Obtém o timestamp atual em milissegundos

const diffMs = now - data; // Calcula a diferença em milissegundos
const diffMin = diffMs / (1000 * 60); // Converte a diferença para minutos

if (diffMin >= 15) {
    console.log("Já passaram 15 minutos desde a data fornecida.");
} else {
    console.log("Não passaram 15 minutos desde a data fornecida.");
}