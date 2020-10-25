import localforage from 'localforage';

const dbName = 'databaseName';

// Create table 1 in databaseName
var tableOne = localforage.createInstance({
  driver: localforage.WEBSQL,
  name: dbName,
  storeName: 'tableOne',
  description: '',
});

// Create table 2 in databaseName
var tableTwo = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
  name: dbName,
  storeName: 'tableTwo',
  description: '',
});

// set some data
tableOne.setItem(
  'tk1',
  { v0: 0, v1: 1 },
  (err: any, value: { v0: number; v1: number }) => {
    console.log(err, value);
  }
);

tableTwo.setItem(
  'tk2',
  { v0: 1, v1: 0 },
  (err: any, value: { v0: number; v1: number }) => {
    console.log(err, value);
  }
);

export function test() {
  // tableTwo.dropInstance();
  localforage.setDriver(localforage.LOCALSTORAGE);
  localforage
    .dropInstance({
      name: dbName,
      storeName: 'tableTwo',
    })
    .then(function() {
      console.log('Dropped otherStore');
    });
}
