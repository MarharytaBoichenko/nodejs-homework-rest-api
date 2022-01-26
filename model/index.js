// const { Contact } = require("./contact");
// const { contactJoiSchema } = require("./contact");
const { Contact, contactJoiSchema, favoriteJoiSchema } = require("./contact");

module.exports = { Contact, contactJoiSchema, favoriteJoiSchema };
// const fs = require("fs/promises");
// const { v4 } = require("uuid");
// // const contacts = require("./contacts.json");
// const path = require("path");

// const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(data);
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const contactById = contacts.find((el) => el.id === contactId);
//   return contactById;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   // найти  индекс удаляемого эл-та
//   const idx = contacts.findIndex((el) => el.id === contactId);
//   // если не найдено
//   if (idx === -1) {
//     return null;
//   }
//   const newContacts = contacts.filter((el, index) => idx !== index);
//   await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
//   return contacts[idx];
// };

// const addContact = async (name, email, phone) => {
//   const contacts = await listContacts();
//   const newContact = { id: v4(), name, email, phone };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const updateContact = async (contactId, name, email, phone) => {
//   const contacts = await listContacts();
//   // найти  индекс нужного эл-та
//   const idx = contacts.findIndex((el) => el.id === contactId);
//   // если не найдено
//   if (idx === -1) {
//     return null;
//   }
//   contacts[idx] = {
//     name,
//     email,
//     phone,
//   };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[idx];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
