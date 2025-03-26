import {buscarTodosOsFilmes} from './service.js';

const corpo = document.querySelector("body");
const container = document.querySelector("section.container");

corpo.addEventListener("DOMContentLoaded", criarCards());

async function criarCards(){
    const data = await buscarTodosOsFilmes();
    console.log(data.results);

    data.results.forEach((filme) =>{
        const dataLancamento = new Date(filme.release_date);
        const dataFormatada = dataLancamento.toLocaleDateString("pt-BR");

        const div = document.createElement("div");
        div.setAttribute("class", "container__card");

        const figure = document.createElement("figure");

        const figCaption = document.createElement("figcaption");
        figCaption.textContent = filme.original_title;

        const img = document.createElement("img");
        img.setAttribute("class", "container__img");

        console.log(filme);

        if(filme.backdrop_path != null){
            img.src = `https://image.tmdb.org/t/p/w500${filme.backdrop_path}`;
        }
        else{
            img.src = "/assets/imgs/semImagem.jpg";
        }
        

        const sinopse = document.createElement("p");
        sinopse.setAttribute("class", "container__overview");
        sinopse.textContent = `Sinopse: ${filme.overview}`;

        const dataLancamentoElement = document.createElement("p");
        dataLancamentoElement.textContent = `Data de Lançamento: ${dataFormatada}`;

        const nota = document.createElement("p");
        nota.textContent = `Nota ${(filme.vote_average).toFixed(2)}`;

        const btnDetalhes = document.createElement("button"); 
        btnDetalhes.textContent = "Ver Detalhes";
        btnDetalhes.setAttribute("class", "container__btnDetails");
        btnDetalhes.setAttribute("type", "button");
        
        figure.appendChild(figCaption);
        figure.appendChild(img);
        div.appendChild(figure);
        div.appendChild(sinopse);
        div.appendChild(dataLancamentoElement);
        div.appendChild(nota);
        div.appendChild(btnDetalhes);

        container.appendChild(div);
    })
}

