const lista = document.getElementById("lista");
const apiUrl = "http://localhost:3000/filmes";

let titulo = document.getElementById("titulo");
let imagem = document.getElementById("imagem");
let genero1 = document.getElementById("genero");
let nota = document.getElementById("nota");

let edicao = false;
let idEdicao = 0;
const getFilmes = async () => {
  const response = await fetch(apiUrl);
  const albuns = await response.json();
console.log(albuns);
  albuns.map((album) => { 
    lista.insertAdjacentHTML('beforeend',`
    <div class="col">
        <div class="card">
         <figure>
            <img src="${album.imagem}" class="card-img-top" alt="...">
            <span class="badge bg-dark">
                <figcaption>Avaliação: <h4>${album.avaliacao}</h4></figcaption>
            </span>
        </figure>
        <div class="card-body">
            <h5 class="card-title"><strong>${album.titulo}</strong></h5>
            <span class="badge bg-dark">${album.genero}</span>
            <div>
                <button class="btn btn-primary" onclick="editJogo('${album.id}')">Editar</button>
                <button class="btn btn-danger" onclick="deleteJogo('${album.id}')">Excluir</button>
            </div>
        </div>
    </div>
    `)
})
};
const submitForm = async (event) => {
  event.preventDefault();

  const album = {
    titulo: titulo.value,
    imagem: imagem.value,
    genero: genero1.value,
    nota: parseInt(nota.value),
  };

  if (edicao) {
    putFilme(album, idEdicao);
  } else {
    criarFilme(album);
  }

  clearFields();
  lista.innerHTML = "";
};

const criarFilme = async (album) => {
  const request = new Request(`${apiUrl}/add`, {
    method: "POST",
    body: JSON.stringify(album),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  const response = await fetch(request);

  const result = await response.json();

  alert(result.message);

  getFilmes();
};
const putAlbum = async (filme, id) => {
  const request = new Request(`${apiUrl}/edit/${id}`, {
    method: "PUT",
    body: JSON.stringify(filme),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  const response = await fetch(request);
  const result = await response.json();

  alert(result.message);
  edicao = false;
  idEdicao = 0;
  getAlbuns();
};
const deleteFilme = async (id) => {
  const request = new Request(`${apiUrl}/delete/${id}`, {
    method: "DELETE",
  });

  const response = await fetch(request);
  const result = await response.json();

  alert(result.message);

  lista.innerHTML = "";
  getFilmes();
};
const getFilmeById = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`);
  return await response.json();
};

const editFilme = async (id) => {
  edicao = true;
  idEdicao = id;

  const filme = await getFilmeById(id);

  titulo.value = filme.titulo;
  imagem.value = filme.imagem;
  genero.value = filme.genero;
  nota.value = filme.nota;
};

const clearFields = () => {
  titulo.value = "";
  imagem.value = "";
  genero.value = "";
  nota.value = "";
};

const assistido = async (id) =>{
let ok = true
const request = new Request(`${apiUrl}/${ok}/${id}`, {
method : 'PUT'
});
const response = await fetch(request);
const result = await response.json();
lista.innerHTML = '';
getAlbuns();
}

const naoAssistido = async (id) =>{
    let ok = false
    const request = new Request(`${apiUrl}/${ok}/${id}`, {
    method : 'PUT'
    });
    const response = await fetch(request);
    const result = await response.json();
    lista.innerHTML = '';
    getAlbuns();
    }
  getFilmes();

