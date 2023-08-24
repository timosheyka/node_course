function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

function QuickSort(arr, low, high) {
    let stack = [];
    stack.push(low);
    stack.push(high);

    while (stack.length > 0) {
        high = stack.pop();
        low = stack.pop();
        let p = partition(arr, low, high);

        if (p - 1 > low) {
            stack.push(low);
            stack.push(p - 1);
        }
        if (p + 1 < high) {
            stack.push(p + 1);
            stack.push(high);
        }
    }
    return arr;
}

function BubbleSort(arr) {
    let swapped, tmp, n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (swapped == false) break;
    }
    return arr;
}

function MergeSort(arr) { 
    const n = arr.length;
    for (let size = 1; size <= n - 1; size = 2 * size) {
        for (let left = 0; left < n - 1; left += 2 * size) {
            merge(arr, left,
                        Math.min(left + size - 1, n - 1),
                        Math.min(left + 2 * size - 1, n - 1)
            );
        }
    }
    return arr;
}

function merge(arr, l, m, r) {
    let i, j, k, n1 = m - l + 1, n2 = r - m;
    let leftStack = [], rightStack = [];

    for (i = 0; i < n1; i++) leftStack.push(arr[l + i]);
    for (j = 0; j < n2; j++) rightStack.push(arr[m + 1 + j]);

    i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (leftStack[i] <= rightStack[j]) arr[k++] = leftStack[i++];
        else arr[k++] = rightStack[j++];
    }

    while (i < n1) arr[k++] = leftStack[i++];
    while (j < n2) arr[k++] = rightStack[j++];
}


/* 
    QuickSort and MergeSort were implemented without recursion
    to allow them work properly on large numbers
*/
module.exports = { QuickSort, BubbleSort, MergeSort }