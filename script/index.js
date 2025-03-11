function loadCategories() {
    // Fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}
function displayCategories(categories) {
    // get the container
    const categorieContainer = document.getElementById('category-container');
    // loop of array 
    for (let cat of categories) {
        // Crate element
        console.log(cat)
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <button class="btn hover:bg-red-500 hover:text-white px-5 py-2">${cat.category}</button>
        `
        categorieContainer.append(createDiv)
    }
}
loadCategories()

// category
// :
// "Music"
// category_id
// :
// "1001"