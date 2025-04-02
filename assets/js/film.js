import { buscarFilmePorId } from "./service.js";
const url = window.location.href;
const idFilm = url.split("=")[1];

document.addEventListener("DOMContentLoaded", carregarInformacoesPorId(idFilm));

async function carregarInformacoesPorId(id){
    const data = await buscarFilmePorId(id);
    let releaseDate = new Date(data.release_date);
    releaseDate = releaseDate.toLocaleDateString("pt-BR");
    console.log(data);
    document.querySelector("title").textContent = `SuperMovies - ${data.original_title}`;

    document.querySelector(".film__img").src = data.backdrop_path ? `https://image.tmdb.org/t/p/w300${data.poster_path}` : "/assets/imgs/semImagem.jpg";
   
    document.querySelector(".film__title").textContent = data.original_title;
    document.querySelector(".film__overview").textContent = `Sinopse: ${data.overview}`
    document.querySelector(".film__genre").textContent = `Generos: ${data.genres.map(film => film.name).join(" - ")}`;
    document.querySelector(".film__releaseDate").textContent = `Data de Lançamento: ${releaseDate}`;
    document.querySelector(".film__runtime").textContent = `Duração: ${data.runtime} min`;
    document.querySelector(".film__language").textContent = `Idioma Original: ${data.original_language}`;
    document.querySelector(".film__rating").textContent = `Nota: ${data.vote_average}⭐`;
}