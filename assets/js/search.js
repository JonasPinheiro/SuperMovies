import { buscarFilmePorNome } from "./service.js";

const url = window.location.href;
const query = url.split("=")[1];
const main = document.querySelector("main");

document.addEventListener("DOMContentLoaded", () => {
    if(query != ""){
        criarCards(query);
    }else{
        const notResult = document.createElement("h2");
        notResult.textContent = "Sem resultados...";
        main.appendChild(notResult);
    }
});

async function carregarInformacoesPorNome(nome) {
    try{
        const data =  await buscarFilmePorNome(nome);
        return data;
    } catch(err){
        console.error(`Erro ao carregar Informações!!! ${err}`);
        return null;
    }
}

async function criarCards(nome){
    const data = await carregarInformacoesPorNome(nome);
    console.log(data.results);
    
    data.results.forEach((filme) => {
        const container = document.createElement("section");
        container.setAttribute("class", "container");

        const releaseDate = new Date(filme.release_date);
        const formattedDate = releaseDate.toLocaleDateString("pt-BR");

        const figure = document.createElement("figure");
        figure.setAttribute("class", "container__imgContainer");

        const img = document.createElement("img");
        img.setAttribute("class", "container__img");
        img.src = filme.backdrop_path ? `https://image.tmdb.org/t/p/w500${filme.backdrop_path}` : "/assets/imgs/semImagem.jpg";

        const article = document.createElement("article");
        article.setAttribute("class", "container__content");

        const title = document.createElement("h2");
        title.setAttribute("class", "container__title");
        title.textContent = filme.original_title;

        const hr = document.createElement("hr");
        
        const overview = document.createElement("p");
        overview.setAttribute("class", "container__overview");
        overview.textContent = `Sinopse: ${filme.overview}`;

        const releaseDateElement = document.createElement("p");
        releaseDateElement.setAttribute("class", "container__releaseDate");
        releaseDateElement.textContent = `Data de Lançamento: ${formattedDate}`;
        
        const genre = document.createElement("p");
        genre.setAttribute("class", "container__genre");
        genre.textContent = `Gêneros: ${filme.genre_name.join(" - ")}`

        const rating = document.createElement("p");
        rating.setAttribute("class", "container__rating");
        rating.textContent = `Nota: ${(filme.vote_average).toFixed(2)}`;

        const a = document.createElement("a");
        a.setAttribute("href", `/film.html?id=${filme.id}`);
        
        const btnDetails = document.createElement("button");
        btnDetails.textContent = "Ver Detalhes";

        figure.appendChild(img);
        a.appendChild(btnDetails)
        article.append(title, hr, overview, releaseDateElement, genre, rating, a);
        container.append(figure, article);
        main.appendChild(container);
    })
}