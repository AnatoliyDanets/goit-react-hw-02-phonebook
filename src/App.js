import React, { Component } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Container from "./components/Container";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    contacts: [
      { id: uuidv4(), name: "Rosie Simpson", number: "459-12-56" },
      { id: uuidv4(), name: "Hermione Kline", number: "443-89-12" },
      { id: uuidv4(), name: "Eden Clements", number: "645-17-79" },
      { id: uuidv4(), name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    const { contacts } = this.state;

    contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
      ? alert(`${contact.name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, contact],
        }));
    console.log(contacts);
  };

  addFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterList = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const { filter } = this.state;

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onFilter={this.addFilter} />
        <ContactList
          contacts={this.filterList()}
          onDelete={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
