import bot from './assets/bot.svg';
import user from './assets/user.svg';

import MidiWriter from 'midi-writer-js';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
	element.textContent = '';

	loadInterval = setInterval(() => {
		element.textContent += '.';

		if (element.textContent === '....') {
			element.textContent = '';
		}
	}, 300);
}

function typeText(element, text) {
	let index = 0;

	let interval = setInterval(() => {
		if (index < text.length) {
			element.innerHTML += text.charAt(index);
			index++;
		} else {
			clearInterval(interval);
		}
	}, 20);
}

function generateUniqueId() {
	const timestamp = Date.now();
	const randomNumber = Math.random();
	const hexadecimalString = randomNumber.toString(16);

	return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
	console.log(value);
	return `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
        		<div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `;
}

const handleSubmit = async (e) => {
	e.preventDefault();

	const data = new FormData(form);

	//users chatstripe
	chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

	form.reset();

	//bots chatstripe
	const uniqueId = generateUniqueId();
	chatContainer.innerHTML += chatStripe(true, ' ', uniqueId);

	chatContainer.scrollTop = chatContainer.scrollHeight;

	const messageDiv = document.getElementById(uniqueId);

	loader(messageDiv);

	//fetch data from the server --- bots response

	const response = await fetch('http://localhost:4999', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			prompt: data.get('prompt'),
		}),
	});

	clearInterval(loadInterval);
	messageDiv.innerHTML = '';

	if (response.ok) {
		const data = await response.json();
		const parsedData = data.bot.trim();
		console.log(parsedData);

		let notesFromAi = parsedData.split(' ');

		console.log(notesFromAi);

		for (let i = 0; i < notesFromAi.lenth; i++) {
			let comRemove = notesFromAi[i].replace(',', '');
			console.log(comRemove);
		}

		const track = new MidiWriter.Track();
		const note = new MidiWriter.NoteEvent({
			pitch: notesFromAi,
			duration: '4',
			sequential: true,
		});
		track.addEvent(note);

		const write = new MidiWriter.Writer(track);
		console.log(write.dataUri());
		downloadFile(write.dataUri());

		typeText(messageDiv, parsedData);
	} else {
		const err = await response.text();

		messageDiv.innerHTML = 'Something went wrong';

		alert(err);
	}
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		handleSubmit(e);
	}
});

// const track = new MidiWriter.Track();
// const note = new MidiWriter.NoteEvent({
// 	pitch: ['C4', 'D4', 'E4'],
// 	duration: '4',
// 	sequential: true,
// });
// track.addEvent(note);

// const write = new MidiWriter.Writer(track);
// console.log(write.dataUri());

const downloadFile = (file) => {
	var a = document.createElement('a');
	a.href = file;
	a.download = 'download';

	a.click();
};
