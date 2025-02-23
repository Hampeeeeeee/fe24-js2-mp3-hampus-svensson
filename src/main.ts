const base_url: string = "https://fe24-mp3-hampus-svensson-default-rtdb.europe-west1.firebasedatabase.app/";

interface Book {
    title: string;
    writer: string;
    read: boolean;
    review: string | null;
}
// Lägg till bok genom
(document.querySelector('#bookForm') as HTMLFormElement).addEventListener('submit', async (event) => {
    event.preventDefault();

    const authorInput: string = (document.querySelector('#authorInput') as HTMLInputElement).value.trim();
    const titleInput: string = (document.querySelector('#titleInput') as HTMLInputElement).value.trim();

    if (!authorInput || !titleInput) {
        alert("Enter both author and title");
        return;
    }

    const url: string = base_url + '/books.json';

    const body: Book = {
        title: titleInput,
        writer: authorInput,
        read: false,
        review: null
    }

    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("Something went wrong when submitting.");

        const data = await res.json();
        console.log("Book added:", data);

        (document.querySelector('#authorInput') as HTMLInputElement).value = "";
        (document.querySelector('#titleInput') as HTMLInputElement).value = "";

    } catch (error) {
        console.error("Error", error);
        alert("Book could not be added, try again!");
    }

});

async function fetchBooks(): Promise<void> {
    const url: string = `${base_url}/books.json`;

    try {
        const res: Response = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch books");

        const data = await res.json();
        const bookList = document.querySelector('#bookList') as HTMLUListElement;
        bookList.innerHTML = ""; // Rensa listan först

        Object.entries(data).forEach(([id, book]) => {
            const typedBook: Book = book as Book;

            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${typedBook.title}</strong> by ${typedBook.writer} 
            `;

            // Skapa knapp för att uppdatera lässtatus
            const readButton = document.createElement("button");
            readButton.textContent = typedBook.read ? "Mark as unread" : "Mark as read";
            readButton.classList.add("review-button"); // Lägg till klasser
            readButton.addEventListener("click", () => updateReadStatus(id, !typedBook.read));

            // Skapa knapp för att gilla boken
            const likeButton = document.createElement("button");
            likeButton.textContent = "👍";
            likeButton.classList.add("review-button", "like"); // Lägg till klasser
            likeButton.addEventListener("click", () => updateReview(id, "like"));

            // Skapa knapp för att ogilla boken
            const dislikeButton = document.createElement("button");
            dislikeButton.textContent = "👎";
            dislikeButton.classList.add("review-button", "dislike"); // Lägg till klasser
            dislikeButton.addEventListener("click", () => updateReview(id, "dislike"));

            // Lägg till knapparna i listItem
            listItem.append(readButton, likeButton, dislikeButton);
            bookList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Error fetching books", error);
    }
}

// Anropa funktionen när sidan laddas
fetchBooks();

async function updateReadStatus(bookId: string, newStatus: boolean): Promise<void> {
    const url: string = `${base_url}/books/${bookId}.json`;
    const body = JSON.stringify({ read: newStatus });

    try {
        const res: Response = await fetch(url, {
            method: "PATCH",
            body,
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) throw new Error("Failed to update read status");

        console.log("Read status updated");
        fetchBooks(); // Uppdatera listan efter ändring
    } catch (error) {
        console.error("Error updating read status", error);
    }
}

async function updateReview(bookId: string, review: string): Promise<void> {
    const url: string = `${base_url}/books/${bookId}.json`;
    const body = JSON.stringify({ review });

    try {
        const res: Response = await fetch(url, {
            method: "PATCH",
            body,
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) throw new Error("Failed to update review");

        console.log(`Review updated: ${review}`);
        fetchBooks(); // Uppdatera listan efter ändring
    } catch (error) {
        console.error("Error updating review", error);
    }
}
