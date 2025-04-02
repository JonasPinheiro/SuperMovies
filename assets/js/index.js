import {buscarTodosOsFilmes, buscarFilmesQueChegamEmBreve} from './service.js';

const container = document.querySelector("section.container");
const aSearch = document.querySelector("a.header__aSearch");
let counter = 0;

document.addEventListener("DOMContentLoaded", async () =>{
    await criarCards();
    await criarCarrosel(counter);

    setInterval(mudarCarrosel, 10000);
})

aSearch.addEventListener("click", () =>{
    aSearch.setAttribute("href", `/search.html?query=${document.querySelector(".header__inputSearch").value}`);
})

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
    const btnDetails = document.querySelector("button.carousel__btnDetails");
    const a = document.querySelector("a.carousel__a");

    img.src = resultado.backdrop_path ? `https://image.tmdb.org/t/p/w500${resultado.backdrop_path}` : "/assets/imgs/semImagem.jpg";

    title.textContent = resultado.original_title;
    overview.textContent = `Sinopse: ${resultado.overview}`;
    genre.textContent = `Generos: ${resultado.genre_name.join(" - ")}`;
    
    let getMinimumDate = new Date(data.dates.minimum);
    getMinimumDate = getMinimumDate.toLocaleDateString("pt-BR");
    minimumDate.textContent = `Data mínima: ${getMinimumDate}`;
    
    let getMaximumDate = new Date(data.dates.maximum);
    getMaximumDate = getMaximumDate.toLocaleDateString("pt-BR");
    maximumDate.textContent = `Data máxima: ${getMaximumDate}`;

    btnDetails.textContent = "Ver Detalhes";
    a.setAttribute("href", `/film.html?id=${resultado.id}`);
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

        const a = document.createElement("a");
        a.setAttribute("href", `/film.html?id=${filme.id}`);

        const btnDetails = document.createElement("button"); 
        btnDetails.textContent = "Ver Detalhes";
        btnDetails.setAttribute("class", "container__btnDetails");
        btnDetails.setAttribute("type", "button");
        
        figure.append(figCaption, img);
        a.appendChild(btnDetails);
        div.append(figure, overview, releaseDateElement, genre, rating, a);
        container.appendChild(div);
    })

    adicionarEspacoSeNecessario();
}

function adicionarEspacoSeNecessario() {
    const cards = document.querySelectorAll(".container__card");

    if (cards.length % 3 === 2) {
        const ghost = document.createElement("div");
        ghost.classList.add("container__card", "container__card--ghost");
        container.appendChild(ghost);
    }
}

