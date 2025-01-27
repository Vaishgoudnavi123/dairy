document.getElementById('diaryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const mood = document.getElementById('mood').value;
    const note = document.getElementById('note').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const entry = {
            mood: mood,
            note: note,
            image: e.target.result
        };

        saveEntry(entry);
        displayEntries();
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        const entry = {
            mood: mood,
            note: note,
            image: null
        };
        saveEntry(entry);
        displayEntries();
    }

    // Reset form
    this.reset();
});

function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.push(entry);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
}

function displayEntries() {
    const entriesContainer = document.getElementById('entries');
    entriesContainer.innerHTML = '';

    const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');

        const moodText = document.createElement('p');
        moodText.textContent = `Mood: ${entry.mood}`;
        entryDiv.appendChild(moodText);

        const noteText = document.createElement('p');
        noteText.textContent = `Note: ${entry.note}`;
        entryDiv.appendChild(noteText);

        if (entry.image) {
            const image = document.createElement('img');
            image.src = entry.image;
            entryDiv.appendChild(image);
        }

        entriesContainer.appendChild(entryDiv);
    });
}

// Display entries on page load
document.addEventListener('DOMContentLoaded', displayEntries);
