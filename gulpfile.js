// ARQUIVO ONDE SERÃO FEITAS AS TAREFAS DURANTE O PROCESSO DE BUILD DO GULP

const {series, parallel, src, dest} = require('gulp')
const del = require('del')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const tsify = require('tsify')

//gulp-uglify permite que o arquivo final app.js seja minificado
const uglify = require('gulp-uglify')

const rename = require('gulp-rename')

//Excluindo fisicamente a pasta 'dist' criada na build
function clearDist(callback){
  return del(['dist'])
}

//Copiando o arquivo que está contido na pasta 'public' e mover para a pasta 'dist'
function copyHTML(callback){
  return src('public/**/*').pipe(dest('dist'))
}

function generateJS(callback){
  return browserify({
    base: '.',  //Pasta atual
    entries: ['src/main.ts'] //Arquivos de saída
  }).plugin(tsify)
    .bundle()
    .pipe(source('app.js')) //Arquivo a ser gerado durante a build
    .pipe(dest('dist')) //Pasta de destino onde será criado o arquivo app.js
}

function gerarJSProducao(){
  return src('dist/app.js').pipe(rename('app.min.js')).pipe(uglify()).pipe(dest('dist'))
}

exports.default = series( //Processos a serem executados em série
  clearDist,
  parallel(generateJS, copyHTML), /*No método parallel, 
                                  serão definidos quais métodos que serão executados em paralelo
                                  em um processo de build do Gulp*/
  gerarJSProducao
)