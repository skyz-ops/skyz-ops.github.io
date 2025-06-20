<?php
// Data profil
$profil = [
    'username' => '@aphrodite_',
    'slogan' => 'Kodekan. Remix. Tembak.',
    'kutipan' => '"Frustasi bukan tanda mau menyerah pada satu hal. Itu bukti kamu masih peduli dengan mimpi yang ingin dikejar."',
    'judul_tentang' => '-= Tentang Qu =-',
    'teks_tentang' => 'Cuma iseng aja sebenernya, tapi kalau mau menggunakan jasa kami bisa hubungi lewat kontak di atas ya.',
    'ikon' => 'bi-terminal-fill',
    'warna_tema' => '#6bc4ff'
];

// Daftar tautan
$tautan = [
    ['judul' => 'Unduh Zynect', 'url' => '/download', 'ikon' => 'bi-globe2'],
    ['judul' => 'Daftar Zynect', 'url' => '/register', 'ikon' => 'bi-globe2'],
    ['judul' => 'Masuk Zynect', 'url' => '/login', 'ikon' => 'bi-globe2'],
    ['judul' => 'TikTok', 'url' => 'https://tiktok.com/@skyzheeaje', 'ikon' => 'bi-tiktok'],
    ['judul' => 'YouTube', 'url' => 'https://www.youtube.com/@SkyzENZO', 'ikon' => 'bi-youtube'],
    ['judul' => 'Instagram', 'url' => 'https://www.instagram.com/mam.foreverr_', 'ikon' => 'bi-instagram']
];

// Info pengunjung
$ip_pengunjung = $_SERVER['REMOTE_ADDR'];
$lokasi_pengunjung = "Mendeteksi lokasi...";

// Fungsi untuk mendapatkan lokasi
function dapatkanLokasi($ip) {
    if ($ip === '127.0.0.1' || $ip === '::1') {
        return "Lokal";
    }
    
    $url = "https://ipapi.co/{$ip}/json/";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $data = json_decode($response, true);
    
    if (isset($data['error'])) {
        return "Lokasi tidak diketahui";
    }
    
    $lokasi = [];
    if (!empty($data['city'])) $lokasi[] = $data['city'];
    if (!empty($data['country_name'])) $lokasi[] = $data['country_name'];
    
    return !empty($lokasi) ? implode(', ', $lokasi) : "Lokasi tidak diketahui";
}

$lokasi_pengunjung = dapatkanLokasi($ip_pengunjung);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  
  <meta name="title" content="<?= htmlspecialchars($profil['username']) ?> | Profil & Tautan Sosial">
  <meta name="description" content="Profil <?= htmlspecialchars($profil['username']) ?> untuk melihat karya, tautan media sosial, dan kutipan inspiratif. Desain sederhana, bersih, dan modern.">
  <meta name="keywords" content="profil web, portfolio, developer, media sosial">
  <meta name="author" content="aphrodite_">
  <meta name="robots" content="index, follow" />
  <meta name="language" content="id" />
  <meta name="theme-color" content="#0f0f0f" />

  <title><?= htmlspecialchars($profil['username']) ?> | Profil & Tautan Sosial</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --warna-utama: <?= $profil['warna_tema'] ?>;
      --warna-latar: #0f0f0f;
      --warna-kartu: #181818;
      --warna-teks: #fff;
      --teks-sekunder: #aaa;
      --warna-border: #222;
    }

    body {
      margin: 0;
      padding: 0;
      background: var(--warna-latar);
      color: var(--warna-teks);
      font-family: 'Roboto Mono', monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      transition: background 0.3s ease;
    }

    .kontainer-profil {
      text-align: center;
      max-width: 500px;
      padding: 30px;
      background: var(--warna-kartu);
      border-radius: 16px;
      box-shadow: 0 0 20px rgba(0,255,255,0.08);
      transition: all 0.3s ease;
      margin: 20px;
    }

    .ikon {
      font-size: 50px;
      color: var(--warna-utama);
      transition: color 0.3s ease;
    }

    h1 {
      font-family: 'Orbitron', sans-serif;
      font-size: 28px;
      color: var(--warna-teks);
      margin: 10px 0;
      transition: color 0.3s ease;
    }

    .deskripsi {
      font-size: 14px;
      color: var(--teks-sekunder);
      margin-bottom: 20px;
      transition: color 0.3s ease;
    }

    .kutipan {
      font-size: 13px;
      font-style: italic;
      color: #bbb;
      margin: 20px auto;
      padding: 10px 20px;
      border-left: 3px solid var(--warna-utama);
      background-color: #121212;
      border-radius: 6px;
      max-width: 400px;
      transition: border-color 0.3s ease;
    }

    .daftar-tautan {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 25px;
    }

    .daftar-tautan a {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      background: var(--warna-border);
      color: var(--warna-teks);
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      transition: all 0.2s ease-in-out;
    }

    .daftar-tautan a i {
      margin-right: 8px;
    }

    .daftar-tautan a:hover {
      background: var(--warna-utama);
      color: #000;
      transform: translateY(-2px);
    }

    .tentang {
      margin-top: 40px;
      font-size: 13px;
      color: #999;
      line-height: 1.6;
    }

    .tentang h2 {
      font-size: 15px;
      color: var(--warna-utama);
      margin-bottom: 8px;
      transition: color 0.3s ease;
    }

    #info-pengunjung {
      font-size: 13px;
      color: var(--warna-utama);
      margin-top: 15px;
      transition: color 0.3s ease;
    }

    .tombol-tema {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--warna-border);
      border: none;
      color: var(--warna-teks);
      padding: 8px 12px;
      border-radius: 20px;
      cursor: pointer;
      font-family: 'Roboto Mono', monospace;
      font-size: 12px;
      transition: all 0.3s ease;
    }

    .tombol-tema:hover {
      background: var(--warna-utama);
      color: #000;
    }

    @media (max-width: 600px) {
      .kontainer-profil {
        padding: 20px;
        margin: 15px;
      }
      
      h1 {
        font-size: 24px;
      }
      
      .daftar-tautan a {
        padding: 10px;
      }
    }
  </style>
</head>
<body>
  <button class="tombol-tema" id="tombolTema">Mode Gelap</button>
  
  <div class="kontainer-profil">
    <div><i class="bi <?= htmlspecialchars($profil['ikon']) ?> ikon"></i></div>
    <h1><?= htmlspecialchars($profil['username']) ?></h1>
    <p class="deskripsi"><?= htmlspecialchars($profil['slogan']) ?></p>
    <blockquote class="kutipan"><?= htmlspecialchars($profil['kutipan']) ?></blockquote>
    <p id="info-pengunjung">
      [ Pengunjung: <?= htmlspecialchars($lokasi_pengunjung) ?> (<?= htmlspecialchars($ip_pengunjung) ?>) ]
    </p>
    
    <div class="daftar-tautan">
      <?php foreach ($tautan as $taut): ?>
        <a href="<?= htmlspecialchars($taut['url']) ?>" target="_blank">
          <i class="bi <?= htmlspecialchars($taut['ikon']) ?>"></i> 
          <?= htmlspecialchars($taut['judul']) ?>
        </a>
      <?php endforeach; ?>
    </div>

    <div class="tentang">
      <h2><?= htmlspecialchars($profil['judul_tentang']) ?></h2>
      <p><?= htmlspecialchars($profil['teks_tentang']) ?></p>
    </div>
  </div>

  <script>
    // Toggle tema
    const tombolTema = document.getElementById('tombolTema');
    let modeGelap = true;

    tombolTema.addEventListener('click', () => {
      modeGelap = !modeGelap;
      
      if (modeGelap) {
        document.documentElement.style.setProperty('--warna-utama', '<?= $profil['warna_tema'] ?>');
        document.documentElement.style.setProperty('--warna-latar', '#0f0f0f');
        document.documentElement.style.setProperty('--warna-kartu', '#181818');
        document.documentElement.style.setProperty('--warna-teks', '#fff');
        document.documentElement.style.setProperty('--teks-sekunder', '#aaa');
        document.documentElement.style.setProperty('--warna-border', '#222');
        tombolTema.textContent = 'Mode Gelap';
      } else {
        document.documentElement.style.setProperty('--warna-utama', '#3a86ff');
        document.documentElement.style.setProperty('--warna-latar', '#f5f5f5');
        document.documentElement.style.setProperty('--warna-kartu', '#ffffff');
        document.documentElement.style.setProperty('--warna-teks', '#333');
        document.documentElement.style.setProperty('--teks-sekunder', '#666');
        document.documentElement.style.setProperty('--warna-border', '#ddd');
        tombolTema.textContent = 'Mode Terang';
      }
    });
  </script>
</body>
</html>
