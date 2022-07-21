const contacts = require("./contacts");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const arr = hideBin(process.argv);
const { argv } = yargs(arr);

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      contacts.getContactById(id);
      break;

    case "add":
      contacts.addContact({ name, email, phone });
      break;

    case "remove":
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
// contacts.addContact({
//   name: "Bohdan",
//   email: "radchuk_you@ukr.net",
//   phone: 4234234234,
// });
