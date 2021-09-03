//import React from "react";
import { useState, useEffect } from "react";
import style from "./component/styles.module.css";
import Form from "./component/Form/Form";
import ContactList from "./component/Contact/Contact";
import Search from "./component/Search/Search";

export default function Mobile() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? [];
  });
  const [filter, setFilter] = useState("");
  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (NewContact) => {
    setContacts([NewContact, ...contacts]);
  };

  const veluesFilter = (e) => {
    const { value } = e.currentTarget;
    setFilter(value);
  };
  const getFilter = (e) => {
    const filterValues = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValues)
    );
  };

  const onCheckName = (newName, numbers) => {
    return contacts.some(
      ({ name }) => name === Object.values(newName).join("")
    );
  };

  const deletedContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  return (
    <div className={style.container}>
      <h1 className={style.headingForm}>Телефонна книга</h1>
      <Form onSubmit={addContact} contactList={onCheckName} />
      <h2 className={style.contactList}>Контакти</h2>
      <Search velue={filter} Search={veluesFilter} />
      <ContactList contactList={getFilter} onDeleted={deletedContact} />
    </div>
  );
}
