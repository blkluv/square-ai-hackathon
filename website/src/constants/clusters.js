const Clusters = {
    "fruits": [10, 11, 12, 13, 14, 15],
    "diary": [16, 24, 25, 26, 140],
    "egg": [27],
    "chocolate": [28, 29, 30, 45, 75, 76, 77],
    "notebook": [17],
    "stationery": [18, 19, 20, 21, 22, 23, 57, 58, 79, 101, 102, 112, 121],
    "soda": [31, 32, 33, 34],
    "ice cream": [35, 36, 37, 38, 39],
    "utensils": [50, 51, 52, 123],
    "electronics": [53, 54, 141, 142, 143, 144, 145, 146, 147, 148],
    "cutlery": [55, 56],
    "sports": [59, 60, 61],
    "toys": [62, 116, 117],
    "hygiene": [63, 64, 65, 66, 67, 70],
    "toiletries": [68, 69],
    "cleaning": [71, 72],
    "household": [73, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 108, 109, 110, 113, 120, 125, 127, 128],
    "vanity": [74, 122, 129],
    "cookies": [84, 85, 86],
    "bag,wallets and purses": [103, 104, 105],
    "provisions": [47, 114, 115, 118, 119, 124, 130, 131, 132, 150, 151, 152],
    "snacks": [133, 134, 136, 137, 138, 139],
    "clothing": [135],
};
const tagNames = Object.keys(Clusters); // Extract tag names from Clusters

const tags = {};

// Generate 30+ keys with random-sized lists
for (let i = 1; i <= 30; i++) {
    const key = i;
    const list = [];
    const listSize = Math.floor(Math.random() * 10) + 1; // Random list size between 1 and 10

    for (let j = 0; j < listSize; j++) {
        list.push(tagNames[j]);
    }

    tags[key] = list;
}

export { Clusters, tags, tagNames };
