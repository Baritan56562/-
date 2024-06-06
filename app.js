// app.js
document.getElementById('cosmeticForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const brand = document.getElementById('brand').value;
    const date = document.getElementById('date').value;

    const cosmetic = {
        name: name,
        brand: brand,
        date: date
    };

    addCosmeticToList(cosmetic);
    saveCosmetic(cosmetic);
    clearForm();
});

function addCosmeticToList(cosmetic) {
    const listItem = document.createElement('li');
    listItem.textContent = `名前: ${cosmetic.name}, ブランド: ${cosmetic.brand}, 購入日: ${cosmetic.date}`;
    document.getElementById('cosmeticList').appendChild(listItem);
}

function saveCosmetic(cosmetic) {
    let cosmetics = localStorage.getItem('cosmetics');
    if (cosmetics === null) {
        cosmetics = [];
    } else {
        cosmetics = JSON.parse(cosmetics);
    }
    cosmetics.push(cosmetic);
    localStorage.setItem('cosmetics', JSON.stringify(cosmetics));
}

function loadCosmetics() {
    const cosmetics = JSON.parse(localStorage.getItem('cosmetics')) || [];
    cosmetics.forEach(addCosmeticToList);
}

function clearForm() {
    document.getElementById('cosmeticForm').reset();
}

// ページ読み込み時にコスメをロードする
document.addEventListener('DOMContentLoaded', loadCosmetics);
// app.js
if (typeof(Storage) !== "undefined") {
    // ローカルストレージを使用するコード
} else {
    alert("ローカルストレージがサポートされていません。");
}