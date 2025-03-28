import {buscarTodosOsFilmes, buscarFilmesQueChegamEmBreve} from './service.js';

const body = document.querySelector("body");
const container = document.querySelector("section.container");
const carousel = document.querySelector("section.carousel");
let counter = 0;

body.addEventListener("DOMContentLoaded", (criarCards()));
body.addEventListener("DOMContentLoaded", criarCarrosel(counter));
body.addEventListener("DOMContentLoaded", setInterval(mudarCarrosel , 10000));
    

async function mudarCarrosel(){
    counter++;
    criarCarrosel(counter)
}

async function criarCarrosel(count){
    const data = await buscarFilmesQueChegamEmBreve();
    const {results} = data;
    counter = counter >= results.length ? 0 : counter;
    
    const resultado = results[count];

    const img = document.querySelector("img.carousel__img");
    const title = document.querySelector("h2.carousel__title");
    const overview = document.querySelector("p.carousel__overview");
    const genre = document.querySelector("p.carousel__genre");
    const minimumDate = document.querySelector("p.carousel__minimumDate");
    const maximumDate = document.querySelector("p.carousel__maximumDate");

    if(resultado.backdrop_path != null){
        img.src = `https://image.tmdb.org/t/p/w500${resultado.backdrop_path}`;
    }
    else{
        img.src = "/assets/imgs/semImagem.jpg";
    }

    title.textContent = resultado.original_title;
    overview.textContent = `Sinopse: ${resultado.overview}`;
    genre.textContent = `Generos: ${resultado.genre_name.join(" - ")}`;
    
    let getMinimumDate = new Date(data.dates.minimum);
    getMinimumDate = getMinimumDate.toLocaleDateString("pt-BR");
    minimumDate.textContent = `Data mínima: ${getMinimumDate}`;
    
    let getMaximumDate = new Date(data.dates.maximum);
    getMaximumDate = getMaximumDate.toLocaleDateString("pt-BR");
    maximumDate.textContent = `Data máxima: ${getMaximumDate}`;
}

async function criarCards(){
    const data = await buscarTodosOsFilmes();

    data.results.forEach((filme) =>{
        const releaseDate = new Date(filme.release_date);
        const formattedDate = releaseDate.toLocaleDateString("pt-BR");

        const div = document.createElement("div");
        div.setAttribute("class", "container__card");

        const figure = document.createElement("figure");

        const figCaption = document.createElement("figcaption");
        figCaption.textContent = filme.original_title;

        const img = document.createElement("img");
        img.setAttribute("class", "container__img");

        if(filme.backdrop_path != null){
            img.src = `https://image.tmdb.org/t/p/w500${filme.backdrop_path}`;
        }
        else{
            img.src = "/assets/imgs/semImagem.jpg";
        }

        const overview = document.createElement("p");
        overview.setAttribute("class", "container__overview");
        overview.textContent = `Sinopse: ${filme.overview}`;

        const releaseDateElement = document.createElement("p");
        releaseDateElement.textContent = `Data de Lançamento: ${formattedDate}`;

        const genre = document.createElement("p");
        genre.textContent = `Gêneros: ${filme.genre_name.join(" - ")}`

        const rating = document.createElement("p");
        rating.textContent = `Nota: ${(filme.vote_average).toFixed(2)}`;

        const btnDetails = document.createElement("button"); 
        btnDetails.textContent = "Ver Detalhes";
        btnDetails.setAttribute("class", "container__btnDetails");
        btnDetails.setAttribute("type", "button");
        
        figure.appendChild(figCaption);
        figure.appendChild(img);
        div.appendChild(figure);
        div.appendChild(overview);
        div.appendChild(releaseDateElement);
        div.appendChild(genre);
        div.appendChild(rating);
        div.appendChild(btnDetails);

        container.appendChild(div);
    })
}

