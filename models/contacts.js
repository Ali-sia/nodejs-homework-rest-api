// const fs = require('fs/promises')
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// const contactsPath = path.resolve('contacts.json');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(result);

    return contacts;
  } catch (err) {
    console.log('Something went wrong: ', err.message);
  }
};

const addContact = async (body) => {}
const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    const indexContact = contacts.filter((contact) => contact.id === contactId);

    const deletedContact = contacts[indexContact];

    if (indexContact !== -1) {
      contacts.splice(indexContact, 1);

      await fs.writeFile(contactsPath, JSON.stringify(indexContact));

      return deletedContact;
    } else {
      return null;
    }
  } catch (err) {
    console.log('Something went wrong: ', err.message);
  }
};

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const contacts = await listContacts();

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (err) {
    console.log('Something went wrong: ', err.message);
  }
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
