import { customerData } from './customerData';

export function create(db: IDBDatabase) {
  // Create another object store called "names" with the autoIncrement flag set as true.
  const objectStore = db.createObjectStore('names', {
    autoIncrement: true,
  });

  // Because the "names" object store has the key generator, the key for the name value is generated automatically.
  // The added records would be like:
  // key : 1 => value : "Bill"
  // key : 2 => value : "Donna"
  customerData.forEach(function(customer) {
    objectStore.add(customer.name);
  });
}
