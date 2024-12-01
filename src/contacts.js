import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const __dirname = import.meta.dirname;
const contactsPath = path.join(__dirname, "db", "contacts.json"); // path to file contacts.js

export const readAllContacts = async () => {
  const contactsAsBuffer = await fs.readFile(contactsPath);
  const contactsAsObject = JSON.parse(contactsAsBuffer);

  return contactsAsObject || null;
};

export const getContactById = async id => {
  const allContacts = await readAllContacts();
  const searchedContact = allContacts.find(contact => contact.id === id);

  return searchedContact || null;
};

export const addNewContact = async (name, email, phone) => {
  const allContacts = await readAllContacts();
  const newContact = { id: nanoid(), name, email, phone };
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact || null;
};

export const editContact = async data => {
  const allContacts = await readAllContacts();
  const idx = allContacts.findIndex(contact => contact.id === data.id);
  allContacts[idx] = data;

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return data || null;
};

export const deleteContact = async id => {
  const allContacts = await readAllContacts();
  const { deletedContact, updatedContacts } = allContacts.reduce(
    (acc, contact) => {
      if (contact.id === id) acc.deletedContact = contact;
      else acc.updatedContacts.push(contact);
      return acc; // mandatory entry for .reduce()
    },
    { deletedContact: null, updatedContacts: [] },
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  return deletedContact;
};

// readAllContacts();

// getContactById("qdggE76Jtbfd9eWJHrssH");

// addNewContact("Andrii", "email@mail.com", "555-55-55");

// editContact({
//   id: "YYvumJ-MTxqtYnOxEsJvT",
//   name: "Andrii-2",
//   email: "email@mail.com",
//   phone: "555-55-66",
// });

// deleteContact("6zRXyiwh15HG3r0Z9U3y7");
