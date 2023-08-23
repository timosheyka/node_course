const sort = require('./sort');

function test(n) {
    this.sortedArray = Array.from({ length: n }, (_, i) => i + 1),
    this.sortedBackwardArray = Array.from({ length: n }, (_, i) => n - i),
    this.randomArray = Array.from({ length: n }, (_, i) => i + 1)
        .slice().sort(() => Math.random() - 0.5)
}

function measure(func, array) {
    const start = performance.now();
    func(array, 0, array.length - 1);
    const end = performance.now();
    return (end - start).toFixed(3);
}

function test_case(testArr, length, arrType) {
    const bubbleSortTime = measure(sort.BubbleSort, testArr[arrType]);
    const quickSortTime = measure(sort.QuickSort, testArr[arrType]);
    const mergeSortTime = measure(sort.MergeSort, testArr[arrType]);

    console.log(
        `${length}\t\t| ${bubbleSortTime} ms\t| ${quickSortTime} ms\t| ${mergeSortTime} ms`
    );
}

function generateAndLogPerformanceTable(arrayLengths) {
    
    console.log("Array Length | BubbleSort Time | QuickSort Time | Merge Sort Time");

    const arrType = [
        'sortedArray',
        'sortedBackwardArray',
        'randomArray'    
    ];

    for (const type of arrType) {
        console.log(`--------------------------${type}---------------------------`);
        
        for (const length of arrayLengths) {
            const testArr = new test(length);    
            test_case(testArr, length, type);
        }
    }
}
  
const arrayLengths = [
    2, 5, 10,
    20, 50, 100,
    200, 500, 1000,
    2000, 5000
];

generateAndLogPerformanceTable(arrayLengths);