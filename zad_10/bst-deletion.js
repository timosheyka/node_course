// Javascript program to implement optimized delete in BST.
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
    
/* A utility function to insert a new node with given key in
* BST */
function insert(node, key) {
/* If the tree is empty, return a new node */
if (node === null) {
    return new Node(key);
}

/* Otherwise, recur down the tree */
if (key < node.key) {
    node.left = insert(node.left, key);
} else {
    node.right = insert(node.right, key);
}

/* return the (unchanged) node pointer */
return node;
}

/* Given a binary search tree and a key, this function
deletes the key and returns the new root */
function deleteNode(root, k) {
    // Base case
    if (root === null) {
        return root;
    }

    // Recursive calls for ancestors of
    // node to be deleted
    if (root.key > k) {
        root.left = deleteNode(root.left, k);
        return root;
    } else if (root.key < k) {
        root.right = deleteNode(root.right, k);
        return root;
    }

    // We reach here when root is the node
    // to be deleted.

    // If one of the children is empty
    if (root.left === null) {
        let temp = root.right;
        delete root;
        return temp;
    } else if (root.right === null) {
        let temp = root.left;
        delete root;
        return temp;
    }

    // If both children exist
    else {
        let succParent = root;

        // Find successor
        let succ = root.right;
        while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
        }

        // Delete successor. Since successor
        // is always left child of its parent
        // we can safely make successor's right
        // right child as left of its parent.
        // If there is no succ, then assign
        // succ.right to succParent.right
        if (succParent !== root) {
        succParent.left = succ.right;
        } else {
        succParent.right = succ.right;
        }

        // Copy Successor Data to root
        root.key = succ.key;

        // Delete Successor and return root
        delete succ;
        return root;
    }
}

function displayBST(root) {
    if (!root) return;
    
    const result = [];
    const queue = [root];
  
    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevel = [];
  
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        if (node) {
          currentLevel.push(node.key);
          queue.push(node.left, node.right);
        } else {
          currentLevel.push(' ');
          queue.push(null, null);
        }
      }
  
      if (currentLevel.every(val => val === ' ')) break;
      result.push(currentLevel.join(' '));
    }
  
    console.log(result.join('\n'));
} 

/* Let us create following BST
          50
        /	 \
        30	 70
       / \    / \
      20 40  60 80 
*/
let root = null;
root = insert(root, 50);
root = insert(root, 30);
root = insert(root, 20);
root = insert(root, 40);
root = insert(root, 70);
root = insert(root, 60);
root = insert(root, 80);


console.log("Original BST: ");
displayBST(root);

console.log("\n\nDelete Node with single child: 70");
root = deleteNode(root, 70);
console.log("Modified BST tree after deleting single child Node:");
displayBST(root);

console.log("\n\nDelete Node with both child: 50");
root = deleteNode(root, 50);
console.log("Modified BST tree after deleting both child Node:");
displayBST(root);