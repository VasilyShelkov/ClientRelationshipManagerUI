const faker = require('faker');
const moment = require('moment');

class CreateHelper extends Helper {
  createFakeUser() {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
      password: 'test1234'
    };
  }

  createFakeCompany() {
    return {
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumberFormat(),
    };
  }

  createFakeName() {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.phoneNumberFormat(),
      company: this.createFakeCompany()
    };
  }

  createCurrentDay() {
    return moment().format('D');
  }

  createCurrentMonth() {
    return moment().format('MMMM');
  }
}

module.exports = CreateHelper;
