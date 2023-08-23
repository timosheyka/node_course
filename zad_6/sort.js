function partition(arr, low, high) {
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < arr[high]) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

function QuickSort(arr, low, high) {
    if (low < high) {
        let pivot = partition(arr, low, high);
        QuickSort(arr, low, pivot - 1);
        QuickSort(arr, pivot + 1, high);
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

function merge(arr, l, m, r) {
    const n1 = m - l + 1, n2 = r - m;
    let L = new Array(n1), R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) { arr[k] = L[i]; i++; }
        else { arr[k] = R[j]; j++; }
        k++;
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

function MergeSort(arr, l, r) {
    if (l >= r) return;
    const m = l + parseInt((r - l) / 2);
    MergeSort(arr, l, m);
    MergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

module.exports = { QuickSort, BubbleSort, MergeSort }