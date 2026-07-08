const apiUrl = "https://mocki.io/v1/d60c3726-2880-4804-9783-205008d50189";
console.log("listblog.js loaded");
function callApi() {
    fetch(apiUrl)
        .then(rs => rs.json())
        .then(data => {



            data.map(e => {
                var title = e.title;
                var category = e.category;
                var summary = e.summary;
                var image = e.image;
                var id = e.id;


                var item = `
                <div class ="col-4 mt-4">
                <div class="card">
                    <div class="card_box">
                        <img src="${image}" class="card_img" alt="${title}"/>
                    </div>
                    <div class="card_body">
                        <span class="card_category">${category}</span>
                        <h5 class="card_title">${title}</h5>
                        <p class="card_summary">${summary}</p>
                        <a href="BlogDeital.html?id=${id}" class="card_btn">Xem chi tiết</a>
                    </div>
                </div>
                </div>`;

                document.getElementById("list_blog").innerHTML += item;
            });
        })
        .catch(error => console.error("Lỗi kết nối API:", error));
}


callApi();