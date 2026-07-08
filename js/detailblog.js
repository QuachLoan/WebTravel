function callApi() {

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id") || "post-001";


    fetch("https://mocki.io/v1/65a56f5b-c77d-4817-9dc4-05bad377da08")
        .then(rs => rs.json())
        .then(postsData => {

            const post = postsData.find(p => p.slug === postId || p.id === postId);

            document.getElementById("breadcrumb_title").innerText = post.title;
            document.getElementById("post_title").innerText = post.title;
            document.getElementById("post_category").innerText = post.category;
            document.getElementById("post_date").innerText = post.date;
            document.getElementById("post_reading_time").innerText = post.readingTime;


            document.getElementById("author_avatar").src = post.author.avatar;
            document.getElementById("author_name").innerText = post.author.name;
            document.getElementById("author_box_avatar").src = post.author.avatar;
            document.getElementById("author_box_name").innerText = post.author.name;
            document.getElementById("author_box_bio").innerText = post.author.bio;

            document.getElementById("post_main_image").src = post.image;


            var contentHTML = `<p>${post.introText}</p>`;

            if (post.subSections) {

                post.subSections.forEach(section => {

                    if (section.heading) {
                        contentHTML += `<h2>${section.heading}</h2>`;
                    }

                    if (section.paragraphs) {
                        section.paragraphs.forEach(p => {
                            contentHTML += `<p>${p}</p>`;
                        });
                    }

                    if (section.gallery) {

                        contentHTML += `<div class="article-gallery">`;

                        section.gallery.forEach(img => {

                            contentHTML += `
                                <figure>
                                    <img src="${img.url}" alt="${img.caption}">
                                    <figcaption>${img.caption}</figcaption>
                                </figure>
                            `;

                        });

                        contentHTML += `</div>`;
                    }

                    if (section.bullets) {

                        contentHTML += `<ul>`;

                        section.bullets.forEach(item => {
                            contentHTML += `<li>${item}</li>`;
                        });

                        contentHTML += `</ul>`;
                    }

                });

            }

            if (post.quote) {

                contentHTML += `
                    <blockquote>
                        <p>"${post.quote.text}"</p>
                        <footer>— ${post.quote.by}</footer>
                    </blockquote>
                `;

            }

            document.getElementById("article_content").innerHTML = contentHTML;

        });



    fetch("https://mocki.io/v1/974c2df4-a5b1-4700-820f-81dadb6b3c26")
        .then(rs => rs.json())
        .then(data => {

            var s = "";
            var count = 0;

            data.map(e => {


                if (e.id == postId) {
                    return;
                }


                if (count >= 3) {
                    return;
                }

                var id = e.id;
                var title = e.title;
                var category = e.category;
                var image = e.image;
                var date = e.date;

                var item = `
                    <div class="related-card">
                        <a href="BlogDetail.html?id=${id}">
                            <img src="${image}" alt="${title}" class="related-img">

                            <div class="related-content">
                                <span class="related-category">${category}</span>

                                <h5 class="related-title">${title}</h5>

                                <p class="related-date">${date}</p>
                            </div>
                        </a>
                    </div>
                `;

                s += item;
                count++;

            });

            document.getElementById("related_posts_list").innerHTML = s;

        });

}

callApi();