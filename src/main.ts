import Livro from "./model/livro";

const livro = new Livro('Harry Potter e a Pedra Filosofal', 50.00, 0.10);
console.log(livro.precoComDesconto())