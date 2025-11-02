const makeList = (ul, arr) => {
  ul.innerHTML = arr.map(v => `<li>${v}</li>`).join("");
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// --- Sorts ---
const bubbleSort = (a) => {
  const arr = [...a];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
  return arr;
};

const selectionSort = (a) => {
  const arr = [...a];
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) if (arr[j] < arr[min]) min = j;
    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
};

const quickSort = (a) => {
  const arr = [...a];
  const qs = (l, r) => {
    if (l >= r) return;
    const p = arr[Math.floor((l + r) / 2)];
    let i = l, j = r;
    while (i <= j) {
      while (arr[i] < p) i++;
      while (arr[j] > p) j--;
      if (i <= j) { [arr[i], arr[j]] = [arr[j], arr[i]]; i++; j--; }
    }
    if (l < j) qs(l, j);
    if (i < r) qs(i, r);
  };
  qs(0, arr.length - 1);
  return arr;
};

const algos = {
  "Bubble Sort": bubbleSort,
  "Selection Sort": selectionSort,
  "Quick Sort": quickSort
};

// --- UI wiring (duas colunas independentes) ---
const setup = (prefix) => {
  const vals = [];
  const input = document.getElementById(`valor${prefix}`);
  const add = document.getElementById(`add${prefix}`);
  const clear = document.getElementById(`clear${prefix}`);
  const sort = document.getElementById(`sort${prefix}`);
  const shuffleBtn = document.getElementById(`shuffle${prefix}`);
  const select = document.getElementById(`alg${prefix}`);
  const ul = document.getElementById(`lista${prefix}`);

  const refresh = () => makeList(ul, vals);

  add.onclick = () => {
    if (input.value !== "") { vals.push(Number(input.value)); input.value = ""; refresh(); }
  };
  clear.onclick = () => { vals.length = 0; refresh(); };
  sort.onclick = () => { const fn = algos[select.value]; makeList(ul, fn(vals)); };
  shuffleBtn.onclick = () => { shuffle(vals); refresh(); };
};

["A", "B"].forEach(setup);
