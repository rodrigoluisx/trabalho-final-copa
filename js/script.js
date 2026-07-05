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

function mostrarCuriosidade(){
    document.getElementById("curiosidade").innerHTML =
    "O Brasil é o único país que participou de todas as Copas do Mundo.";
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

// ---------------- CADASTRO ----------------

function getInputs(){
    return {
        nome: document.getElementById("nome"),
        email: document.getElementById("email"),
        senha: document.getElementById("senha"),
        jogador_favorito: document.getElementById("jogador_favorito"),
        data_nascimento: document.getElementById("nascimento"),
        cidade: document.getElementById("cidade")
    };
}

function getValores({nome,email,senha,jogador_favorito,data_nascimento,cidade}){
    return{
        nome: nome.value.trim(),
        email: email.value.trim(),
        senha: senha.value.trim(),
        jogador_favorito: jogador_favorito.value.trim(),
        data_nascimento: data_nascimento.value,
        cidade: cidade.value.trim()
    };
}

async function cadastrar(){

    const inputs = getInputs();
    const dados = getValores(inputs);

    await fetch("/api/usuarios",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(dados)
    });

    window.location.href="resultado.html";
}

// ---------------- RESULTADO ----------------

function calcularIdade(dataNascimento){

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if(mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())){
        idade--;
    }

    return idade;
}

async function mostrarResultado(){

    const resultado = document.getElementById("resultado");

    const resposta = await fetch("/api/usuarios");
    const usuarios = await resposta.json();

    if(usuarios.length === 0){
        resultado.innerHTML="<h2>Nenhum torcedor cadastrado.</h2>";
        return;
    }

    let html = `
    <h2>Torcedores Cadastrados</h2>

    <table border="1" cellpadding="10">
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Jogador Favorito</th>
            <th>Cidade</th>
            <th>Nascimento</th>
            <th>Idade</th>
        </tr>
    `;

    usuarios.forEach(usuario=>{

        const idade = calcularIdade(usuario.data_nascimento);

        html += `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.jogador_favorito}</td>
            <td>${usuario.cidade}</td>
            <td>${usuario.data_nascimento}</td>
            <td>${idade}</td>
        </tr>
        `;
    });

    html += "</table>";

    resultado.innerHTML = html;
}

// ---------------- EVENTOS ----------------

document.addEventListener("DOMContentLoaded",()=>{

    const btn = document.getElementById("btnEnviar");

    if(btn){
        btn.addEventListener("click",(e)=>{
            e.preventDefault();
            cadastrar();
        });
    }

    if(document.getElementById("resultado")){
        mostrarResultado();
    }

});