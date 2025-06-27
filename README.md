# PTT AVM E2E Test Projesi

Bu proje, PTT AVM web sitesinin end-to-end (E2E) testlerini ve PetStore API testlerini içeren Cypress tabanlı bir test otomasyon projesidir.

## 🛠️ Kullanılan Teknolojiler

- **Cypress**: E2E test framework'ü
- **JavaScript**: Programlama dili
- **Axios**: HTTP client (API testleri için)
- **Page Object Model (POM)**: Test tasarım pattern'i
- **Node.js**: Runtime environment

## 📁 Proje Yapısı

```
PTT_TEST/
├── cypress/
│   ├── e2e/                    # Test dosyaları
│   │   ├── sepetkontrol.cy.js  # Sepet işlemleri testi
│   │   ├── favorikontrol.cy.js # Favori işlemleri testi
│   │   └── petstore-api-test-with-cypress-axios.cy.js # PetStore API testleri
│   ├── fixtures/               # Test verileri
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
└── README.md                   # Bu dosya
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn


### Kurulum Adımları

1. **Projeyi klonlayın:**
   ```bash
   git clone [repository-url]
   cd PTT_TEST
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

#### Komut Satırından Test Çalıştırma
```bash
npm run cypress:run
```

#### Sadece API Testlerini Çalıştırma
```bash
npx cypress run --spec "cypress/e2e/petstore-api-test-with-cypress-axios.cy.js"
```

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
- Timeout ayarları
- Browser ayarları

### API Test Konfigürasyonu
- PetStore API Base URL: `https://petstore.swagger.io/v2`
- Content-Type: `application/json`
- Test verileri için rastgele ID'ler

### Test Verileri
- Kullanıcı bilgileri
- Test ürünleri
- Pet test verileri
- Beklenen sonuçlar



