const express = require('express');
const router = express.Router();
const filmes = [{
    id: 1,
    genero: "Ficção",
    titulo: "Matrix",
    imagem:"https://br.web.img2.acsta.net/medias/nmedia/18/91/08/82/20128877.JPG",
    avaliacao:"2"
},

{
    id: 2,
    genero: "Acão",
    titulo: "X Men",
    imagem:"https://upload.wikimedia.org/wikipedia/pt/e/e6/Xmen_apocalypse_ver18.jpg",
    avaliacao:"6"
},
{
    id: 3,
    genero: "Comédia",
    titulo: "Minha Mãe é uma Peça",
    imagem:"https://diariodorio.com/wp-content/uploads/2019/12/unnamed-4-scaled.jpg",
    avaliacao:"5"
}];

module.exports = router;

router.get("/", (req,res) =>{
    res.send(filmes);
    });

    router.get("/:id", (req,res) =>{
        const idParam = req.params.id;
        const filme = filmes.find(filme => filme.id == idParam); 
        res.send(filme);
        });

        router.post('/add',(req,res) =>{
            const novo = req.body;
            novo.id = filmes[filmes.length -1].id + 1;
            filmes.push(novo);
            res.send({
            filmes,
            message: `filme ${novo.titulo} Cadastrado com Sucesso !`,});
            });

            router.put('/edit/:id',(req,res) =>{
                const idParam = req.params.id;
                const novoFilme = req.body;
                let index = filmes.findIndex(filme => filme.id == idParam);
                albuns[index] = {
                    ...filmes[index],
                    ...novoFilme
                }
                res.send({
                    filmes,
                    message:'Editado com Sucesso'
                })
            });

            router.put('/:status/:id',(req,res) =>{
                const idParam = req.params.id;
                const filmesParams = req.params.status;
                let filmesParamsBolean = (filmesParams == 'true'); 
                let index = filmes.findIndex(filme => filme.id == idParam);
                filmes[index].assistido = filmesParamsBolean;
                const estadoEditado = filmes[index];    
                res.send({
                    estadoEditado
                })
                    
            });

            router.delete('/delete/:id',(req,res) =>{
                const idParam = req.params.id;
                const index = filmes.findIndex(filme => filme.id == idParam);
                const nomeFilme = filmes[index];
                filmes.splice(index, 1);
                res.send({
                    message: `Filme ${nomeFilme.titulo} excluido com sucesso !`,
                })
            });