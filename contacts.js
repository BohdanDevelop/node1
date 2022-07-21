const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const contactsFile = fs.readFile(contactsPath);
const contacts = require(contactsPath);
const ObjectID = require("bson-objectid");
function listContacts() {
  contactsFile.then((data) => console.log(data.toString()));
}
function getContactById(contactId) {
  contactsFile.then((data) => {
    const parsedData = JSON.parse(data);
    const requiredContact = parsedData.find(
      ({ id }) => contactId.toString() === id
    );
    if (!requiredContact) console.log(null);
    else console.log(requiredContact);
  });
}
function removeContact(contactId) {
  contactsFile
    .then((data) => {
      const parsedData = JSON.parse(data);
      const deletedBook = parsedData.find(
        ({ id }) => id === contactId.toString()
      );
      if (!deletedBook) console.log(undefined);
      else {
        const filteredData = parsedData.filter(
          ({ id }) => id !== contactId.toString()
        );
        const jsonData = JSON.stringify(filteredData, null, 2);
        fs.writeFile(contactsPath, jsonData).then((data) =>
          console.log(deletedBook)
        );
      }
    })
    .catch((error) => console.log(error));
}
function addContact({ name, email, phone }) {
  contactsFile
    .then((data) => {
      const parsedData = JSON.parse(data);
      const bookToAdd = {
        name,
        email,
        phone: phone.toString(),
        id: ObjectID(),
      };
      parsedData.push(bookToAdd);
      const jsonData = JSON.stringify(parsedData, null, 2);

      fs.writeFile(contactsPath, jsonData).then((data) =>
        console.log(bookToAdd)
      );
    })
    .catch((error) => console.log(error));
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
