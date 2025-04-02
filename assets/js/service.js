async function pegarChaveApi(){
    try{
        const res = await fetch("/assets/config.json");
        const data = await res.json();
        const apiKey = Object.values(data);
        return apiKey[0];
    }
    catch(err){
        console.error(`Erro ao carregar a chave: ${err}`);
    }
}

export async function buscarTodosOsFilmes() {
    const apiKey = await pegarChaveApi();
    const language = "pt-BR";

    try{
        const resGenereos = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`);
        const { genres: generos } = await resGenereos.json();

        const generosNames = {};

        generos.forEach(genero =>{
            generosNames[genero.id] = genero.name;
        })

        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}`);
        const filmes = await res.json();
        
        filmes.results.forEach(filme => {
            filme.genre_name = filme.genre_ids.map(id => generosNames[id] || "Desconhecido");
        });

        return filmes;
    }catch(err){
        console.error(`Erro ao buscar todos os filmes!!! ${err}`);
    }
}

export async function buscarFilmesQueChegamEmBreve(){
    const apiKey = await pegarChaveApi();
    const language = "pt-BR";

    try{
        const resGenereos = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`);
        const { genres: generos } = await resGenereos.json();

        const generosNames = {};

        generos.forEach(genero =>{
            generosNames[genero.id] = genero.name;
        })

        const resEmBreve = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=${language}`);
        const filmes = await resEmBreve.json();

        filmes.results.forEach(filme => {
            filme.genre_name = filme.genre_ids.map(id => generosNames[id] || "Desconhecido");
        });

        return filmes;
    }catch(err){
        console.error(`Erro ao buscar filmes que chegam em breve!!! ${err}`);
    }
}

export async function buscarFilmePorId(id) {
    const apiKey = await pegarChaveApi();
    const language = "pt-BR";

    try{
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${language}`);
        const data = await res.json();
        return data;
    }catch(err){
        console.log(`Erro ao buscar filme pelo seu id!!! ${err}`);
    }
}

export async function buscarFilmePorNome(nome){
    const apiKey = await pegarChaveApi();
    const language = "pt-BR";

    try{
        const resGenereos = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`);
        const { genres: generos } = await resGenereos.json();

        const generosNames = {};

        generos.forEach(genero =>{
            generosNames[genero.id] = genero.name;
        })

        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${nome}&language=${language}`);
        const data = await res.json();

        data.results.forEach(filme => {
            filme.genre_name = filme.genre_ids.map(id => generosNames[id] || "Desconhecido");
        });
        
        return data;
    }catch(err){
        console.error(`Erro ao buscar filme!!! ${err}`);
    }
}

