  function toggleSidebar(){
                    document.getElementById("sidebar").classList.toggle("active");
                    document.getElementById("sidebar-overlay").classList.toggle("active");
                }

function affTypeMaintenance(){

    let typeper = document.getElementById("type-periodique").value;

        if(typeper == "vidange"){
            document.querySelector(".vidange").style.display = "block";
            document.querySelector(".controle-frein").style.display = "none";
            document.querySelector(".autre").style.display="none";
            document.querySelector(".mt-periodique").classList.add("col-md-12"); 
            document.querySelector(".mt-periodique").classList.remove("col-md-6");
        } else if(typeper == "controle-frein") {
            document.querySelector(".controle-frein").style.display = "block";
            document.querySelector(".vidange").style.display = "none";
            document.querySelector(".autre").style.display="none";
            document.querySelector(".mt-periodique").classList.add("col-md-12"); 
            document.querySelector(".mt-periodique").classList.remove("col-md-6"); 

        } else if (typeper == "autre"){
            document.querySelector(".autre").style.display="block";
            document.querySelector(".mt-periodique").classList.remove("col-md-12"); 
            document.querySelector(".mt-periodique").classList.add("col-md-6");
            document.querySelector(".controle-frein").style.display = "none";
            document.querySelector(".vidange").style.display = "none";

        }
        else {
            document.querySelector(".mt-periodique").classList.add("col-md-12"); 
            document.querySelector(".mt-periodique").classList.remove("col-md-6");                    
            document.querySelector(".vidange").style.display = "none";
            document.querySelector(".controle-frein").style.display = "none";
            document.querySelector(".autre").style.display="none";

        }
}

function ouvrirModif(type) {
    let champsPeriodique = document.getElementById('champs-periodique');
    let plaq = document.getElementById("plaquettesmodif");
    let disq = document.getElementById("disquesmodif");
    let montantMod = document.getElementById("prixmodif");
    let reçuMTMod = document.getElementById("reçu-mt");

    if (type === 'periodique') {
        champsPeriodique.style.display = 'block';
        // Désactivés par défaut, le select nouveau-statut les activera
        plaq.disabled = true;
        disq.disabled = true;
        reçuMTMod.disabled=true;
        montantMod.disabled=true;

    } else {
        champsPeriodique.style.display = 'none';
        plaq.disabled = true;
        disq.disabled = true;
        reçuMTMod.disabled=true;
        montantMod.disabled=true;
    }

    // Reset le select statut
    document.getElementById("nouveau-statut").value = "";
    document.getElementById("nouveau-statut").classList.remove("is-valid", "is-invalid");
}


function filtrerChauffeurs() {
    let stat = document.getElementById("stat-chauf").value;
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.querySelector("#no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let statut = ligne.querySelector("td:nth-child(4)").innerText.trim();

        if (stat === "") {
            ligne.style.display = ""; trouve = true;
        } else if (stat === "dispo" && statut === "Disponible") {
            ligne.style.display = ""; trouve = true;
        } else if (stat === "mission" && statut === "En mission") {
            ligne.style.display = ""; trouve = true;
        } else if (stat === "conge" && statut === "En congé") {
            ligne.style.display = ""; trouve = true;
        } else {
            ligne.style.display = "none";
        }
    });
    if (trouve){
        noResult.style.display="none";
    } else {
        noResult.style.display="";
    }
}

function rechercheChauffeur(){
    let recherche = document.getElementById("search-input").value.toLowerCase();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult =  document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let nom = ligne.querySelector("td:nth-child(1)").innerText.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        if (nom.includes(recherche)){
            ligne.style.display="";
            trouve = true;
        }
        else {
            ligne.style.display="none";
        }
    });
    if (trouve){
        noResult.style.display="none";
    } else {
        noResult.style.display="";
    }

}
function resetFiltre() {
    let statChauf = document.getElementById("stat-chauf");
    if (statChauf) statChauf.value="";

    let statVehicule = document.getElementById("stat-vehicule");
    if (statVehicule) statVehicule.value = "";

    let typevehicule = document.getElementById("type-vehicule");
    if (typevehicule) typevehicule.value="";



    let searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
    
    let statMission = document.getElementById("stat-mission");
    if (statMission) statMission.value="";

    let typeDemande = document.getElementById("type-demande");
    if (typeDemande) typeDemande.value="";

    let etatDemande = document.getElementById("etat-demande");
    if (etatDemande) etatDemande.value="";

    let statAnomalie = document.getElementById("stat-panne");
    if (statAnomalie) statAnomalie.value="";

    let urgenceAnomalie = document.getElementById("gravite-panne");
    if (urgenceAnomalie) urgenceAnomalie.value="";


    let lignes = document.querySelectorAll("table tbody tr");
    lignes.forEach(ligne => ligne.style.display = "");
        
    let noResult = document.getElementById("no-result");
    if (noResult) noResult.style.display = "none";
}

function filtrerVehicules(){
    let stat = document.getElementById("stat-vehicule").value;
    let typevehicule = document.getElementById("type-vehicule").value
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.querySelector("#no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let statut = ligne.querySelector("td:nth-child(6)").innerText.trim();
        let type = ligne.querySelector("td:nth-child(2)").innerText.trim();

        let typeV = (typevehicule ==="" )|| (typevehicule === "voiture" && type === "Voiture") ||
        (typevehicule ==="camion" && type === "Camion") || (typevehicule ==="bus" && type === "Bus") ||
        (typevehicule ==="utilitaire" && type === "Utilitaire") || (typevehicule ==="moto" && type === "Moto");

        let statutV = (stat ==="") || (stat === "car-dispo" && statut === "Disponible") ||
        (stat === "car-mission" && statut === "En mission") || (stat === "car-mt" && statut === "En maintenance")
        || (stat === "car-hs" && statut === "Hors service");

        if (typeV && statutV) {
            ligne.style.display = "";
            trouve = true;
        } else {
            ligne.style.display = "none";
        }
    });
        if (trouve){
        noResult.style.display="none";
    } else {
        noResult.style.display="";
    }
}
function rechercheVehicule(){
    let recherche = document.getElementById("search-input").value.toLowerCase().trim();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let marque = ligne.querySelector("td:nth-child(3)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let modele = ligne.querySelector("td:nth-child(4)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let marquemodele = marque + " " + modele;

        if(marquemodele.includes(recherche)){
            ligne.style.display="";
            trouve = true;
        } else {
            ligne.style.display="none";
        }
    })
    if (trouve){
        noResult.style.display="none";
    }else{
        noResult.style.display="";
    }

}


function filtrerDemandes() {
    let typedm = document.getElementById("type-demande").value.trim().toLowerCase();
    let etatdm = document.getElementById("etat-demande").value.trim().toLowerCase();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.getElementById("no-result");
    let trouve = false;

    lignes.forEach(ligne => {
        let typeDemande = ligne.querySelector("td:nth-child(2)").innerText.trim().toLowerCase();
        let statDemmande = ligne.querySelector("td:nth-child(6)").innerText.trim().toLowerCase();

        // Vérification du type
        let matchType = (typedm === "") || 
                        (typedm === "dem-personnel" && typeDemande === "personnel") ||
                        (typedm === "dem-materiel" && typeDemande === "materiel");

        // Vérification de l'état
        let matchEtat = (etatdm === "") ||
                        (etatdm === "dem-encours" && statDemmande === "en attente") ||
                        (etatdm === "dem-acceptee" && statDemmande === "acceptée") ||
                        (etatdm === "dem-refusee" && statDemmande === "rejetée") ||
                        (etatdm === "dem-annulee" && statDemmande === "annulée") ||
                        (etatdm === "dem-cloturee" && statDemmande === "clôturée");

        if (matchType && matchEtat) {
            ligne.style.display = "";
            trouve = true;
        } else {
            ligne.style.display = "none";
        }
    });
    if (trouve){
        noResult.style.display="none";
    }else{
        noResult.style.display="";
    }
}

function filtrerEtatMissions(){
    let etatMission = document.getElementById("stat-mission").value.trim();
    let noResult = document.getElementById("no-result");
    let trouve = false;

    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");

    lignes.forEach(ligne =>{

        let statut = ligne.querySelector("td:nth-child(5)").innerText.trim();

   if (etatMission === "")
        { ligne.style.display=""; trouve = true;
    }
    else if (etatMission=== "mis-encours" && statut === "En cours")
        { ligne.style.display=""; trouve = true;

    }else if(etatMission === "mis-validee" && statut === "Validée")
        { ligne.style.display=""; trouve = true;

    }else if(etatMission === "mis-annulee" && statut === "Annulée")
        { 
        ligne.style.display=""; trouve = true;
    }else if (etatMission ==="mis-terminee" && statut === "Terminée") {
        ligne.style.display=""; trouve = true;
    }else {
         ligne.style.display="none";
    }       
    });
    if (trouve){
        noResult.style.display="none";
    } else{
        noResult.style.display="";
    }
}

function rechercherMissions(){
    let recherche=document.getElementById("search-input").value.toLowerCase().trim();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let demandeur=ligne.querySelector("td:nth-child(1)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let chauffeur=ligne.querySelector("td:nth-child(2)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let vehicule=ligne.querySelector("td:nth-child(3)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        
        let search = demandeur +" "+ chauffeur +" "+ vehicule;

        if(search.includes(recherche)){
            ligne.style.display="";
            trouve = true;
        }else {
            ligne.style.display="none";
        }
    });
    if (trouve){
        noResult.style.display="none";
    } else{
        noResult.style.display="";
    }

}
function rechercheDemandes(){
    let recherche=document.getElementById("search-input").value.toLowerCase().trim();
    let lignes = document.querySelectorAll("table tbody tr");
    let noResult = document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let emp = ligne.querySelector("td:nth-child(1)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        if(emp.includes(recherche)){
            ligne.style.display="";
            trouve=true;
        } else {
            ligne.style.display="none";
        }
    })
    if (!trouve){
        noResult.style.display="";
    }else{
        noResult.style.display="none";
    }
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
        btn.style.background="#2c3368";
        btn.style.opacity="0.6";
    });
    event.target.style.background="#2c3368";
    event.target.style.opacity="1";

    filtreType = type;
    filtrerMaintenanceDate();
}

let filtreType = 'toutes';

function filtrerMaintenanceDate() {
    const annee = document.getElementById('filtre-annee').value;

    document.querySelectorAll('.detail-vt').forEach(card => {
        let typemt = card.querySelector("h4").innerText.toLowerCase();

        const typeOk = filtreType === 'toutes' || typemt.includes(filtreType);

        const spanDate = card.querySelector('.bi-calendar2');
        let anneeCard = '';
        if (spanDate) {
            anneeCard = spanDate.parentElement.textContent.trim().split('-')[2];
        }
        const anneeOk = annee === '' || anneeCard === annee;

        card.style.display = (typeOk && anneeOk) ? '' : 'none';
    });
}

let filtreDct = 'tout';

function filtrerDocument(dct) {
    document.querySelectorAll(".nav-link").forEach(btn => {
        btn.style.background = "#2c3368";
        btn.style.opacity = "0.6";
    });
    event.target.style.background = "#2c3368";
    event.target.style.opacity = "1";

    filtreDct = dct;
    filtrerDocumentDate();
}

function filtrerDocumentDate() {
    const annee = document.getElementById('filtre-annee').value;

    document.querySelectorAll('.detail-vt').forEach(card => {
        const typedoc = card.getAttribute('data-type');

        const typeOk = filtreDct === 'tout' || typedoc.includes(filtreDct.replace(' ', '-'));

        const liExpiration = Array.from(card.querySelectorAll('li')).find(li =>
            li.textContent.toLowerCase().includes('expiration') ||
            li.textContent.toLowerCase().includes('prochain')
        );

        if (!liExpiration) {
            card.style.display = typeOk ? '' : 'none';
            return;
        }

        let anneeCard = '';
        const match = liExpiration.textContent.match(/\d{2}-\d{2}-(\d{4})/);
        if (match) {
            anneeCard = match[1];
        }

        const anneeOk = annee === '' || anneeCard === annee;

        card.style.display = (typeOk && anneeOk) ? '' : 'none';
    });
}
  function setAction(el) {
    const btn = el.closest('.btn-group').querySelector('.btn:first-child');
    btn.textContent = el.textContent;
    btn.dataset.action = el.textContent.trim();
  }

function handleAction(btn) {
    const action = btn.dataset.action;
    if (action === 'Planifier maintenance') {
      new bootstrap.Modal(document.getElementById('maintenanceModal')).show();
    } else if (action === 'Signaler chauffeur') {
      new bootstrap.Modal(document.getElementById('ConvocationModal')).show();    }
  }

document.addEventListener('DOMContentLoaded', function () {
    const aujourd_hui = new Date().toISOString().split('T')[0];
    document.getElementById('date-signalement').value = aujourd_hui;
});

function confirminout(btn){
    btn.closest(".inout").style.background="#85ff9d41";
    btn.closest(".inout").querySelectorAll("button").forEach(b => b.disabled = true);
}

function filtrerAnomalies() {
    let statut = document.getElementById("stat-panne").value.trim().toLowerCase();
    let urgence = document.getElementById("gravite-panne").value.trim().toLowerCase();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let stat = ligne.querySelector("td:nth-child(6)").innerText.trim().toLowerCase();
        let urg = ligne.querySelector("td:nth-child(4)").innerText.trim().toLowerCase();

        // Vérification du statut
        let matchStatut = false;
        if (statut === "") {
            matchStatut = true;
        } else if (statut === "signalee" && stat === "signalée") {
            matchStatut = true;
        } else if (statut === "en-cours-rep" && stat === "en cours de réparation") {
            matchStatut = true;
        } else if (statut === "reparee" && stat === "réparée") {
            matchStatut = true;
        }

        // Vérification de l'urgence
        let matchUrgence = false;
        if (urgence === "") {
            matchUrgence = true;
        } else if (urgence === "faible" && urg === "faible") {
            matchUrgence = true;
        } else if (urgence === "moyenne" && urg === "moyenne") {
            matchUrgence = true;
        } else if (urgence === "grave" && urg === "grave") {
            matchUrgence = true;
        }

        // Affichage ou non
        if (matchStatut && matchUrgence) {
            ligne.style.display = "";
            trouve = true;
        } else {
            ligne.style.display = "none";
        }
    });

    if (trouve) {
        noResult.style.display="none";
    }else{
        noResult.style.display="";
    }
}

function rechercheAnomalie(){
    let recherche = document.getElementById("search-input").value.toLowerCase().trim();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let type = ligne.querySelector("td:nth-child(5)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let vehicule = ligne.querySelector("td:nth-child(2)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let personne = ligne.querySelector("td:nth-child(3)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let recherches = type + " " + vehicule +" "+ personne;

        if(recherches.includes(recherche)){
            ligne.style.display="";
            trouve = true;
        } else {
            ligne.style.display="none";
        }
    })
    if (trouve){
        noResult.style.display="none";
    }else{
        noResult.style.display="";
    }
}

function validerFormulaireVehicule(event){
  event.preventDefault();

let matricule=document.getElementById("immatric-vehicule").value;
let marque=document.getElementById("marque-vehicule").value;
let modele=document.getElementById("modele-vehicule").value;
let typeV=document.getElementById("type-vehicul").value;
let annee = document.getElementById("annee-vehicule").value;
let kilometrage = document.getElementById("kilometrage").value;
let nombre = document.getElementById("NbPlaces").value;
let etat = document.getElementById("etat-vehicule").value;
let carburant = document.getElementById("carburant").value;
let dateDispo = document.getElementById("date-circulation").value;
let carteGr = document.getElementById("carte-grisev").files;

let erreur=false;

document.getElementById("errmat").innerHTML = "";
document.getElementById("errmarque").innerHTML = "";
document.getElementById("errmodele").innerHTML = "";
document.getElementById("errtypeV").innerHTML = "";
document.getElementById("errannee").innerHTML="";
document.getElementById("errkm").innerHTML="";
document.getElementById("errnombre").innerHTML="";


if (etat !== ""){
document.getElementById("etat-vehicule").classList.add("is-valid");
}
if(carburant !=="" ){
document.getElementById("carburant").classList.add("is-valid");

}
if(dateDispo !== ""){
document.getElementById("date-circulation").classList.add("is-valid");

}
if(carteGr.length !== 0){
document.getElementById("carte-grisev").classList.add("is-valid");
}

if(matricule==""){document.getElementById("errmat").innerHTML="L'immatriculation est obligatoire.";
    document.getElementById("immatric-vehicule").classList.add("is-invalid");
erreur=true;}
else{
document.getElementById("immatric-vehicule").classList.remove("is-invalid");
document.getElementById("immatric-vehicule").classList.add("is-valid");

}

if(marque==""){document.getElementById("errmarque").innerHTML="La marque du véhicule est obligatoire.";
    document.getElementById("marque-vehicule").classList.add("is-invalid");
erreur=true;}
else{
document.getElementById("marque-vehicule").classList.remove("is-invalid");
document.getElementById("marque-vehicule").classList.add("is-valid");
}

if(modele==""){document.getElementById("errmodele").innerHTML="Le modèle du véhicule est obligatoire.";
document.getElementById("modele-vehicule").classList.add("is-invalid");
    erreur=true;}
else{
document.getElementById("modele-vehicule").classList.remove("is-invalid");
document.getElementById("modele-vehicule").classList.add("is-valid");

}

if (typeV ==="" || typeV === "Selectionnez le type du véhicule") {
    document.getElementById("errtypeV").innerHTML = "Le type du véhicule est obligatoire.";
    document.getElementById("type-vehicul").classList.add("is-invalid");
     erreur = true;}
else{
document.getElementById("type-vehicul").classList.remove("is-invalid");
document.getElementById("type-vehicul").classList.add("is-valid");

}

if(annee === ""){

document.getElementById("annee-vehicule")
.classList.remove("is-valid");

document.getElementById("annee-vehicule")
.classList.remove("is-invalid");

}
else if(isNaN(annee)){document.getElementById("errannee").innerHTML = "L'année doit contenir une valeur numérique."; 
document.getElementById("annee-vehicule").classList.add("is-invalid");
    erreur=true;}
else{
document.getElementById("annee-vehicule").classList.remove("is-invalid");
document.getElementById("annee-vehicule").classList.add("is-valid");

}
if(kilometrage ==="") {document.getElementById("errkm").innerHTML="Le kilométrage est obligatoire.";
    document.getElementById("kilometrage").classList.add("is-invalid");
    erreur=true;
}

else if (isNaN(kilometrage)){document.getElementById("errkm").innerHTML = "Le kilométrage doit contenir une valeur numérique."; 
document.getElementById("kilometrage").classList.add("is-invalid");
    erreur=true;}
else{
document.getElementById("kilometrage").classList.remove("is-invalid");
document.getElementById("kilometrage").classList.add("is-valid");

}
if(nombre === ""){

document.getElementById("NbPlaces").classList.remove("is-valid");
document.getElementById("NbPlaces").classList.remove("is-invalid");

}
else if(isNaN(nombre)){document.getElementById("errnombre").innerHTML = "Le nombre de places doit contenir une valeur numérique."; 
document.getElementById("NbPlaces").classList.add("is-invalid");
    erreur=true;}
else{
document.getElementById("NbPlaces").classList.remove("is-invalid");
document.getElementById("NbPlaces").classList.add("is-valid");
}

 if (erreur) {
    return;
  }
  event.target.submit();
}
// Live validation 
document.getElementById("immatric-vehicule").addEventListener("input", function() {
  if (this.value.trim() === "") {
    this.classList.add("is-invalid"); this.classList.remove("is-valid");
    document.getElementById("errmat").innerHTML = "L'immatriculation est obligatoire.";
  } else {
    this.classList.remove("is-invalid"); this.classList.add("is-valid");
    document.getElementById("errmat").innerHTML = "";
  }
});

document.getElementById("marque-vehicule").addEventListener("input", function() {
  if (this.value.trim() === "") {
    this.classList.add("is-invalid"); this.classList.remove("is-valid");
    document.getElementById("errmarque").innerHTML = "La marque du véhicule est obligatoire";
  } else {
    this.classList.remove("is-invalid"); this.classList.add("is-valid");
    document.getElementById("errmarque").innerHTML = "";
  }
});

document.getElementById("modele-vehicule").addEventListener("input", function() {
  if (this.value.trim() === "") {
    this.classList.add("is-invalid"); this.classList.remove("is-valid");
    document.getElementById("errmodele").innerHTML = "Le modèle du véhicule est obligatoire.";
  } else {
    this.classList.remove("is-invalid"); this.classList.add("is-valid");
    document.getElementById("errmodele").innerHTML = "";
  }
});

document.getElementById("kilometrage").addEventListener("input", function() {
  if (this.value.trim() === "") {
    this.classList.add("is-invalid"); this.classList.remove("is-valid");
    document.getElementById("errkm").innerHTML = "Le kilométrage est obligatoire.";
  } else if (isNaN(this.value)) {
    this.classList.add("is-invalid"); this.classList.remove("is-valid");
    document.getElementById("errkm").innerHTML = "Le kilométrage doit contenir une valeur numérique.";
  } else {
    this.classList.remove("is-invalid"); this.classList.add("is-valid");
    document.getElementById("errkm").innerHTML = "";
  }
});

document.getElementById("annee-vehicule").addEventListener("input", function() {
  if (this.value !== "" && isNaN(this.value)) {
    this.classList.add("is-invalid"); this.classList.remove("is-valid");
    document.getElementById("errannee").innerHTML = "L'année doit contenir une valeur numérique.";
  } else {
    this.classList.remove("is-invalid");
    if (this.value !== "") this.classList.add("is-valid");
    document.getElementById("errannee").innerHTML = "";
  }
});

document.getElementById("NbPlaces").addEventListener("input", function() {
  if (this.value !== "" && isNaN(this.value)) {
    this.classList.add("is-invalid"); this.classList.remove("is-valid");
    document.getElementById("errnombre").innerHTML = "Le nombre de places doit contenir une valeur numérique.";
  } else {
    this.classList.remove("is-invalid");
    if (this.value !== "") this.classList.add("is-valid");
    document.getElementById("errnombre").innerHTML = "";
  }
});

document.getElementById("type-vehicul").addEventListener("change", function() {
  if (this.value === "" || this.value === "Selectionnez le type du véhicule") {
    this.classList.add("is-invalid"); this.classList.remove("is-valid");
    document.getElementById("errtypeV").innerHTML = "Le type du véhicule est obligatoire.";
  } else {
    this.classList.remove("is-invalid"); this.classList.add("is-valid");
    document.getElementById("errtypeV").innerHTML = "";
  }
});
document.getElementById("etat-vehicule").addEventListener("change",function(){
    if (this.value !== ""){
        this.classList.add("is-valid");
    }else {
        this.classList.remove("is-valid");
    }
});

document.getElementById("carburant").addEventListener("change",function(){
    if (this.value !== ""){
        this.classList.add("is-valid");
    }else {
        this.classList.remove("is-valid");
    }
});
document.getElementById("date-circulation").addEventListener("change",function(){
    if (this.value !== ""){
        this.classList.add("is-valid");
    }else {
        this.classList.remove("is-valid");
    }
});
document.getElementById("carte-grisev").addEventListener("change",function(){
    if (this.files.length !== 0){
        this.classList.add("is-valid");
    }else {
        this.classList.remove("is-valid");
    }
});
function validerFormulaireCarburant(event){
    event.preventDefault();

    let datePlein = document.getElementById("date-plein").value;
    let Station = document.getElementById("station").value;
    let TypeCarb = document.getElementById("type-carburant").value;
    let QteCarb = document.getElementById("qte-carb").value;
    let kmCarb = document.getElementById("kilometrage-carb").value;
    let montantCarb = document.getElementById("montant-carb").value;

    let erreur = false;

    document.getElementById("errplein").innerHTML="";
    document.getElementById("errstation").innerHTML="";
    document.getElementById("errtypecarb").innerHTML="";
    document.getElementById("errqtecarb").innerHTML="";
    document.getElementById("errkmcarb").innerHTML="";
    document.getElementById("errmtcarb").innerHTML="";

    if (datePlein === ""){
        document.getElementById("errplein").innerHTML="Obligatoire.";
        document.getElementById("date-plein").classList.add("is-invalid");
        erreur=true;
    } else {
        document.getElementById("date-plein").classList.remove("is-invalid");
        document.getElementById("date-plein").classList.add("is-valid");
    }

    if (Station === ""){
        document.getElementById("errstation").innerHTML="Obligatoire.";
        document.getElementById("station").classList.add("is-invalid");
        erreur=true;
    } else {
        document.getElementById("station").classList.remove("is-invalid");
        document.getElementById("station").classList.add("is-valid");
    }

    if (TypeCarb === ""){
        document.getElementById("errtypecarb").innerHTML="Obligatoire.";
        document.getElementById("type-carburant").classList.add("is-invalid");
        erreur=true;
    } else {
        document.getElementById("type-carburant").classList.remove("is-invalid");
        document.getElementById("type-carburant").classList.add("is-valid");
    }

    if (QteCarb === ""){
        document.getElementById("errqtecarb").innerHTML="Obligatoire.";
        document.getElementById("qte-carb").classList.add("is-invalid");
        erreur=true;
    } else if(isNaN(QteCarb)){
        document.getElementById("errqtecarb").innerHTML="La quantité doit contenir une valeur numérique.";
        document.getElementById("qte-carb").classList.add("is-invalid");
        erreur = true;
    } else {
        document.getElementById("qte-carb").classList.remove("is-invalid");
        document.getElementById("qte-carb").classList.add("is-valid");
    }

    if (kmCarb === ""){
        document.getElementById("errkmcarb").innerHTML="Obligatoire.";
        document.getElementById("kilometrage-carb").classList.add("is-invalid");
        erreur=true;
    } else if(isNaN(kmCarb)){
        document.getElementById("errkmcarb").innerHTML="Le kilometrage doit contenir une valeur numérique.";
        document.getElementById("kilometrage-carb").classList.add("is-invalid");
        erreur = true;
    } else {
        document.getElementById("kilometrage-carb").classList.remove("is-invalid");
        document.getElementById("kilometrage-carb").classList.add("is-valid");
    }

    if (montantCarb === ""){
        document.getElementById("errmtcarb").innerHTML="Obligatoire.";
        document.getElementById("montant-carb").classList.add("is-invalid");
        erreur=true;
    } else if(isNaN(montantCarb)){
        document.getElementById("errmtcarb").innerHTML="Le montant doit contenir une valeur numérique.";
        document.getElementById("montant-carb").classList.add("is-invalid");
        erreur = true;
    } else {
        document.getElementById("montant-carb").classList.remove("is-invalid");
        document.getElementById("montant-carb").classList.add("is-valid");
    }

    if (erreur){ return; }
    event.target.submit();
}


function validerFormulaireMaintenancePer(event){
    event.preventDefault();
    let typeMT = document.getElementById("type-periodique").value;
    let typeAutre = document.getElementById("autres").value;
    let typefreq = document.getElementById("freq").value;
    let typehuile = document.getElementById("huile").value;
    let dateMT = document.getElementById("date-maintenance").value;
    let montantper = document.getElementById("prix").value;
    let statMT = document.getElementById("statut-maintenance").value;

    let erreur = false;

    document.getElementById("errtypeMT").innerHTML="";
    document.getElementById("errtypeAutre").innerHTML="";
    document.getElementById("errtypefreq").innerHTML="";
    document.getElementById("errtypehuile").innerHTML="";
    document.getElementById("errdateMT").innerHTML="";
    document.getElementById("errmtper").innerHTML="";
    document.getElementById("errstatMT").innerHTML="";

    if (typeMT === ""){
         document.getElementById("errtypeMT").innerHTML="Veuillez choisir un type de maintenance périodique.";
        document.getElementById("type-periodique").classList.add("is-invalid");
        erreur=true;
    }   else {
        document.getElementById("type-periodique").classList.remove("is-invalid");
        document.getElementById("type-periodique").classList.add("is-valid");
    }
    
    if (typeMT === "autre"){
        if (typeAutre === "") {
             document.getElementById("errtypeAutre").innerHTML="Veuillez saisir un type.";
        document.getElementById("autres").classList.add("is-invalid");
        erreur=true;
        } else {
        document.getElementById("autres").classList.remove("is-invalid");
        document.getElementById("autres").classList.add("is-valid");
        }
    }
    if (typeMT ==="vidange"){
        if (typefreq === ""){
        document.getElementById("errtypefreq").innerHTML="Veuillez insérer le kilométrage.";
        document.getElementById("freq").classList.add("is-invalid");
        erreur=true;          
        }else if (isNaN(typefreq)){
    document.getElementById("errtypefreq").innerHTML="Le kilométrage doit contenir une valeur numérique.";
    document.getElementById("freq").classList.add("is-invalid");
    erreur=true;                 
        }
         else {
        document.getElementById("freq").classList.remove("is-invalid");
        document.getElementById("freq").classList.add("is-valid");           
        }
        if (typehuile === "") {
        document.getElementById("errtypehuile").innerHTML="Veuillez choisir un type d'huile.";
        document.getElementById("huile").classList.add("is-invalid");
        erreur=true;            
        } else {
        document.getElementById("huile").classList.remove("is-invalid");
        document.getElementById("huile").classList.add("is-valid");           
        }
    }
    if (dateMT === ""){
        document.getElementById("errdateMT").innerHTML="Veuillez entrer une date.";
        document.getElementById("date-maintenance").classList.add("is-invalid");
        erreur=true;      
        }else {
        document.getElementById("date-maintenance").classList.remove("is-invalid");
        document.getElementById("date-maintenance").classList.add("is-valid");  
    }
    if (isNaN(montantper)) {
        document.getElementById("errmtper").innerHTML="Veuillez choisir un type de maintenance périodique.";
        document.getElementById("prix").classList.add("is-invalid");
        erreur=true; 
        } else if(montantper === "") {
        document.getElementById("prix").classList.remove("is-valid");
        }
        else{
        document.getElementById("prix").classList.remove("is-invalid");
        document.getElementById("prix").classList.add("is-valid");  
        }
    if (statMT === ""){
        document.getElementById("errstatMT").innerHTML="Veuillez mettre à jour le statut.";
        document.getElementById("statut-maintenance").classList.add("is-invalid");
        erreur=true;        
    }else {
        document.getElementById("statut-maintenance").classList.remove("is-invalid");
        document.getElementById("statut-maintenance").classList.add("is-valid"); 
    }


if (erreur) {
    return;
}
    event.target.submit();
    }

function validerFormulaireModifMTPER(event) {
    event.preventDefault();

    let newStat    = document.getElementById("nouveau-statut").value;
    let plaq       = document.getElementById("plaquettesmodif");
    let disq       = document.getElementById("disquesmodif");
    let montantMod = document.getElementById("prixmodif");
    let reçuMTMod  = document.getElementById("reçu-mt");
    let champsPeriodique = document.getElementById('champs-periodique');

    let erreur = false;

    document.getElementById("errprixmodif").innerHTML  = "";
    document.getElementById("errreçumt").innerHTML     = "";
    document.getElementById("errnewStat").innerHTML    = "";
    document.getElementById("errplaqModif").innerHTML  = "";
    document.getElementById("errdisqModif").innerHTML  = "";

    // Activer/désactiver selon statut
    if (newStat === "terminee") {
        montantMod.disabled = false;
        reçuMTMod.disabled  = false;
        if (champsPeriodique.style.display === 'block') {
            plaq.disabled = false;
            disq.disabled = false;
        }
    } else {
        plaq.disabled       = true;
        disq.disabled       = true;
        montantMod.disabled = true;
        reçuMTMod.disabled  = true;
        plaq.classList.remove("is-valid", "is-invalid");
        disq.classList.remove("is-valid", "is-invalid");
        montantMod.classList.remove("is-valid", "is-invalid");
        reçuMTMod.classList.remove("is-valid", "is-invalid");
    }

    // Lire les valeurs après activation
    let PlaqModif    = plaq.value;
    let DisqModif    = disq.value;
    let montantModif = montantMod.value;
    let reçuMT       = reçuMTMod.files;

    // Validation statut
    if (newStat === "") {
        document.getElementById("errnewStat").innerHTML = "Veuillez mettre à jour le statut.";
        document.getElementById("nouveau-statut").classList.add("is-invalid");
        erreur = true;
    } else {
        document.getElementById("nouveau-statut").classList.remove("is-invalid");
        document.getElementById("nouveau-statut").classList.add("is-valid");
    }

    // Validation si terminée
    if (newStat === "terminee") {

        // Montant
        if (montantModif === "") {
            document.getElementById("errprixmodif").innerHTML = "Veuillez insérer le montant.";
            document.getElementById("prixmodif").classList.add("is-invalid");
            erreur = true;
        } else if (isNaN(montantModif)) {
            document.getElementById("errprixmodif").innerHTML = "Valeur numérique requise.";
            document.getElementById("prixmodif").classList.add("is-invalid");
            erreur = true;
        } else {
            document.getElementById("prixmodif").classList.remove("is-invalid");
            document.getElementById("prixmodif").classList.add("is-valid");
        }

        // Reçu
        if (reçuMT.length === 0) {
            document.getElementById("errreçumt").innerHTML = "Veuillez insérer le reçu.";
            document.getElementById("reçu-mt").classList.add("is-invalid");
            erreur = true;
        } else {
            document.getElementById("reçu-mt").classList.remove("is-invalid");
            document.getElementById("reçu-mt").classList.add("is-valid");
        }

        // Plaquettes et disques seulement si périodique
        if (champsPeriodique.style.display === 'block') {
            if (PlaqModif === "") {
                document.getElementById("errplaqModif").innerHTML = "Veuillez mettre à jour l'état des plaquettes.";
                document.getElementById("plaquettesmodif").classList.add("is-invalid");
                erreur = true;
            } else {
                document.getElementById("plaquettesmodif").classList.remove("is-invalid");
                document.getElementById("plaquettesmodif").classList.add("is-valid");
            }
            if (DisqModif === "") {
                document.getElementById("errdisqModif").innerHTML = "Veuillez mettre à jour l'état des disques.";
                document.getElementById("disquesmodif").classList.add("is-invalid");
                erreur = true;
            } else {
                document.getElementById("disquesmodif").classList.remove("is-invalid");
                document.getElementById("disquesmodif").classList.add("is-valid");
            }
        }
    }
    if (erreur) return;
    event.target.submit();
}

function validerFormulaireMaintenanceCor(event){
    event.preventDefault();

    let datePanneMt = document.getElementById("date-maintenance-cor").value;
    let StatutMtCor = document.getElementById("statut-maintenance-cor").value;

    let erreur = false;

    document.getElementById("errdatemtCor").innerHTML  = "";
    document.getElementById("errstatutmtCor").innerHTML  = "";

    if(datePanneMt === ""){
        document.getElementById("errdatemtCor").innerHTML = "Veuillez saisir la date de la maintenance.";
        document.getElementById("date-maintenance-cor").classList.add("is-invalid");
    erreur = true;      
    }else{
        document.getElementById("date-maintenance-cor").classList.remove("is-invalid");
        document.getElementById("date-maintenance-cor").classList.add("is-valid");        
    }
    if(StatutMtCor === ""){
        document.getElementById("errstatutmtCor").innerHTML = "Veuillez choisir un statut.";
        document.getElementById("statut-maintenance-cor").classList.add("is-invalid");
    erreur = true;      
    }else{
        document.getElementById("statut-maintenance-cor").classList.remove("is-invalid");
        document.getElementById("statut-maintenance-cor").classList.add("is-valid");        
    }

    if (erreur) return;

    event.target.submit();
}

function validerFormulaireConvocation(event){
    event.preventDefault();
    let motifConvo=document.getElementById("motifconvo").value;

    let erreur = false;
    
    document.getElementById("errMotifConvo").innerHTML="";

    if (motifConvo === ""){
        document.getElementById("errMotifConvo").innerHTML = "Veuillez saisir le motif.";
        document.getElementById("motifconvo").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("motifconvo").classList.remove("is-invalid");
        document.getElementById("motifconvo").classList.add("is-valid");        
    }

    if (erreur) return;


    event.target.submit();
}

function validerFormulaireChauffeurModif(event){
    event.preventDefault();

    let EtatSante=document.getElementById("etat-sante").value;
    let CategPermis=document.getElementById("permis").value;
    let NumPermis=document.getElementById("numPermis").value;
    let DateExpPermis=document.getElementById("dateExpPermis").value;
    let DateDispoChauff=document.getElementById("dateDispoChauff").value;


    let erreur = false;
    
    document.getElementById("erretatsante").innerHTML="";
    document.getElementById("errpermis").innerHTML="";
    document.getElementById("errnumPermis").innerHTML="";
    document.getElementById("errdateExpPermis").innerHTML="";
    document.getElementById("errdateDispoChauff").innerHTML="";


    if (EtatSante === ""){
        document.getElementById("erretatsante").innerHTML = "Veuillez saisir l'état de santé.";
        document.getElementById("etat-sante").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("etat-sante").classList.remove("is-invalid");
        document.getElementById("etat-sante").classList.add("is-valid");        
    }

    if (CategPermis === ""){
        document.getElementById("errpermis").innerHTML = "Veuillez choisir une catégorie.";
        document.getElementById("permis").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("permis").classList.remove("is-invalid");
        document.getElementById("permis").classList.add("is-valid");        
    }

    if (NumPermis === ""){
        document.getElementById("errnumPermis").innerHTML = "Veuillez saisir le numéro de permis.";
        document.getElementById("numPermis").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("numPermis").classList.remove("is-invalid");
        document.getElementById("numPermis").classList.add("is-valid");        
    }
    
    if (DateExpPermis === ""){
        document.getElementById("errdateExpPermis").innerHTML = "Veuillez saisir la date d'expiration du permis.";
        document.getElementById("errdateExpPermis").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("errdateExpPermis").classList.remove("is-invalid");
        document.getElementById("errdateExpPermis").classList.add("is-valid");        
    }

    if (DateDispoChauff === ""){
        document.getElementById("errdateDispoChauff").innerHTML = "Veuillez saisir la date de mise à disposition.";
        document.getElementById("dateDispoChauff").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("dateDispoChauff").classList.remove("is-invalid");
        document.getElementById("dateDispoChauff").classList.add("is-valid");        
    }

    if (erreur) return;

    event.target.submit();
}

function validerTraitementDemande(event){
        event.preventDefault();


    let ChauffeurDispo=document.getElementById("chauf-dispo").value;
    let VehiculeDispo=document.getElementById("vehicule-dispo").value;

    let erreur = false;
    
    document.getElementById("errChaufDispo").innerHTML="";
    document.getElementById("errVehiculeDispo").innerHTML="";


    if (ChauffeurDispo === ""){
        document.getElementById("errChaufDispo").innerHTML = "Veuillez choisir un chauffeur.";
        document.getElementById("chauf-dispo").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("chauf-dispo").classList.remove("is-invalid");
        document.getElementById("chauf-dispo").classList.add("is-valid");        
    }
    if (VehiculeDispo === ""){
        document.getElementById("errVehiculeDispo").innerHTML = "Veuillez choisir un véhicule.";
        document.getElementById("vehicule-dispo").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("vehicule-dispo").classList.remove("is-invalid");
        document.getElementById("vehicule-dispo").classList.add("is-valid");        
    }

    if (erreur) return;

    event.target.submit();

}

function validerMotifRefus(event){
    event.preventDefault();

    let MotifRefus=document.getElementById("motifRefus").value;

    let erreur = false;
    
    document.getElementById("errmotifRefus").innerHTML="";

    if (MotifRefus === ""){
        document.getElementById("errmotifRefus").innerHTML = "Veuillez saisir un motif.";
        document.getElementById("motifRefus").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("motifRefus").classList.remove("is-invalid");
        document.getElementById("motifRefus").classList.add("is-valid");        
    }
      if (erreur) return;

    event.target.submit();
}