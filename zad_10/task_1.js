class Stack { // uses LIFO principle
    constructor() {
        this.items = [];
    }
    push(value) {
        this.items.push(value);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        const value = this.items.pop();
        this.items.push(value);
        return value;

        // another version
        // return this.items[this.items.length - 1];
    }
}

class StackHelper {
    constructor() {
        this.items = new Stack();
        this.min = new Stack();
        this.max = new Stack;
    }
    push(value) {
        this.items.push(value);
        
        if (this.min.items.length && this.max.items.length) {
            const maxTop = this.max.peek();
            this.max.push(value > maxTop ? value : maxTop);

            const minTop = this.min.peek();
            this.min.push(value < minTop ? value : minTop);
        } else {
            this.min.push(value);
            this.max.push(value);
        }
    }
    pop() {
        return this.items.pop();
    }
    getOrigin() {
        return this.items.peek();
    }
    getMin() {
        return this.min.peek();
    }
    getMax() {
        return this.max.peek();
    }
}

class Queue { // uses FIFO principle
    constructor() {
        this.items = [];
    }
    enqueue(value) {
        // pushes element on top
        this.items.push(value);
    }
    dequeue() {
        // returns first inserted element
        return this.items.shift();
    }
    peek() {
        // returns first inserted element
        return this.items[0];
    }
}

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
        this.traverseArray = [];
    }
    insert(value) {
        const node = new TreeNode(value);
        if (this.root) { this.insertNode(this.root, node); }
        else { this.root = node; }
    }
    insertNode(root, node) {
        if (root.value < node.value) {
            if (root.right) { this.insertNode(root.right, node); }
            else { root.right = node; }
        } else {
            if (root.value > node.value) {
                if (root.left) { this.insertNode(root.left, node); } 
                else { root.left = node; }
            } else {
                console.log(`value ${node.value} is already in a tree`);
            }
        }
    }
    search(value) {
        return this.searchNode(this.root, value);
    }
    searchNode(root, value) {
        if (root) {
            if (root.value > value) {
                return this.searchNode(root.left, value);
            } else {
                if (root.value < value) { return this.searchNode(root.right, value); } 
                else { return `found ${root.value}`; }
            }
        } else {
            return 'No such value in a tree';
        }
    }
    in_traverse(root) {
        if (root === null) return null;
        this.in_traverse(root.left);
        this.traverseArray.push(root.value);
        this.in_traverse(root.right);
    }
    pre_traverse(root) {
        if (root === null) return null;
        this.traverseArray.push(root.value);
        this.in_traverse(root.left);
        this.in_traverse(root.right);        
    }
    post_traverse(root) {
        if (root === null) return null;
        this.post_traverse(root.left);
        this.post_traverse(root.right);        
        this.traverseArray.push(root.value);
    }
}

function isBST(tree, min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
    if (tree === null) return true;
    if (tree.value < min || tree.value > max) return false;
    return (
        isBST(tree.left, min, tree.value - 1) &&
        isBST(tree.right, tree.value + 1, max)
    );
}

class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
    insert(value) {
        const newNode = new ListNode(value);
        if (this.head === null) this.head = newNode;
        else {
            let tmp = this.head;
            while(tmp.next) tmp = tmp.next;
            tmp.next = newNode; 
        }
    }
    delete(value) {
        let current = this.head;
        let prev = null;
        while(current) {
            if (current.value == value) {
                if (!prev) this.head = current.next;
                else prev.next = current.next;
                return current.value;
            }
            prev = current;
            current = current.next;
        }
        return 'Not Found';        
    }
    search(value) {
        let tmp = this.head;
        while(tmp) {
            if (tmp.value == value) return `Found ${value}`;
            tmp = tmp.next;
        }
        return 'Not Found or has Cycle';
    }
}

function hasCycle(list) {
    let set = new Set();
    while(list) {
        if (set.has(list.value)) return true;
        set.add(list.value);
        list = list.next;
    }
    return false;
}

class Graph {
    constructor() {
        this.adjList = new Map();
        
        this.dfsArr = [];
        this.bfsArr = [];
        this.DijkstraArr = [];
    }
    addVertex(vertex) {
        if (!this.adjList.has(vertex)) {
            this.adjList.set(vertex, []);
        }
    }
    addEdge(vertex1, vertex2) {
        if (this.adjList.has(vertex1) && this.adjList.has(vertex2)) {
            this.adjList.get(vertex1).push(vertex2);
            this.adjList.get(vertex2).push(vertex1);
        }
    }    
    dfs(root, visited = {}) {
        this.dfsArr.push(root);
        visited[root] = true;
        let get_neighbours = this.adjList.get(root);
        for (let i in get_neighbours) {
            let get_elem = get_neighbours[i];
            if (!visited[get_elem]) this.dfs(get_elem, visited);
        }
    }
    bfs(root) {
        const visited = new Set();
        const queue = [];
        visited.add(root);
        queue.push(root);

        while (queue.length > 0) {
            const currVer = queue.shift();
            this.bfsArr.push(currVer);
            const neighbors = this.adjList.get(currVer);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }
    Dijkstra(start, end) {

    }
}


function StackScenario() {
    const minMaxStack = new StackHelper();
    
    minMaxStack.push(3);
    minMaxStack.push(5);
    minMaxStack.push(2);
    minMaxStack.push(4);
    
    console.log('Min', minMaxStack.getMin());
    console.log('Top', minMaxStack.getOrigin());
    console.log('Max', minMaxStack.getMax());
}
StackScenario();
console.log('');

function QueueScenario() {
    const queue = new Queue();

    queue.enqueue(2);
    queue.enqueue(4);
    queue.enqueue(3);

    console.log('peek', queue.peek());
    console.log('dequeued', queue.dequeue());
    console.log('peek', queue.peek());
}
QueueScenario();
console.log('');

function BinaryTreeScenario() {
    const tree = new BinaryTree();
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    
    console.log(tree.root);
    console.log(tree.search(7)); 
    console.log(tree.search(20));

    tree.in_traverse(tree.root);
    console.log(tree.traverseArray);

    tree.traverseArray = [];
    tree.pre_traverse(tree.root);
    console.log(tree.traverseArray);
    
    tree.traverseArray = [];
    tree.post_traverse(tree.root);
    console.log(tree.traverseArray);

    let bstTree = '';
    if (!isBST(tree.root)) bstTree = 'n\'t';
    console.log(`current Tree is${bstTree} BST`);
}
BinaryTreeScenario();
console.log('');

function LinkedListScenario() {
    let list = new LinkedList();
    list.insert(1);
    list.insert(2);
    list.insert(3);
    console.log(list);

    console.log(list.search(3));
    console.log(list.delete(2));

    console.log(list);
    console.log(`List has${hasCycle(list) ? '' : 'n\'t'} cycle`);
}
LinkedListScenario();
console.log('');

function GraphScenario() {
    const graph = new Graph();
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');

    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'D');
    graph.addEdge('D', 'E');
    graph.addEdge('E', 'A');

    graph.dfs('A');
    console.log(graph.dfsArr);
    graph.bfs('A');
    console.log(graph.bfsArr);
    graph.Dijkstra('A', 'E');
    console.log(graph.DijkstraArr);
}
GraphScenario();