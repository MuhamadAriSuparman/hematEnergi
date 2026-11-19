// ==========================================
// 1. SCRIPT UNTUK MENU TOGGLE (NAVIGASI)
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  const labelEl = menuToggle.querySelector('.menu-label');
  if (labelEl) labelEl.textContent = isOpen ? 'Tutup' : 'Menu';
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    const labelEl = menuToggle?.querySelector('.menu-label');
    if (labelEl) labelEl.textContent = 'Menu';
  });
});


// ==========================================
// 2. SCRIPT UNTUK MENAMPILKAN GRAFIK CHART.JS (HORIZONTAL)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Memastikan variabel DATA_ENERGI dari file data-perilaku-energi.js sudah dimuat
    if (typeof DATA_ENERGI === 'undefined') {
      console.error("Variabel DATA_ENERGI tidak ditemukan. Pastikan file data-perilaku-energi.js dipanggil sebelum script.js di HTML!");
      return;
    }

    const data = DATA_ENERGI;

    // Mengambil label kode dan nama butir pertanyaan dari data JSON
    const labels = data.per_butir.map(item => `${item.kode}: ${item.label}`);
    
    // Mengambil nilai rata-rata skor dari setiap butir pertanyaan
    const values = data.per_butir.map(item => item.rata_rata);

    // Menyiapkan elemen canvas di HTML dan merender grafik batang horizontal
    const canvasElement = document.getElementById('grafikAngket');
    if (canvasElement) {
      const ctx = canvasElement.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Rata-rata Skor Kuesioner (Skala 1 - 4)',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y', // Grafik horizontal
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#ffffff' // Warna teks legenda di atas menjadi putih terang
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 4.0,
              ticks: {
                color: '#ffffff' // Warna angka sumbu X menjadi putih
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)' // Garis grid tipis agar senada
              }
            },
            y: {
              ticks: {
                color: '#ffffff', // <-- WARNA TULISAN PERTANYAAN JADI PUTIH TERANG
                font: {
                  size: 12,
                  weight: 'bold' // Teks dipertebal
                }
              },
              grid: {
                display: false // Menghilangkan garis grid vertikal agar bersih
              }
            }
          }
        }
      });
    }
  } catch (error) {
    console.error("Gagal merender grafik:", error);
  }
});