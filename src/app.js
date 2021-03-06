// https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs
//SOLUÇÃO

const express = require("express");
const cors = require("cors");
const { validate: isUuid, v4: uuidv4 } = require("uuid");


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // for (let index = 0; index < repositories.length; index++) {
  //   const element = repositories[index];
  //   console.log(element);
  // }

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url ,techs} = request.body;
  const repository = { 
  id: uuidv4(),
  title,
  url,
  techs, 
  likes:0,
  };

  // if (!isUuid(id)) {
  //   return response.status(400).json({error:"Invalid Project id"});
  // }

  repositories.push(repository);
  
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url , techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex === -1) {
    return response.status(400).json({error: "Repository not found"});    
  }
  const repository = { 
  id,
  title,
  url,
  techs,
  likes:repositories[repositoryIndex].likes,};

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json({error: "Repository not found"});    
  } 

  repositories.splice(repositoryIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repository = repositories.findIndex(repository => repository.id === id);

  if (repository < 0) {
    return response.status(400).json({error:"Repository not found"});
  }

  repositories[repository].likes +=1

  return response.json(repositories[repository]);

});


module.exports = app;
