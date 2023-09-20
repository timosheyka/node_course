class CustomHashTable {
  constructor(size = 100) {
      this.size = size;
      this.table = new Array(size);
  }

  // using djb2 hash algorithm
  hash(key) {
    let hash = 5381; // Initial hash value
    for (let i = 0; i < key.length; i++) {
        hash = (hash * 33) ^ key.charCodeAt(i); 
        // Bitwise left shift and XOR operation
    }
    return hash >>> 0; // Ensure the hash is a positive integer
  }

  // using separate chaining as the collision resolution strategy
  insert(key, value) {
      const index = this.hash(key);
      if (!this.table[index]) this.table[index] = [];
      this.table[index].push({ key, value });
  }

  get(key) {
      const index = this.hash(key);
      if (!this.table[index]) return 'Not Found';
      for (const entry of this.table[index]) {
        if (entry.key === key) return entry.value;
      }
      return 'Not Found';
  }

  delete(key) {
      const index = this.hash(key);
      if (!this.table[index]) return;
      this.table[index] = this.table[index]
        .filter(entry => entry.key !== key);
      // Filter out the key-value pair with the specified key from the bucket.
  }
}

const hash = new CustomHashTable();

hash.insert("name", "John");
hash.insert("age", 30);
hash.insert("city", "New York");

console.log(hash.get("name")); // Output: "John"
console.log(hash.get("age"));  // Output: 30
console.log(hash.get("city")); // Output: "New York"

hash.delete("age");
console.log(hash.get("age"));  // Output: 'Not Found'

hash.insert("country", "USA");
console.log(hash.get("country")); // Output: "USA"

hash.delete("country");
console.log(hash.get("country")); // Output: 'Not Found'

hash.insert("language", "English");
console.log(hash.get("language")); // Output: "English"

hash.delete("language");
console.log(hash.get("language")); // Output: 'Not Found'