const handleCategory = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();

    const tabContainer = document.getElementById('tab-container');

    data.data.forEach(category => {
        const div = document.createElement('div');
        div.classList = `btn`;
        div.innerHTML = `
        <a onClick = "handleLoadCategory('${category.category_id}')" class="tab text-base font-medium">${category.category}</a> 
        `;
        tabContainer.appendChild(div);
    });
};

const handleLoadCategory = async (categoryId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();

    const noContentContainer = document.getElementById('no-content-container');

    if (data.data.length === 0){
        noContentContainer.classList.remove('hidden');
    }
    else{
        noContentContainer.classList.add('hidden');
    }

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    data.data.forEach(videos => {    

    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card">
        <div class="relative">
            <figure><img class="rounded-lg w-full h-52 mb-5 " src="${videos.thumbnail}" alt="" /></figure>
        </div>

        <div id="time-overlay" class="absolute bg-black bottom-1/3 right-3 rounded text-white p-2">
            <p>${ videos.others.posted_date !== '' ? `${secondsToHoursMin(videos.others.posted_date)}` : '' }</p>
        </div>
  
        <div class="flex items-start gap-3">
            <div class="avatar">
                <div class="w-10 rounded-full">
                    <img src="${videos.authors[0].profile_picture}" />
                </div>
            </div>
            
            <div>
                <h2 class="card-title text-base font-bold">${videos.title}</h2>
                <div class="text-sm font-normal flex items-center gap-2">
                    <p>${videos.authors[0].profile_name}</p>
                    <span>${videos.authors[0].verified ? `<img src='./images/badge.png' />` : "" }</span> 
                </div>
                <p>${videos.others.views}</p>
                
            </div>
        </div>
    </div>
    
    `;
    cardContainer.appendChild(div);

    });
 
};

const secondsToHoursMin = (seconds) =>{
    let second = parseInt(seconds); 
    let hours = Math.floor(second / 3600);
    let minutes = Math.floor(second / 60) - hours * 60 ;
    return (hours+'hrs'+' '+minutes+'min ago');
};

handleCategory();
handleLoadCategory('1000');
