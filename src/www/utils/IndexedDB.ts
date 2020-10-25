// // In the following line, you should include the prefixes of implementations you want to test.
// window.indexedDB =
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB
// // DON'T use "var indexedDB = ..." if you're not in a function.
// // Moreover, you may need references to some window.IDB* objects:
// window.IDBTransaction = window.IDBTransaction ||
//   window.webkitIDBTransaction ||
//   window.msIDBTransaction || { READ_WRITE: 'readwrite' } // This line should only be needed if it is needed to support the object's constants for older browsers
// window.IDBKeyRange =
//   window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
// // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
import { createJobs } from './IndexedData';
import {
  add as addCustomers,
  remove as removeCustomers,
  retrieve as retrieveCustomers,
  update as updateCustomers,
} from './IndexedData/customers';

if (!window.indexedDB) {
  console.log(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  );
} else {
  console.log(indexedDB);

  // Let us open our database
  const request: IDBOpenDBRequest = window.indexedDB.open(
    'MyTestDatabase',
    parseInt(location.hash.substring(1))
  );
  request.onblocked = function(event: Event) {
    // If some other tab is loaded with the database, then it needs to be closed
    // before we can proceed.
    console.log('Please close all other tabs with this site open! ->', event);
  };
  request.onerror = function(event: Event) {
    // Do something with request.errorCode!
    console.error(
      "Why didn't you allow my web app to use IndexedDB?! <-",
      event.target?.['error']
    );
  };
  request.onsuccess = function(event: Event) {
    // Do something with request.result!
    const db: IDBDatabase = event.target?.['result'];
    console.log('onsuccess ->', initDB(db));
    useDB(db);
  };
  // This event is only implemented in recent browsers
  request.onupgradeneeded = function(event: IDBVersionChangeEvent) {
    // Save the IDBDatabase interface
    const db: IDBDatabase = event.target?.['result'];
    console.log('onupgradeneeded ->', initDB(db));
    upgradeDB(db, event.oldVersion, event.newVersion);
  };
}

function initDB(db: IDBDatabase): IDBDatabase {
  db.onerror = function(event: Event) {
    // Generic error handler for all errors targeted at this database's requests!
    console.error('Database error: ' + event.target?.['error']);
  };
  db.onversionchange = function(event: Event) {
    db.close();
    console.log(
      'A new version of this page is ready. Please reload or close this tab! ->',
      event
    );
    while (true) {
      alert('请关闭当前标签页！');
    }
  };
  return db;
}

function upgradeDB(
  db: IDBDatabase,
  oldVersion: number,
  newVersion: number | null
) {
  if (null == newVersion) return;

  function jobber(targetVersion: number, jobs: ((db: IDBDatabase) => void)[]) {
    if (targetVersion > (newVersion as number)) return;
    if (targetVersion <= oldVersion) return;

    jobs.forEach((job) => job(db));
  }

  createJobs.forEach((jobs, idx) => jobber(idx + 1, jobs));
}

function useDB(db: IDBDatabase) {
  removeCustomers(db);
  addCustomers(db);
  retrieveCustomers(db);
  updateCustomers(db);
}
