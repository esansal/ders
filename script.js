// Ders saatleri (saat: dakika formatında)
const dersSaatleri = [
  { ders: "Ders 1", baslangic: "08:30", bitis: "09:10" },
  { ders: "Ders 2", baslangic: "09:15", bitis: "09:55" },
  { ders: "Ders 3", baslangic: "10:10", bitis: "10:50" },
  { ders: "Ders 4", baslangic: "10:55", bitis: "11:35" },
  { ders: "Ders 5", baslangic: "11:40", bitis: "12:20" },
  { ders: "Ders 6", baslangic: "12:25", bitis: "13:05" },
  { ders: "Ders 7", baslangic: "13:10", bitis: "13:50" },
  { ders: "Ders 8", baslangic: "13:55", bitis: "14:35" },
  { ders: "Ders 9", baslangic: "14:45", bitis: "15:25" },
  { ders: "Ders 10", baslangic: "15:30", bitis: "16:10" },
  { ders: "Ders 11", baslangic: "16:15", bitis: "16:55" }
];

let currentDersIndex = -1;
let kalanSure = 0; // Başlangıçta kalan süre sıfır

const now = new Date();

// Saat kontrolü
function saatKontrol() {
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

  let dersMesaj = "Dersin saatini belirleyemedik.";
  let dersBulundu = false;

  for (let i = 0; i < dersSaatleri.length; i++) {
    if (currentTime >= dersSaatleri[i].baslangic && currentTime < dersSaatleri[i].bitis) {
      currentDersIndex = i;
      dersMesaj = `${dersSaatleri[i].ders} dersindesiniz!`;
      // Kalan süreyi hesapla
      const [bitisSaat, bitisDakika] = dersSaatleri[i].bitis.split(":").map(Number);
      const bitisZamani = new Date();
      bitisZamani.setHours(bitisSaat, bitisDakika, 0, 0);

      kalanSure = Math.floor((bitisZamani - now) / 1000); // Kalan süreyi saniye cinsinden hesapla
      dersBulundu = true;
      break;
    }
  }

  // Dersin bitip bitmediğini kontrol et
  if (!dersBulundu || currentTime >= dersSaatleri[dersSaatleri.length - 1].bitis) {
    dersMesaj = "Ders bitti!";
    kalanSure = 0;
  }

  // Ekranda göstermek
  document.getElementById('message').textContent = dersMesaj;
}

// Geri sayımı başlat
function geriSayim() {
  if (kalanSure > 0) {
    const dakika = Math.floor(kalanSure / 60);
    const saniye = kalanSure % 60;

    // Zamanı ekranda göster
    document.getElementById('timer').textContent = 
      `${dakika.toString().padStart(2, '0')}:${saniye.toString().padStart(2, '0')}`;

    kalanSure--;
  } else {
    clearInterval(interval);
    document.getElementById('timer').textContent = "Ders Bitti!";
  }
}

// Saat kontrolü her dakika yapılacak
setInterval(() => {
  saatKontrol(); // Saatleri kontrol et
}, 60000);

setInterval(geriSayim, 1000); // Her saniye geri sayımı güncelle
