import fs from "fs/promises";
import path from "path";

const __dirname = import.meta.dirname;
const contactsPath = path.join(__dirname, "db", "contacts.json"); // path to file contacts.js

export const readAllContacts = async () => {
  const contactsBuffer = await fs.readFile(contactsPath);
  console.log("readAllContacts >> contacts:::", JSON.parse(contactsBuffer));

  // return contacts;
};

export const getAllContacts = async () => {
  JSON.parse(contactsBookBuffer); // make obj from json
};

readAllContacts();

// export const readContactById = async id => {};
// export const addNewContact = async (id, name, email, phone) => {};
// export const editContact = async (id, name, email, phone) => {};
// export const deleteContact = async id => {};
