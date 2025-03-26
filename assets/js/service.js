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

    try{
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
        const filmes = await res.json();
        console.log(filmes);
    }catch(err){
        console.error(`Erro ao buscar todos os filmes: ${err}`);
    }
}

