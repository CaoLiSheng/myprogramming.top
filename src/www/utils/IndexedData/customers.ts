import { customerData } from './customerData';

export function create(db: IDBDatabase) {
  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  const objectStore = db.createObjectStore('customers', {
    keyPath: 'ssn',
  });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex('name', 'name', {
    unique: false,
  });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex('email', 'email', {
    unique: true,
  });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  // objectStore.transaction.oncomplete = function(event) {
  //   // Store values in the newly created objectStore.
  //   const customerObjectStore = db
  //     .transaction('customers', 'readwrite')
  //     .objectStore('customers');
  //   customerData.forEach(function(customer) {
  //     customerObjectStore.add(customer);
  //   });
  // };
}

export function add(db: IDBDatabase) {
  const transaction = db.transaction(['customers'], 'readwrite');
  // Note: Older experimental implementations use the deprecated constant IDBTransaction.READ_WRITE instead of "readwrite".
  // In case you want to support such an implementation, you can write:
  // var transaction = db.transaction(["customers"], IDBTransaction.READ_WRITE);

  // Do something when all the data is added to the database.
  transaction.oncomplete = function(event: Event) {
    console.log('All done!', event);
  };

  const objectStore = transaction.objectStore('customers');
  customerData.forEach((customer) => {
    const request = objectStore.add(customer);
    request.onsuccess = function(event) {
      // event.target.result === customer.ssn;
      console.log(`${JSON.stringify(customer)} done!`, event);
    };
  });
}

export function remove(db: IDBDatabase) {
  const primaryKeys: IDBArrayKey = ['444-44-4444', '555-55-5555'];
  const objStore: IDBObjectStore = db
    .transaction(['customers'], 'readwrite')
    .objectStore('customers');

  primaryKeys.forEach(
    (primaryKey) =>
      (objStore.delete(primaryKey).onsuccess = function(event: Event) {
        console.log(`It's gone! Bye ${primaryKey}`);
      })
  );
}

export function retrieve(db: IDBDatabase) {
  db
    .transaction('customers')
    .objectStore('customers')
    .get('555-55-5555').onsuccess = function(event: Event) {
    console.log(
      'Name for SSN 555-55-5555 is ' + event.target?.['result']?.name
    );
  };
}

export function update(db: IDBDatabase) {
  const objStore = db
    .transaction(['customers'], 'readwrite')
    .objectStore('customers');

  objStore.get('444-44-4444').onsuccess = function(event) {
    // Get the old value that we want to update
    const data = event.target?.['result'];

    // update the value(s) in the object that you want to change
    data.age = 42;

    // Put this updated object back into the database.
    objStore.put(data).onsuccess = function(event: Event) {
      console.log('the data is updated!', event);
    };
  };
}
