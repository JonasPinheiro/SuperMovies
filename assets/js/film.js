import { buscarFilmePorId } from "./service.js";

const url = window.location.href;

const idFilm = url.split("=")[1];

const body = document.querySelector("body");

body.addEventListener("DOMContentLoaded", carregarInformações(idFilm));

async function carregarInformações(id){
    const data = await buscarFilmePorId(id);
    console.log(data);
}