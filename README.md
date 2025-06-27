# PTT AVM E2E Test Projesi

Bu proje, PTT AVM web sitesinin end-to-end (E2E) testlerini ve PetStore API testlerini içeren Cypress tabanlı bir test otomasyon projesidir.

## 🛠️ Kullanılan Teknolojiler

- **Cypress**: E2E test framework'ü
- **JavaScript**: Programlama dili
- **Axios**: HTTP client (API testleri için)
- **Page Object Model (POM)**: Test tasarım pattern'i
- **Node.js**: Runtime environment
- **Mochawesome**: Test raporlama sistemi

## 📁 Proje Yapısı

```
PTT_TEST/
├── cypress/
│   ├── e2e/                    # Test dosyaları
│   │   ├── sepetkontrol.cy.js  # Sepet işlemleri testi
│   │   ├── favorikontrol.cy.js # Favori işlemleri testi
│   │   └── petstore-api-test-with-cypress-axios.cy.js # PetStore API testleri
│   ├── fixtures/               # Test verileri
│   ├── reports/                # Test raporları
│   │   └── mochawesome/        # Mochawesome raporları
│   │       ├── html/           # HTML raporları
│   │       │   ├── assets/     # Rapor assets'leri
│   │       │   └── report.html # Ana rapor dosyası
│   │       └── *.json          # JSON rapor dosyaları
│   ├── support/
│   │   ├── pageObjects/        # Page Object Model sınıfları
│   │   │   ├── HomePage.js
│   │   │   ├── ListPage.js
│   │   │   ├── ProductDetailPage.js
│   │   │   ├── CheckoutPage.js
│   │   │   └── FavoritePage.js
│   │   ├── commands.js         # Özel Cypress komutları
│   │   └── e2e.js             # E2E test konfigürasyonu
│   └── cypress.config.js       # Cypress konfigürasyonu
├── package.json                # Proje bağımlılıkları
├── mochawesome-report.json     # Birleştirilmiş rapor dosyası
└── README.md                   # Bu dosya
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Kurulum Adımları

1. **Projeyi klonlayın:**
   ```bash
   git clone [https://github.com/salihdemirbas/ptt-avm-test-automation]
   cd ptt-avm-test-automation
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Cypress'i kurun:**
   ```bash
   npx cypress install
   ```

4. **Axios'u kurun (API testleri için):**
   ```bash
   npm install axios
   ```

### Testleri Çalıştırma

#### Arayüz ile Test Çalıştırma
```bash
npm run cypress:open
```

#### Komut Satırından Test Çalıştırma (Headless)
```bash
npm run cypress:run
```

#### Tarayıcıda Test Çalıştırma (Headed)
```bash
npm run test:run
```

#### Sadece Testleri Çalıştırma (Rapor Olmadan)
```bash
npm run test:all
```

#### Testleri Çalıştırıp Rapor Oluşturma ve Açma ⭐ **ÖNERİLEN**
```bash
npm run test:with-report
```

Bu komut sırasıyla:
1. Testleri Chrome tarayıcısında çalıştırır
2. Mochawesome raporunu oluşturur
3. HTML raporunu otomatik olarak tarayıcıda açar

#### Sadece Rapor Oluşturma
```bash
npm run report:generate
```

#### Sadece Raporu Açma
```bash
npm run report:open
```

#### Sadece API Testlerini Çalıştırma
```bash
npx cypress run --spec "cypress/e2e/petstore-api-test-with-cypress-axios.cy.js"
```

## 📊 Test Raporlama

Bu proje **Mochawesome** raporlama sistemi kullanmaktadır. Testler çalıştırıldıktan sonra:

- **JSON Raporları**: `cypress/reports/mochawesome/` klasöründe saklanır
- **HTML Raporu**: `cypress/reports/mochawesome/html/report.html` dosyasında oluşturulur
- **Birleştirilmiş Rapor**: `mochawesome-report.json` dosyasında tüm test sonuçları birleştirilir

### Rapor Özellikleri
- Test sonuçlarının detaylı görünümü
- Başarılı/başarısız test sayıları
- Test süreleri
- Hata detayları ve ekran görüntüleri
- Responsive tasarım

### Önemli Notlar
- **Test başarısız olsa bile rapor oluşturulur ve açılır**
- Raporlar `cypress/reports/mochawesome/html/` klasöründe saklanır
- Her test çalıştırmasında yeni rapor dosyaları oluşturulur

## 📋 Test Senaryoları

### 1. Sepet Kontrolü (`sepetkontrol.cy.js`)
- Kullanıcı girişi
- Ürün arama
- Ürün seçimi
- Sepete ekleme
- Sepet kontrolü (ürün adı, fiyat)
- Ürünü sepetten silme

### 2. Favori Kontrolü (`favorikontrol.cy.js`)
- Kullanıcı girişi
- Ürün arama
- Ürün seçimi
- Favorilere ekleme
- Favori listesi kontrolü
- Favori ürünü silme

### 3. PetStore API Testleri (`petstore-api-test-with-cypress-axios.cy.js`)

#### API Endpoint'leri Test Edilenler:
- **Base URL**: `https://petstore.swagger.io/v2`
- **GET** `/pet/findByStatus` - Status'a göre pet listesi alma
- **POST** `/pet` - Yeni pet ekleme

#### Test Senaryoları:

##### GET `/pet/findByStatus` Testleri:
1. **Status=available**: Mevcut petleri listele
   - Status code: 200
   - Response: Array formatında
   - İlk pet'in yapısı kontrol edilir (id, name, tags, status)
   - Status "available" olmalı

2. **Status=pending**: Bekleyen petleri listele
   - Status code: 200
   - Response: Array formatında
   - Pet varsa yapısı kontrol edilir
   - Status "pending" olmalı

3. **Status=sold**: Satılan petleri listele
   - Status code: 200
   - Response: Array formatında
   - Pet varsa yapısı kontrol edilir
   - Status "sold" olmalı

##### POST `/pet` Testi:
1. **Yeni Pet Ekleme**:
   - Test verisi:
     ```json
     {
       "id": 16,
       "category": { "id": 1, "name": "Dogs" },
       "name": "Gofret",
       "photoUrls": ["https://www.pttavm.com/"],
       "tags": [{ "id": 1, "name": "test" }],
       "status": "available"
     }
     ```
   - Status code: 200
   - Response'da gönderilen veriler doğrulanır
   - Pet başarıyla eklenir

## ⚙️ Konfigürasyon

### Cypress Konfigürasyonu (`cypress.config.js`)
- Test URL'leri
- Timeout ayarları (15 saniye)
- Browser ayarları
- Retry ayarları (2 kez)
- Screenshot ayarları

### API Test Konfigürasyonu
- PetStore API Base URL: `https://petstore.swagger.io/v2`
- Content-Type: `application/json`
- Test verileri için rastgele ID'ler

## 🔧 Özellikler

### Element Bulunamama Sorunu Çözümü
- Tüm element seçicilerinde timeout ayarları (10-30 saniye)
- Sayfa yüklenme bekleme stratejileri
- Retry mekanizması
- Güvenilir element bulma komutları

### Rapor Sorunu Çözümü
- Test başarısız olsa bile rapor oluşturma
- Otomatik rapor açma
- Detaylı hata raporlama
- Screenshot alma

## 🚀 Hızlı Başlangıç

1. **Kurulum:**
   ```bash
   npm install
   ```

2. **Testleri çalıştır ve rapor al:**
   ```bash
   npm run test:with-report
   ```

3. **Rapor otomatik olarak tarayıcıda açılacaktır!**



