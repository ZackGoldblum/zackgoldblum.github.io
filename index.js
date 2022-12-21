document.querySelector("#main_title").onclick = function(){
    document.querySelector("#projects").style.color = "whitesmoke";
    document.querySelector("#publications").style.color = "whitesmoke";
    document.querySelector("#bookshelf").style.color = "whitesmoke";
    document.querySelector("#about").style.color = "whitesmoke";

    const a = document.querySelector("#body_text");
    a.innerText = "Hello! Welcome to my website."

}

document.querySelector("#projects").onclick = function(){
    document.querySelector("#projects").style.color = "whitesmoke";
    document.querySelector("#publications").style.color = "gray";
    document.querySelector("#bookshelf").style.color = "gray";
    document.querySelector("#about").style.color = "gray";

    const a = document.querySelector("#body_text");
    a.innerText = "Projects"

}

document.querySelector("#publications").onclick = function(){
    document.querySelector("#projects").style.color = "gray";
    document.querySelector("#publications").style.color = "whitesmoke";
    document.querySelector("#bookshelf").style.color = "gray";
    document.querySelector("#about").style.color = "gray";

    const a = document.querySelector("#body_text");
    a.innerText = "Publications"

}

document.querySelector("#bookshelf").onclick = function(){
    document.querySelector("#projects").style.color = "gray";
    document.querySelector("#publications").style.color = "gray";
    document.querySelector("#bookshelf").style.color = "whitesmoke";
    document.querySelector("#about").style.color = "gray";

    const a = document.querySelector("#body_text");
    a.innerText = "Bookshelf"

}

document.querySelector("#about").onclick = function(){
    document.querySelector("#projects").style.color = "gray";
    document.querySelector("#publications").style.color = "gray";
    document.querySelector("#bookshelf").style.color = "gray";
    document.querySelector("#about").style.color = "whitesmoke";

    const a = document.querySelector("#body_text");
    a.innerText = "About"

}