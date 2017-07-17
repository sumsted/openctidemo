global class OpenCtiSearchContact {
    webService static String getContacts(String name) {
        List<Contact> contactList = new List<Contact>();
        for (Contact contact: [SELECT Id, Phone, Name, Title, Account.Name FROM Contact WHERE (id = :name OR Name LIKE :('%' + name + '%') OR firstname LIKE :('%' + name + '%') OR lastname LIKE :('%' + name + '%') OR phone LIKE :('%' + name + '%')) LIMIT 10]){
            contactList.add(contact);
        }
        return JSON.serialize(contactList);
    }
}