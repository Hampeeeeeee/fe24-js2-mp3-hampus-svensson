const base_url:string = "https://fe24-mp3-hampus-svensson-default-rtdb.europe-west1.firebasedatabase.app/";

interface Book {
    title: string;
    writer: string;
    read: boolean;
    review: string | null;
}
// Lägg till bok genom
(document.querySelector('#bookForm') as HTMLFormElement).addEventListener('submit', async (event) => {
    event.preventDefault();

    const authorInput:string = (document.querySelector('#authorInput') as HTMLInputElement).value.trim();
    const titleInput:string = (document.querySelector('#titleInput') as HTMLInputElement).value.trim();

    if (!authorInput || !titleInput) {
        alert("Enter both author and title");
        return;
    }

    const url:string = base_url + '/books.json';

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