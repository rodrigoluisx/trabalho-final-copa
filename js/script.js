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