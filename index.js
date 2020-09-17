const count = 8;
const lines = [];
let sum = 0;
let i = 1;

while (sum < count) {
    lines.push(i);
    sum = lines.reduce((acc, i) => acc + i, 0);
    i = Math.min(i + 1, count - sum);
}

console.log(lines)