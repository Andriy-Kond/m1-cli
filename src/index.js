import { program } from "commander";
import * as dbProcessing from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("readAllContacts()", await dbProcessing.readAllContacts());
      break;

    case "get":
      console.log("getContactById(id)", await dbProcessing.getContactById(id));
      break;

    case "add":
      console.log(
        "addNewContact(name, email, phone)",
        await dbProcessing.addNewContact(name, email, phone),
      );
      break;

    case "remove":
      console.log("deleteContact(id)", await dbProcessing.deleteContact(id));
      break;

    case "edit":
      console.log(
        "editContact(action, id, name, email, phone)",
        await dbProcessing.editContact(action, id, name, email, phone),
      );
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
