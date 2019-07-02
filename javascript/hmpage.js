$(document).ready(function() {

    let kayitliBilgilerDoktarlar = alLocalStorageDoktor();
    document.getElementById('doktorSayisi').textContent = kayitliBilgilerDoktarlar.length;

    let kayitliBilgilerRandevular = alLocalStorage();
    document.getElementById('randevuSayisi').textContent = kayitliBilgilerRandevular.length;

    let kayitliBilgilerHastalar = alLocalStorageKisiler();
    document.getElementById('hastaSayisi').textContent = kayitliBilgilerHastalar.length;

})

function alLocalStorage() {
    let bilgiler;

    if (localStorage.getItem("randevuBilgileri") === null) {
        bilgiler = [];
    } else {
        bilgiler = JSON.parse(localStorage.getItem("randevuBilgileri"));
    }
    return bilgiler;
}

function alLocalStorageDoktor() {
    let bilgiler;

    if (localStorage.getItem("doktorBilgileri") === null) {
        bilgiler = [];
    } else {
        bilgiler = JSON.parse(localStorage.getItem("doktorBilgileri"));
    }
    return bilgiler;
}


function alLocalStorageKisiler() {
    let bilgiler;

    if (localStorage.getItem("hastaBilgileri") === null) {
        bilgiler = [];
    } else {
        bilgiler = JSON.parse(localStorage.getItem("hastaBilgileri"));
    }
    return bilgiler;
}