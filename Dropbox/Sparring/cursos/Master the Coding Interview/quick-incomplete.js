$_$wp(1);
const numbers = ($_$w(1, 0), [
    99,
    44,
    6,
    2,
    1,
    5,
    63,
    87,
    283,
    4,
    0
]);
const $_$wvd2 = $_$w(1, 1), quickSort = (array, left = 0, right = array.length) => {
        $_$wf(1);
        if ($_$w(1, 2), left >= right - 1) {
            return $_$w(1, 3);
        }
        $_$w(1, 4), $_$tracer.log('quick', left, right, '', 1, 4);
        let pivotIndex = ($_$w(1, 5), left);
        let storeIndex = ($_$w(1, 6), pivotIndex + 1);
        let pivotValue = ($_$w(1, 7), array[pivotIndex]);
        for (let i = left + 1; $_$w(1, 8), i < right; i++) {
            if ($_$w(1, 9), array[i] < pivotValue) {
                $_$w(1, 10), [array[storeIndex], array[i]] = [
                    array[i],
                    array[storeIndex]
                ];
                $_$w(1, 11), storeIndex++;
            }
        }
        $_$w(1, 12), [array[storeIndex - 1], array[pivotIndex]] = [
            array[pivotIndex],
            array[storeIndex - 1]
        ];
        $_$w(1, 13), quickSort(array, left, storeIndex - 1);
        $_$w(1, 14), quickSort(array, storeIndex, right);
    };
$_$w(1, 15), quickSort(numbers);
$_$w(1, 16), $_$tracer.log(numbers, 'numbers', 1, 16);
$_$wpe(1);