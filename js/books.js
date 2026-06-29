/* ============================================
   Nora Ashworth
   Books Database
============================================ */

const books = [

{
    title: "The Silent Garden",

    subtitle: "A Novel",

    description:
    "A moving story about hope, forgiveness and the hidden secrets that shape every family.",

    cover: "images/books/book1.webp",

    amazon: "https://www.amazon.com/stores/Nora-Ashworth/author/B0GZ97K9LC"
},

{
    title: "Coming Soon",

    subtitle: "New Release",

    description:
    "A brand-new story is on its way. Stay tuned for upcoming releases.",

    cover: "images/books/book2.webp",

    amazon: "https://www.amazon.com/stores/Nora-Ashworth/author/B0GZ97K9LC"
}

];

/* ============================================
   Generate Books
============================================ */

const booksGrid = document.getElementById("booksGrid");

if (booksGrid) {

    books.forEach(book => {

        booksGrid.innerHTML += `

        <article class="book reveal">

            <img
                src="${book.cover}"
                alt="${book.title}"
                loading="lazy">

            <div class="book-info">

                <h3>${book.title}</h3>

                <strong>${book.subtitle}</strong>

                <p>${book.description}</p>

                <a
                    href="${book.amazon}"
                    target="_blank"
                    class="primary-button">

                    View on Amazon

                </a>

            </div>

        </article>

        `;

    });

}
