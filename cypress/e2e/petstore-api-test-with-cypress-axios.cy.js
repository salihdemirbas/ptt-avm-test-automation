const axios = require('axios');

describe('PetStore Simple API Test', () => {
  const baseUrl = 'https://petstore.swagger.io/v2';
  
  it('should get pets by status=available successfully', async () => {
    try {
      const response = await axios.get(`${baseUrl}/pet/findByStatus?status=available`);
      
      // Status code kontrolü
      expect(response.status).to.equal(200);
      
      // Response data kontrolü
      expect(response.data).to.be.an('array');
      expect(response.data.length).to.be.greaterThan(0);
      
      // İlk pet'in yapısını kontrol et
      const firstPet = response.data[0];
      expect(firstPet).to.have.property('id');
      expect(firstPet).to.have.property('name');
      expect(firstPet).to.have.property('tags');
      expect(firstPet).to.have.property('status');
      expect(firstPet.status).to.equal('available');
      expect(firstPet.category.id).to.equal(0);

      
      
      
      
      cy.log('Pet status=available API testi başarılı');
      cy.log(`Bulunan pet sayısı: ${response.data.length}`);
      
    } catch (error) {
      cy.log('Pet status=available API testi başarısız:', error.message);
      throw error;
    }
  });

  it('should get pets by status=pending successfully', async () => {
    try {
      const response = await axios.get(`${baseUrl}/pet/findByStatus?status=pending`);
      
      // Status code kontrolü
      expect(response.status).to.equal(200);
      
      // Response data kontrolü
      expect(response.data).to.be.an('array');
      
      // İlk pet'in yapısını kontrol et (eğer varsa)
      if (response.data.length > 0) {
        const firstPet = response.data[0];
        expect(firstPet).to.have.property('id');
        expect(firstPet).to.have.property('name');
        expect(firstPet).to.have.property('status');
        expect(firstPet.status).to.equal('pending');
      }
      
      cy.log('Pet status=pending API testi başarılı');
      cy.log(`Bulunan pet sayısı: ${response.data.length}`);
      
    } catch (error) {
      cy.log('Pet status=pending API testi başarısız:', error.message);
      throw error;
    }
  });

  it('should get pets by status=sold successfully', async () => {
    try {
      const response = await axios.get(`${baseUrl}/pet/findByStatus?status=sold`);
      
      // Status code kontrolü
      expect(response.status).to.equal(200);
      
      // Response data kontrolü
      expect(response.data).to.be.an('array');
      
      // İlk pet'in yapısını kontrol et 
      if (response.data.length > 0) {
        const firstPet = response.data[0];
        expect(firstPet).to.have.property('id');
        expect(firstPet).to.have.property('name');
        expect(firstPet).to.have.property('status');
        expect(firstPet.status).to.equal('sold');
      }
      
      cy.log('Pet status=sold API testi başarılı');
      cy.log(`Bulunan pet sayısı: ${response.data.length}`);
      
    } catch (error) {
      cy.log('Pet status=sold API testi başarısız:', error.message);
      throw error;
    }
  });

  it('should add a new pet successfully via POST', async () => {
    
    const newPet = {
      id: 16,
      category: { id: 1, name: 'Dogs' },
      name: 'Gofret',
      photoUrls: ['https://www.pttavm.com/'],
      tags: [{ id: 1, name: 'test' }],
      status: 'available'
    };

    try {
      const response = await axios.post(`${baseUrl}/pet`, newPet, {
        headers: { 'Content-Type': 'application/json' }
      });
      // Status code kontrolü
      expect(response.status).to.equal(200);
      // Response data kontrolü
      expect(response.data).to.be.an('object');
      expect(response.data.id).to.equal(newPet.id);
      expect(response.data.name).to.equal(newPet.name);
      expect(response.data.status).to.equal(newPet.status);
      expect(response.data.category.name).to.equal(newPet.category.name);
      expect(response.data.photoUrls).to.deep.equal(newPet.photoUrls);
      expect(response.data.tags).to.deep.equal(newPet.tags);
      cy.log('Pet POST ile başarıyla eklendi');
      cy.log(`Eklenen pet ID: ${response.data.id}`);
    } catch (error) {
      cy.log('Pet POST testi başarısız:', error.message);
      throw error;
    }
  });
}); 