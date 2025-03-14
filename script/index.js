function showLoader() {
    document.getElementById('loader').classList.remove('hidden')
    document.getElementById('video-container').classList.add('hidden')
}
function hideLoader() {
    document.getElementById('loader').classList.add('hidden')
    document.getElementById('video-container').classList.remove('hidden')
}

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName('active');
    for (let btn of activeButtons) {
        btn.classList.remove('active')
    }
}

function loadCategories() {
    // Fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

function loadVideos(searchText = '') {
    showLoader()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            document.getElementById('allButton').classList.add('active');
            displayVideos(data.videos)
        })
}

const loadCategoryVideos = (id) => {
    showLoader()
    const urls = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    console.log(urls);
    fetch(urls).then(res => res.json())
        .then(data => {
            removeActiveClass()

            const clickButton = document.getElementById(`btn-${id}`);
            clickButton.classList.add('active')
            // console.log(clickButton)
            displayVideos(data.category)
        })
}

function loadVideoDetails(videoId) {
    console.log(videoId);
    const urls = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(urls).then(res => res.json())
        .then(data => videoDetails(data.video))
}
const videoDetails = (video) => {
    console.log(video);
    document.getElementById('videoDetails').showModal();
    const detailsContainer = document.getElementById('detailsContainer')
    detailsContainer.innerHTML = `
    <h2 class='text-xl font-bold text-center'>${video.title}</h2>
    <p class='text-sm mt-2 text-gray-500'>${video.description}</p>
    `
}
function displayCategories(categories) {
    // get the container
    const categorieContainer = document.getElementById('category-container');
    // loop of array 
    for (let cat of categories) {
        // Crate element
        // console.log(cat)
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <button id='btn-${cat.category_id}' onclick='loadCategoryVideos(${cat.category_id})' class="btn hover:bg-red-500 hover:text-white px-5 py-2">${cat.category}</button>
        `
        categorieContainer.append(createDiv)
    }
}
loadCategories()

function displayVideos(videos) {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''

    if (videos.length === 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full flex justify-center items-center h-full">
                <div class="py-20 px-10 text-center">
                    <img class="mx-auto" src="./assets/Icon.png" alt="">
                    <h2 class="text-2xl font-bold text-gray-600">Oops!! Sorry, There is no <br>content here</h2>
                </div>
            </div>
        `
        hideLoader()
        return;
    }
    videos.forEach(video => {
        // Create Element 
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card bg-base-100  shadow-sm">
                <figure class="relative ">
                    <img class="object-cover h-[150px] w-full" src="${video.thumbnail}" alt="Shoes" />
                    <span class="absolute bottom-2 right-2 text-white bg-black px-3 py-1 rounded-sm">3hrs 56 min
                        ago</span>
                </figure>
                <div class="card-body px-1">
                    <div class="flex gap-2">
                        <div class="avatar">
                            <div class="w-10 h-10 rounded-full">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                        <div>
                            <h2 class="text-sm font-semibold">${video.title}</h2>
                            <p class="text-gray-600 flex gap-1">${video.authors[0].profile_name} 
                             ${video.authors[0].verified === true ? `
                                <img class='w-5 h-5' title='varified' src='https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png'>
                                ` : ``}
                            </p>
                            <p class="text-gray-500">${video.others.views} views</p>
                        </div>
                    </div>
                </div>
                <button onclick='loadVideoDetails("${video.video_id}")' class="btn btn-block">Show Details</button>
            </div>
        `
        // console.log(element)
        videoContainer.append(videoCard)
    });
    hideLoader()
}

document.getElementById('allButton').addEventListener('click', () => loadVideos())

document.getElementById('searchInput').addEventListener('keyup', (e) => {
    const input = e.target.value;
    loadVideos(input)
})


// category
// :
// "Music"
// category_id
// :
// "1001"

// {
//     "category_id": "1001",
//         "video_id": "aaab",
//             "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//                 "title": "Midnight Serenade",
//                     "authors": [
//                         {
//                             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//                             "profile_name": "Noah Walker",
//                             "verified": false
//                         }
//                     ],
//                         "others": {
//         "views": "543K",
//             "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }