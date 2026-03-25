function afficherChamps() {

    let type = document.getElementById("type-doc").value;

    if (type == "assurance")
    {
        document.querySelector("#assurance").style.display="block";
    }
else {
        document.querySelector("#assurance").style.display="none";

}
    if (type == "vignette")
    {
        document.querySelector("#vignette").style.display="block";

    }
    else {
        document.querySelector("#vignette").style.display="none";

}
    if (type == "controle-tech")
    {
        document.querySelector("#controle").style.display="block";

    }
    else {
        document.querySelector("#controle").style.display="none";

}
    if (type == "carte-grise")
    {
        document.querySelector("#carte-grise").style.display="block";

    }
    else {
        document.querySelector("#carte-grise").style.display="none";

}
}