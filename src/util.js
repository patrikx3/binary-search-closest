
const binarySearchByProperty = (obj, target, property) => {
    const n = obj.length
    // Corner cases
    if (target <= obj[0][property]) {
        return obj[0];
    }
    if (target >= obj[n - 1][property]) {
        return obj[n - 1];
    }

    // Doing binary search
    let i = 0, j = n, mid = 0;
    while (i < j) {
        mid = Math.floor((i + j) / 2)

        if (obj[mid][property] == target) {
            return obj[mid];
        }

        /* If target is less than array element,
            then search in left */
        if (target < obj[mid][property]) {
            // If target is greater than previous
            // to mid, return closest of two
            if (mid > 0 && target > obj[mid - 1][property]) {
                return binarySearchByPropertyGetClosest(obj[mid - 1], obj[mid], target, property);
            }
            /* Repeat for left half */
            j = mid;
        } else {
            // If target is greater than mid
            if (mid < n - 1 && target < obj[mid + 1][property]) {
                return binarySearchByPropertyGetClosest(obj[mid], obj[mid + 1], target, property);
            }
            // update i
            i = mid + 1;
        }
    }

// Only single element left after search
    return obj[mid];
}

const binarySearchByPropertyGetClosest = (val1, val2, target, property) => {
    if (target - val1[property] >= val2[property] - target) {
        return val2;
    } else {
        return val1;
    }
}

const binarySearchByValue = (obj, target) => {
    const n = obj.length
    // Corner cases
    if (target <= obj[0]) {
        return obj[0];
    }
    if (target >= obj[n - 1]) {
        return obj[n - 1];
    }

    // Doing binary search
    let i = 0, j = n, mid = 0;
    while (i < j) {
        mid = Math.floor((i + j) / 2)

        if (obj[mid] == target) {
            return obj[mid];
        }

        /* If target is less than array element,
            then search in left */
        if (target < obj[mid]) {
            // If target is greater than previous
            // to mid, return closest of two
            if (mid > 0 && target > obj[mid - 1]) {
                return binarySearchByValueGetClosest(obj[mid - 1], obj[mid], target);
            }
            /* Repeat for left half */
            j = mid;
        } else {
            // If target is greater than mid
            if (mid < n - 1 && target < obj[mid + 1]) {
                return binarySearchByValueGetClosest(obj[mid], obj[mid + 1], target);
            }
            // update i
            i = mid + 1;
        }
    }

// Only single element left after search
    return obj[mid];
}

const binarySearchByValueGetClosest = (val1, val2, target) => {
    if (target - val1 >= val2 - target) {
        return val2;
    } else {
        return val1;
    }
}



module.exports.binarySearchByProperty = binarySearchByProperty
module.exports.binarySearchByValue = binarySearchByValue

