const STATE_JSON = {

    skills: [
        {title: 'Javascript', level: 85},
        {title: 'Java', level: 70},
        {title: 'Python', level: 50},
        {title: 'SQL', level: 70},
        {title: 'HTML', level: 90},
        {title: 'CSS', level: 90},
        {title: 'C++', level: 80},
        {title: 'React', level: 40},
    ],

    projects: [
        {
            "name": "Pixel Art Maker",
            "category": ["HTML", "CSS", "javascript", "jQuery"],
            "description": "It is a single page web application with a customizabe grid which id used to draw  pixel art with your choice of colours",
            "links": {
                "github" : "https://github.com/anukriti9/PixelArtMaker"
            },
            "image": "images/pixelArtMaker.png"
        },

        {  
            "name": "Portfolio",
            "category": ["HTML", "CSS", "Javascript", "jQuery", "FontAwesome"],
            "description": "A website which tells about a person, their specialities in academics and their interests. It also contains the information of work experience and skills a person has and gives details of projects created by them",
            "links": {
                "website" : "https://codesurgeonx.github.io"
            },
            "image": "images/portfolioWebsite.png"
        }
    ]
};


function renderSkill(skill) {
    const rotate = 180 + (18 / 5 * (skill.level - 50));
    return `<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                <div class="skill-wrapper my-3">
                    <span class="label">${skill.level}%<br><small>${skill.title}</small></span>
                    <div class="skill-circle">
                        <div class="left-side half-circle"></div>
                        <div class="right-side half-circle" style="transform: rotate(${rotate}deg);-webkit-transform: rotate(${rotate});"></div>
                    </div>
                    <div class="shadow"></div>
                </div>
            </div>`;
}

function renderProjects(item, i){

    return `<div class="project container my-3 p-3 d-flex flex-column flex-lg-row justify-content-around align-items-center">
                <div class="project-title mt-5 mt-lg-1">${item.name}</div>
                <button class="btn btn-secondary btn-lg my-5 font-weight-bold" onclick="renderModal(${i})">Details</button>
            </div>`;
}

function renderModal(index){
    const item = STATE_JSON.projects[index];
    const modal =
        `<div id="projectModal" class="modal fade" tabindex="-1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                
                    <div class="modal-header">
                        <h5 class="modal-title">${item.name}</h5>
                        ${renderProjectLinks(item)}
                    </div>
                
                    <div class="d-flex flex-row mt-3 mx-3">
                        ${renderBadges(item)}
                    </div>
                    
                    <div class="modal-body d-flex flex-column-reverse flex-lg-row justify-content-between mb-3 align-items-lg-start align-items-center">
                        <p class="mr-lg-4">${item.description}</p>
                        <img class="project-image mr-lg-5 my-4 my-lg-1" src="${item.image}">
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`;
    $('#modal-root').html(modal);
    $('#projectModal').modal().show();
}

function renderProjectLinks(item) {
    let links = '';
    if (item.links.hasOwnProperty('website')) {
        links += `<a class="text-black-50 mx-3" href="${item.links.website}" target="_blank">
                    <i class="fab fa-2x fa-github move"></i>
                  </a>`;
    }
    if (item.links.hasOwnProperty('github')) {
        links += `<a class="text-black-50 mx-3" href="${item.links.github}" target="_blank">
                    <i class="fab fa-2x fa-github move"></i>
                  </a>`;
    }
    return links;
}

function renderBadges(item) {
    return item.category.map(value => {
        return `<span class="badge badge-info p-2 mr-2 mr-lg-3">${value}</span>`;
    }).join('');
}


$(() => {
    const sorted_skills = STATE_JSON.skills.sort((a, b) => b.level - a.level);
    $('.charts-container').html(sorted_skills.map((value, i) => {
        return renderSkill(value, i);
    }).join(''));

    $("#project-root").html(STATE_JSON.projects.map((value, i) => {
        return renderProjects(value, i);
    }).join(''));
});

