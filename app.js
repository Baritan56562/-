document.getElementById('cosmeticForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const brand = document.getElementById('brand').value;
    const date = document.getElementById('date').value;

    const cosmetic = {
        id: Date.now(),  // 一意のIDを追加
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

    // 削除ボタンを作成
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.addEventListener('click', function() {
        deleteCosmetic(cosmetic.id);
    });

    listItem.appendChild(deleteButton);
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

function deleteCosmetic(id) {
    let cosmetics = JSON.parse(localStorage.getItem('cosmetics')) || [];
    cosmetics = cosmetics.filter(cosmetic => cosmetic.id !== id);
    localStorage.setItem('cosmetics', JSON.stringify(cosmetics));
    refreshCosmeticList();
}

function refreshCosmeticList() {
    const list = document.getElementById('cosmeticList');
    list.innerHTML = '';
    loadCosmetics();
}

// ページ読み込み時にコスメをロードする
document.addEventListener('DOMContentLoaded', loadCosmetics);
