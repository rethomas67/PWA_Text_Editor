import { openDB } from "idb";
//create the database and the object store if they don't exist
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//create a put method to update the object store with new content
//need permission to write to the store
export const putDb = async (content) => {
  console.log("PUT to the database");
  const editorDb = await openDB("jate", 1);
  const tx = editorDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, content: content });
  const result = await request;
  console.log("Data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
//create a transaction to get all of the records in indexdb
export const getDb = async () => {
  console.log("GET all from the database");
  const editorDb = await openDB("jate", 1);
  const tx = editorDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  console.log("result.length", result.length);
  console.log("result.value", result.length > 0 ? result[0].content : null);
  return result.length > 0 ? result[0].content : "";
};

initdb();
