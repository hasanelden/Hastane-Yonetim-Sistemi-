document.addEventListener("DOMContentLoaded", sayfaAcilincaYukle());

$(document).ready(function() {

    $(".DoktorEkle").click(function() {
        let tablo = document.querySelector('#tblo>tbody');
        let frst = $("#inputfirst").val();
        let lst = $("#inputlast").val();
        let inno = $("#inputno").val();
        let phone = $("#inputPhone").val();
        let adress = $("#inputaddres").val()




        let duzenle = document.createElement("button");
        duzenle.className = 'btn-xs btn btn-info btn-edit update-btn';
        duzenle.type = 'button';
        duzenle.id = "duzenleModal";
        duzenle.textContent = 'Düzenle';

        let silme = document.createElement("button");
        silme.className = 'btn-xs btn btn-danger delete-btn';
        silme.type = 'button';
        silme.textContent = 'Sil';




        let dizi = [frst, lst, inno, phone, adress, duzenle, silme];


        if (lst == 0 || frst == 0 || inno == 0 || phone.length !== 14 || adress == 0) {
            swal("Kayıt Oluşturulamadı!", "Lütfen Tüm alanları doğru ve düzgün doldurunuz", "error");
            ConstantSourceNode
        } else {
            swal("Kayıt Oluşturuldu!", "", "success");
            let trSatir = document.createElement('tr');

            for (let i = 0; i < 7; i++) {
                if (i <= 4) {
                    let trSutun = document.createElement('td');
                    trSutun.textContent = dizi[i];
                    trSatir.appendChild(trSutun);

                } else {
                    let trSutun = document.createElement('td');
                    trSutun.appendChild(dizi[i]);
                    trSatir.appendChild(trSutun);
                }

            }


            dizi = [frst, lst, inno, phone, adress, duzenle.toString(), silme.toString()];

            tablo.appendChild(trSatir);
            ekleLocalStorage(dizi);
            $("#exampleModal .close").click()
            $("#exampleModal input").val("")
            $("#exampleModal textarea").val("")
            window.location.reload()
        }
    })


    $(document).on('click', '.delete-btn', function() {


        swal({
                title: "Emin misin?",
                text: " Bir kere silindiğinde, bu Doktor kaydını kurtaramazsınız!",
                icon: "warning",
                buttons: true,


                dangerMode: true,

                buttons: ["İPTAL", "SİL"]


            })
            .then((willDelete) => {
                if (willDelete) {

                    swal("Doktor Kaydı Başarıyla silindi!", {
                        icon: "success",
                        buttons: true,
                        buttons: "KAPAT"
                    });


                    let indis = $(this).parent().parent().index('tr') - 1;
                    kisiSilLocaStorage(indis);
                    $(this).parent().parent().remove();

                } else {
                    swal("Doktor Kaydı güvende!", {
                        buttons: true,
                        buttons: "KAPAT"
                    });
                }

            });
    })





})



$(document).on('click', '.update-btn', function() {
    //    Kişiyidüzenle(this);
    console.log("...")

    $("#duzenleModal").modal();

    let edit = $(this).parent().parent();

    document.getElementById('inputIsim').value = edit[0].cells[0].textContent;
    document.getElementById('inputSoyIsim').value = edit[0].cells[1].textContent;

    document.getElementById('inputTelefon').value = edit[0].cells[3].textContent;
    document.getElementById('inputAdres').value = edit[0].cells[4].textContent;

    $("#update").click(function() {


        edit[0].cells[0].textContent = document.getElementById('inputIsim').value;
        edit[0].cells[1].textContent = document.getElementById('inputSoyIsim').value;
        edit[0].cells[3].textContent = document.getElementById('inputTelefon').value;
        edit[0].cells[4].textContent = document.getElementById('inputAdres').value;


        let kayitliBilgiler = alLocalStorage();
        console.log(kayitliBilgiler)
        let guncellenenBilgiler = [];
        kayitliBilgiler.forEach(function(kisi) {
            if (kisi[2] === edit[0].cells[2].textContent) {
                kisi[0] = document.getElementById('inputIsim').value;
                kisi[1] = document.getElementById('inputSoyIsim').value;
                kisi[3] = document.getElementById('inputTelefon').value;
                kisi[4] = document.getElementById('inputAdres').value;
                guncellenenBilgiler.push(kisi);
            } else {
                guncellenenBilgiler.push(kisi);
            }
        })

        localStorage.setItem("doktorBilgileri", JSON.stringify(guncellenenBilgiler));
        if (document.getElementById('inputIsim').value == "" || document.getElementById('inputSoyIsim').value == "" || document.getElementById('inputTelefon').value.length !== 14 || document.getElementById('inputAdres').value == "") {
            swal("Kayıt Düzenlenemedi!", "Lütfen Tüm alanları Düzgün ve doğru doldurunuz", "error", {
                buttons: true,
                buttons: "KAPAT"
            });

        } else {

            swal("Güncellendi!", "", "success", {
                buttons: true,
                buttons: "KAPAT"
            });


        }

        $("#duzenleModal .close").click()

    })
})

function kisiSilLocaStorage(silinecekKisi) {
    let kayitliBilgiler = alLocalStorage();
    kayitliBilgiler.splice(silinecekKisi, 1);
    localStorage.setItem("doktorBilgileri", JSON.stringify(kayitliBilgiler));
}



function tarayiciyaEkle(kisi) {
    let tablo = document.querySelector('#tblo>tbody');

    let frst = kisi[0];
    let lst = kisi[1];
    let inno = kisi[2];
    let phone = kisi[3];
    let adress = kisi[4];

    let duzenle = document.createElement("button");
    duzenle.className = 'btn-xs btn btn-info btn-edit update-btn';
    duzenle.type = 'button';
    duzenle.textContent = 'Düzenle';




    let silme = document.createElement("button");
    silme.className = 'btn-xs btn btn-danger delete-btn';
    silme.type = 'button';
    silme.textContent = 'Sil';



    let dizi = [frst, lst, inno, phone, adress, duzenle, silme];
    let trSatir = document.createElement('tr');

    for (let i = 0; i < 7; i++) {
        if (i <= 4) {
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

function ekleLocalStorage(yeniBilgi) {
    let kayitliBilgiler = alLocalStorage();
    kayitliBilgiler.push(yeniBilgi);
    localStorage.setItem("doktorBilgileri", JSON.stringify(kayitliBilgiler));
}

function alLocalStorage() {
    let bilgiler;

    if (localStorage.getItem("doktorBilgileri") === null) {
        bilgiler = [];
    } else {
        bilgiler = JSON.parse(localStorage.getItem("doktorBilgileri"));
    }
    return bilgiler;
}




$('#inputPhone')

.keydown(function(e) {
    var key = e.charCode || e.keyCode || 0;
    $phone = $(this);


    if (key !== 8 && key !== 9) {
        if ($phone.val().length === 4) {
            $phone.val($phone.val() + ')');
        }
        if ($phone.val().length === 5) {
            $phone.val($phone.val() + ' ');
        }
        if ($phone.val().length === 9) {
            $phone.val($phone.val() + '-');
        }
    }

    return (key == 8 ||
        key == 9 ||
        key == 46 ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
})

.bind('focus click', function() {
    $phone = $(this);

    if ($phone.val().length === 0) {
        $phone.val('(');
    } else {
        var val = $phone.val();
        $phone.val('').val(val);
    }
})

.blur(function() {
    $phone = $(this);

    if ($phone.val() === '(') {
        $phone.val('');
    }
});



$('#inputTelefon')

.keydown(function(e) {
    var key = e.charCode || e.keyCode || 0;
    $phone = $(this);


    if (key !== 8 && key !== 9) {
        if ($phone.val().length === 4) {
            $phone.val($phone.val() + ')');
        }
        if ($phone.val().length === 5) {
            $phone.val($phone.val() + ' ');
        }
        if ($phone.val().length === 9) {
            $phone.val($phone.val() + '-');
        }
    }


    return (key == 8 ||
        key == 9 ||
        key == 46 ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
})

.bind('focus click', function() {
    $phone = $(this);

    if ($phone.val().length === 0) {
        $phone.val('(');
    } else {
        var val = $phone.val();
        $phone.val('').val(val);
    }
})

.blur(function() {
    $phone = $(this);

    if ($phone.val() === '(') {
        $phone.val('');
    }
});