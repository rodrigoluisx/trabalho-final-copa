function boasVindas(){
    alert("Bem-vindo ao Portal da Seleção Brasileira!");
}

function trocarCor(){
    document.getElementById("titulo").style.color = "blue";
}

function aumentarImagem(img){
    img.style.width = "400px";
}

function destacar(elemento){
    elemento.style.color = "green";
    elemento.style.fontWeight = "bold";
}

function normal(elemento){
    elemento.style.color = "black";
    elemento.style.fontWeight = "normal";
}

function mostrarCuriosidade(){
    document.getElementById("curiosidade").innerHTML =
    "O Brasil é o único país que participou de todas as Copas do Mundo.";
}
function classificado(elemento){
    elemento.style.color = "green";
    elemento.style.fontWeight = "bold";
}

function eliminado(elemento){
    elemento.style.color = "red";
    elemento.style.textDecoration = "line-through";
}

function normal(elemento){
    elemento.style.color = "black";
    elemento.style.fontWeight = "normal";
    elemento.style.textDecoration = "none";
}
function foco(campo){
    campo.style.backgroundColor = "#ffffcc";
}

function sair(campo){
    campo.style.backgroundColor = "white";
}

function digitarNome(){
    document.getElementById("mensagem").innerHTML =
    "Digitando nome...";
}

function mostrarData(){
    document.getElementById("mensagem").innerHTML =
    "Data de nascimento selecionada!";
}

function salvarDados(event){

    event.preventDefault();

    localStorage.setItem(
        "nome",
        document.getElementById("nome").value
    );

    localStorage.setItem(
        "email",
        document.getElementById("email").value
    );

    localStorage.setItem(
        "nascimento",
        document.getElementById("nascimento").value
    );

    localStorage.setItem(
        "cidade",
        document.getElementById("cidade").value
    );

    window.location.href = "resultado.html";
}
function mostrarResultado(){

    let nome = localStorage.getItem("nome");
    let email = localStorage.getItem("email");
    let nascimento = localStorage.getItem("nascimento");
    let cidade = localStorage.getItem("cidade");

    let hoje = new Date();
    let dataNasc = new Date(nascimento);

    let idade = hoje.getFullYear() - dataNasc.getFullYear();

    let mes = hoje.getMonth() - dataNasc.getMonth();

    if(mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())){
        idade--;
    }

    let categoria = "";

    if(idade <= 16){
        categoria = "Torcedor Mirim";
    }
    else if(idade <= 30){
        categoria = "Torcedor Novato";
    }
    else{
        categoria = "Torcedor Experiente";
    }

    document.getElementById("resultado").innerHTML = `
        <h2>Cadastro Realizado com Sucesso!</h2>

        <p><strong>Nome:</strong> ${nome}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Cidade:</strong> ${cidade}</p>

        <p><strong>Data de Nascimento:</strong> ${nascimento}</p>

        <p><strong>Idade:</strong> ${idade} anos</p>

        <p><strong>Categoria:</strong> ${categoria}</p>
    `;
}
function getInputs(){
 return {
 nome: document.getElementById('nome'),
 email: document.getElementById('email'),
 senha: document.getElementById('senha'),
 jogador_favorito: document.getElementById('jogador_favorito'),
 data_nascimento: document.getElementById('nascimento'),
 cidade: document.getElementById('cidade')
 };
 }
 
 function getValores({nome, email, senha, jogador_favorito, data_nascimento, cidade}){
 return {
 nome: nome.value.trim(),
 email: email.value.trim(),
 senha: senha.value.trim(),
 jogador_favorito: jogador_favorito.value.trim(),
 data_nascimento: data_nascimento.value.trim(),
 cidade: cidade.value.trim()
 };
 }
 
 async function cadastrar(){
 const inputs = getInputs();
 const dados = getValores(inputs);
 
 
 await fetch('/api/usuarios', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(dados)
 });
 
 window.location.href = './../pages/resultado.html';
 }
 
 function calcularIdade(dataNascimento) {
 const anoHoje = new Date().getFullYear();
 const anoNascimento = new Date(dataNascimento).getFullYear();
 const idade = anoHoje - anoNascimento;
 
 return idade;
 }
 
 async function mostrarResultado(){
 const resultadoDiv = document.getElementById('resultado');
 const resposta = await fetch('/api/usuarios');
 const usuarios = await resposta.json();
 
 if (usuarios.length === 0) {
 resultadoDiv.innerHTML = '<p>Nenhum usuário cadastrado ainda.</p>';
 return;
 }
 
 let html = '<table><thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Senha</th><th>País</th><th>Data de Nascimento</th><th>Idade</th></tr></thead><tbody>';
 for (const usuario of usuarios) {
 const idade = calcularIdade(usuario.data_nascimento);
 html += <tr><td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td><td>${usuario.senha}</td><td>${usuario.pais}</td><td>${usuario.data_nascimento}</td><td>${idade}</td></tr>;
 }
 html += '</tbody></table>';
 
 resultadoDiv.innerHTML = html;
 }
 
 document.addEventListener('DOMContentLoaded', function() {
 const btnEnviar = document.getElementById('btnEnviar');
 if (btnEnviar) {
 btnEnviar.addEventListener('click', function(event) {
 event.preventDefault();
 cadastrar();
 });
 }
 
 if (document.getElementById('resultado')) {
 mostrarResultado();
 }
 });