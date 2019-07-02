document.addEventListener("DOMContentLoaded", sayfaAcilincaYukle());


$(document).ready(function() {


    let kayitliBilgilerDoktarlar = alLocalStorageDoktor();
    let child = document.getElementById('DoktorAdi');

    for (i = 0; i <= kayitliBilgilerDoktarlar.length - 1; i++) {
        let option = document.createElement('option')
        child.appendChild(option)
        option.innerHTML = kayitliBilgilerDoktarlar[i][0] + " " + kayitliBilgilerDoktarlar[i][1];
    }


    let kayitliBilgilerHastalar = alLocalStorageKisiler();
    let childS = document.getElementById('HastaAdi');
    for (i = 0; i <= kayitliBilgilerHastalar.length - 1; i++) {
        let option = document.createElement('option')
        childS.appendChild(option)
        option.innerHTML = kayitliBilgilerHastalar[i][0] + " " + kayitliBilgilerHastalar[i][1];
    }

    let kayitliBilgilerRandevular = alLocalStorage();
    for (k = 0; k <= 5; k++) {


        kayitliBilgilerRandevular

    }


    $(".randevuAl").click(function() {



        let tablo = document.querySelector('#randevuTablo>tbody');

        let frst = $("#DoktorAdi").val();
        let lst = $("#HastaAdi").val();
        let inno = $("#randevuTarih").val();

        let silme = document.createElement("button");
        silme.className = 'btn-xs btn btn-danger delete-btn';
        silme.type = 'button';
        silme.textContent = 'Sil';


        let dizi = [frst, lst, inno, silme];



        if (lst == ['Hasta Seçiniz'] || frst == ['Doktor Seçiniz'] || inno == 0) {
            swal("Kayıt Oluşturulamadı!", "Lütfen Tüm alanları düzgün ve doğru doldurunuz", "error");
            ConstantSourceNode
        } else {
            swal("Kayıt Oluşturuldu!", "", "success");
            let trSatir = document.createElement('tr');

            for (let i = 0; i < 4; i++) {
                if (i <= 2) {
                    let trSutun = document.createElement('td');
                    trSutun.textContent = dizi[i];
                    trSatir.appendChild(trSutun);

                } else {
                    let trSutun = document.createElement('td');
                    trSutun.appendChild(dizi[i]);
                    trSatir.appendChild(trSutun);
                }

            }

            dizi = [frst, lst, inno, silme.toString()];



            tablo.appendChild(trSatir);
            ekleLocalStorage(dizi);

            $("#exampleModal .close").click();
            $("#DoktorAdi ").val("Doktor Seçiniz");
            $("#HastaAdi ").val("Hasta Seçiniz");
            $("#randevuTarih ").val(0);
            window.location.reload()
        }
    });
    $(document).on('click', '.delete-btn', function() {

        //    KisiSil(this);

        swal({
                title: "Emin misin?",
                text: " Bir kere silindiğinde, bu Randevu kaydını kurtaramazsınız!",
                icon: "warning",
                buttons: true,

                dangerMode: true,
                buttons: ["İPTAL", "SİL"]
            })
            .then((willDelete) => {
                if (willDelete) {

                    swal("Randevu Kaydı Başarıyla silindi!", {
                        icon: "success",
                        buttons: true,
                        buttons: "KAPAT"
                    });


                    let indis = $(this).parent().parent().index('tr') - 1;
                    kisiSilLocaStorage(indis);
                    $(this).parent().parent().remove();


                } else {
                    swal("Randevu Kaydı güvende!", {

                        buttons: true,


                        buttons: "KAPAT"
                    });

                }

            });


    })


});






function kisiSilLocaStorage(silinecekKisi) {
    let kayitliBilgiler = alLocalStorage();
    kayitliBilgiler.splice(silinecekKisi, 1);
    localStorage.setItem("randevuBilgileri", JSON.stringify(kayitliBilgiler));
}





function tarayiciyaEkle(kisi) {


    let tablo = document.querySelector('#randevuTablo>tbody');

    let frst = kisi[0];

    let lst = kisi[1];
    let inno = kisi[2];

    let silme = document.createElement("button");
    silme.className = 'btn-xs btn btn-danger delete-btn';
    silme.type = 'button';
    silme.textContent = 'Sil';


    let dizi = [frst, lst, inno, silme];
    let trSatir = document.createElement('tr');

    for (let i = 0; i < 4; i++) {
        if (i <= 2) {
            let trSutun = document.createElement('td');
            trSutun.textContent = dizi[i];
            trSatir.appendChild(trSutun);

        } else {
            let trSutun = document.createElement('td');
            trSutun.appendChild(dizi[i]);
            trSatir.appendChild(trSutun);
        }

    }

    tablo.appendChild(trSatir);
}

function sayfaAcilincaYukle() {

    let kayitliBilgiler = alLocalStorage();
    kayitliBilgiler.forEach(function(kisi) {
        tarayiciyaEkle(kisi);
    })
}

function sayfaAcilincaYukleRandevu() {
    let kayitliBilgiler = alLocalStorage();
    kayitliBilgiler.forEach(function(kisi) {
        tarayiciyaEkle(kisi);
    })
}

function ekleLocalStorage(yeniBilgi) {
    let kayitliBilgiler = alLocalStorage();
    kayitliBilgiler.push(yeniBilgi);
    localStorage.setItem("randevuBilgileri", JSON.stringify(kayitliBilgiler));
}

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

    if (localStorage.getItem("hastaBilgileri") === null) {
        bilgiler = [];
    } else {
        bilgiler = JSON.parse(localStorage.getItem("hastaBilgileri"));
    }
    return bilgiler;
}