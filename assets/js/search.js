import { buscarFilmePorNome } from "./service.js";

const url = window.location.href;
const query = url.split("=")[1];

document.addEventListener("DOMContentLoaded", carregarInformacoesPorNome(query));

async function carregarInformacoesPorNome(nome) {
    const data =  await buscarFilmePorNome(nome);
    console.log()
}