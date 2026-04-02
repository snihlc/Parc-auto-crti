function toggleSidebar(){
                    document.getElementById("sidebar").classList.toggle("active");
                    document.getElementById("sidebar-overlay").classList.toggle("active");
                }

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

function affTypeMaintenance(){
    let type = document.getElementById("type-maintenance").value;
    let typeper = document.getElementById("type-periodique").value;

    if(type == "periodique"){
        document.querySelector(".mt-periodique").style.display = "block";
        document.querySelector(".mt-corrective").style.display = "none";

        if(typeper == "vidange"){
            document.querySelector(".vidange").style.display = "block";
            document.querySelector(".controle-frein").style.display = "none";
        } else if(typeper == "controle-frein") {
            document.querySelector(".controle-frein").style.display = "block";
            document.querySelector(".vidange").style.display = "none";
        } else {
            document.querySelector(".vidange").style.display = "none";
            document.querySelector(".controle-frein").style.display = "none";
        }

    } else if(type == "corrective") {
        document.querySelector(".mt-corrective").style.display = "block";
        document.querySelector(".mt-periodique").style.display = "none";
        document.querySelector(".vidange").style.display = "none";
        document.querySelector(".controle-frein").style.display = "none";

    } else {
        document.querySelector(".mt-periodique").style.display = "none";
        document.querySelector(".mt-corrective").style.display = "none";
        document.querySelector(".vidange").style.display = "none";
        document.querySelector(".controle-frein").style.display = "none";
    }
}

function enregistrerRavitaillement(){
let datePlein= document.getElementById("date-plein").value;
let station = document.getElementById("station").value;
let typeCarb = document.getElementById("type-carburant").value;
let quantiteCarb = document.getElementById("qte-carb").value;
let km = document.getElementById("kilometrage-carb").value;
let montantCarb = document.getElementById("montant-carb").value;

let tabCarb = document.querySelector("table tbody");
let nvlLigne =  `
    <tr>
        <td>${datePlein}</td>
        <td>${station}</td>
        <td>${typeCarb}</td>
        <td>${quantiteCarb} L</td>
        <td>${km} Km</td>
        <td>${montantCarb} DA</td>
        <td><a href="#" target="_blank" class="btn btn-primary ms-3 btn-sm">Voir le reçu</a>
          <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#ajout-carb">Modifier</button>
            <button class="btn btn-danger btn-sm" onclick="supprimerLigne(this)">Supprimer</button></td>
    </tr>

`;
tabCarb.innerHTML += nvlLigne;

document.getElementById("date-plein").value="";
document.getElementById("station").value="";
document.getElementById("type-carburant").value="";
document.getElementById("qte-carb").value="";
document.getElementById("kilometrage-carb").value="";
document.getElementById("montant-carb").value="";

let modal = bootstrap.Modal.getInstance(document.getElementById("ajout-carb"));
modal.hide();

}


function modifierRavitaillement(btn){
    ligne = btn.closest("tr");

let date = ligne.querySelector("td:nth-child(1)").innerText;
let parties = date.split("-");
let dateFormatee = parties[2] + "-" + parties[1] + "-" + parties[0];

    document.getElementById("date-plein").value = dateFormatee;
    document.getElementById("station").value = ligne.querySelector("td:nth-child(2)").innerText;
    document.getElementById("type-carburant").value = ligne.querySelector("td:nth-child(3)").innerText;
    document.getElementById("qte-carb").value = parseInt(ligne.querySelector("td:nth-child(4)").innerText);
    document.getElementById("kilometrage-carb").value = parseInt(ligne.querySelector("td:nth-child(5)").innerText);
    document.getElementById("montant-carb").value = parseInt(ligne.querySelector("td:nth-child(6)").innerText);
}

function supprimerLigne(btn) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce ravitaillement ?")) {
        btn.closest("tr").remove();
    }
}

function filtrerChauffeurs() {
    let stat = document.getElementById("stat-chauf").value;
    let lignes = document.querySelectorAll("table tbody tr");

    lignes.forEach(ligne => {
        let statut = ligne.querySelector("td:nth-child(5)").innerText.trim();

        if (stat === "") {
            ligne.style.display = "";
        } else if (stat === "dispo" && statut === "Disponible") {
            ligne.style.display = "";
        } else if (stat === "mission" && statut === "En mission") {
            ligne.style.display = "";
        } else if (stat === "conge" && statut === "En congé") {
            ligne.style.display = "";
        } else if (stat === "absent" && statut === "Absent") {
            ligne.style.display = "";
        } else {
            ligne.style.display = "none";
        }
    });
}

function rechercheChauffeur(){
    let recherche = document.getElementById("search-input").value.toLowerCase();
    let lignes = document.querySelectorAll("table tbody tr");

    lignes.forEach(ligne => {
        let nom = ligne.querySelector("td:nth-child(2)").innerText.toLowerCase().trim();

        if (nom.includes(recherche)){
            ligne.style.display="";
        }
        else {
            ligne.style.display="none";
        }
    })

}
function resetFiltre() {
    let statChauf = document.getElementById("stat-chauf");
    if (statChauf) statChauf.value="";

    let statVehicule = document.getElementById("stat-vehicule");
    if (statVehicule) statVehicule.value = "";

    let searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
    
    let lignes = document.querySelectorAll("table tbody tr");
    lignes.forEach(ligne => ligne.style.display = "");
}

function filtrerVehicules(){
    let stat = document.getElementById("stat-vehicule").value;
    let lignes = document.querySelectorAll("table tbody tr");

    lignes.forEach(ligne => {
        let statut = ligne.querySelector("td:nth-child(5)").innerText.trim();

        if (stat === "") {
            ligne.style.display="";
        } else if (stat === "car-dispo" && statut === "Disponible") {
            ligne.style.display = "";
        } else if (stat === "car-mission" && statut === "En mission"){
            ligne.style.display = "";
        } else if (stat === "car-mt" && statut === "En maintenance"){
            ligne.style.display = "";
        } else if (stat === "car-hs" && statut === "Hors service") {
            ligne.style.display = "";
        } else {
            ligne.style.display = "none";
        }
    });
}
function rechercheVehicule(){
    let recherche = document.getElementById("search-input").value;
    let lignes = document.querySelectorAll("table tbody tr");

    lignes.forEach(ligne => {
        let marque = ligne.querySelector("td:nth-child(2)").innerText.trim();
        let modele = ligne.querySelector("td:nth-child(3)").innerText.trim();

        let marquemodele = marque + " " + modele;

        if(marquemodele.includes(recherche)){
            ligne.style.display="";
        } else {
            ligne.style.display="none";
        }
    })

}


function filtrerTypeDemandes(){
    let typedm = document.getElementById("type-demande").value.toLowerCase();

    let lignes = document.querySelectorAll("table tbody tr");

    lignes.forEach(ligne => {
        let typeDemande = ligne.querySelector("td:nth-child(3)").innerText.trim();

    if (typedm === "" && etatdm === ""){
        ligne.style.display="";
    } else if (typedm === "dem-personnel" && typeDemande === "Personnel"){
        ligne.style.display="";   
    } else if(typedm === "dem-materiel" && typeDemande === "Materiel"){
        ligne.style.display="";
    } else {
        ligne.style.display="none";
    }
    })
}

function filtrerEtatDemandes(){
    let etatdm=document.getElementById("etat-demande").value.toLowerCase();
    
    let lignes = document.querySelectorAll("table tbody tr");

lignes.forEach(ligne => {
    let statDemmande = ligne.querySelector("td:nth-child(7)").innerText.trim();

    if (etatdm === "")
        { ligne.style.display="";
    }
    else if (etatdm === "dem-encours" && statDemmande === "En attente")
        { ligne.style.display=""; 

    }else if(etatdm === "dem-acceptee" && statDemmande === "Acceptée")
        { ligne.style.display=""; 

    }else if(etatdm === "dem-refusee" && statDemmande === "Rejetée")
        { ligne.style.display=""; 

    }else if(etatdm === "dem-annulee" && statDemmande === "Annulée")
        { 
        ligne.style.display=""; 
    }else {
         ligne.style.display="none"; 
    }
})

}

function affChampsMission(){
    let chauffeur = document.getElementById("chauf-dispo").value;
    let vehicule = document.getElementById("vehicule-dispo").value;

    if (chauffeur != "" && vehicule != "" && chauffeur != "reset" && vehicule != "reset"){
        document.querySelector(".aff-mission").style.display="block";
    }
    else{
        document.querySelector(".aff-mission").style.display="none";
    }
}

function filtrerMaintenance(type){
        document.querySelectorAll(".nav-link").forEach(btn => {
            btn.style.background="#30447d";
            btn.style.opacity="0.6";
        })
        event.target.style.background="#30447d";
        event.target.style.opacity="1";

        let listmaintenances=document.querySelectorAll(".detail-vt");

        listmaintenances.forEach(mnt => {

            let typemt=mnt.querySelector("h4").innerText.toLowerCase();

            if(type === "toutes"){
                mnt.style.display="";

            }else if(typemt.includes(type)){
                mnt.style.display="";

            } else {
                mnt.style.display="none";

            }
        })
}

function filtrerDocument(dct){
    document.querySelectorAll(".nav-link").forEach(btn => {
        btn.style.background="#30447d";
        btn.style.opacity="0.6";
    })
        event.target.style.background="#30447d";
        event.target.style.opacity="1";

        let listdocuments=document.querySelectorAll(".detail-vt");

        listdocuments.forEach(doc => {
            let typeDoc = doc.querySelector("h5").innerText.toLowerCase();

            if(dct === "tout") {
                doc.style.display="";
            }else if (typeDoc.includes(dct)) {
                doc.style.display="";
            }else {
                doc.style.display="none";
            }
        })
}