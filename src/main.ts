import $ from 'jquery'
import Livro from "./model/livro";

const livro = new Livro('Harry Potter e a Pedra Filosofal', 50.00, 0.10);
// console.log(livro.precoComDesconto())

$('body').append(`<h1>${livro.nome}</h1>`)
$('body').append(`<h2>Preço: R$${livro.precoComDesconto()}</h2>`)

