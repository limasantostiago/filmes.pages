const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
const filmesRouter = require('./routes/filmes.routes');
app.use("/filmes",filmesRouter);
app.listen(port,() => {
console.log(`servidor rodando na porta ${port}`);
});
