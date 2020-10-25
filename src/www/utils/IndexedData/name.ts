export function create(db: IDBDatabase) {
  // Create an objectStore for this database
  const objectStore = db.createObjectStore('name', {
    keyPath: 'myKey',
  });
  console.log('create object store (table) ->', objectStore);
}
