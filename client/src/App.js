import React, { useState } from 'react';
import './App.css';

import MidiWriter from 'midi-writer-js';

function App() {
	const [instrument, setInstrument] = useState('Bass');
	const [key, setKey] = useState('Random');

	let prompt;

	//Auto download of MIDI file
	const downloadFile = (file) => {
		var a = document.createElement('a');
		a.href = file;
		a.download = 'download';

		a.click();
	};

	//Grab key selected from dropdown
	const keyChange = (e) => {
		setKey(e.target.value);
	};

	//Grab instrument selected from dropdown
	const instrumentChange = (e) => {
		setInstrument(e.target.value);
	};

	//Check for if notes have numbers
	const hasNumber = (myString) => {
		return /\d/.test(myString);
	};

	//Adds numbers to non numbered notes
	let numNote;
	const addNumber = (note) => {
		numNote = note.concat('2');
	};

	//Build prompt based of input
	const buildPrompt = () => {
		if (key === 'Random') {
			return `${instrument} note progression in a ${key} key in notation`;
		} else {
			return `${instrument} note progression in the key of ${key} in notation`;
		}
	};

	//Build midi
	const buildMidi = (notesFromAi) => {
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
	};

	//Submit users built prompt to AI
	const submitToAi = async (prompt) => {
		const response = await fetch('http://localhost:4999', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt: prompt,
			}),
		});

		parseResponse(response);
	};

	//Ai's response parsed into array
	const parseResponse = async (response) => {
		let parsedData;

		if (response.ok) {
			const data = await response.json();
			const botData = data.bot.trim();

			console.log(botData);

			//Remove all the extra chars
			if (botData.includes('-')) {
				console.log('has -');
				parsedData = botData.replaceAll('-', ' ');
				console.log(parsedData);
			} else if (botData.includes(',')) {
				console.log('has ,');
				parsedData = botData.replaceAll(',', '');
				console.log(parsedData);
			} else {
				parsedData = botData;
				console.log(parsedData);
			}

			//Now we have removed all extra chars
			let notesFromAi = parsedData.split(' ');

			console.log(notesFromAi);

			//Checks for numbers and if none adds 2 to each
			if (!hasNumber(parsedData)) {
				console.log(notesFromAi);
				console.log('IF STATMENT DOES NOT HAVE NUMBERS');

				let numberMapper = (notesFromAi) => {
					let newArr = notesFromAi.map(function (e) {
						return e + '2'; //Return the concatenated value of 2 strings
					});
					return newArr;
				};

				console.log(numberMapper(notesFromAi));

				buildMidi(numberMapper(notesFromAi));
			} else {
				console.log(notesFromAi);

				buildMidi(notesFromAi);
			}

			// console.log(notesFromAi);

			// buildMidi(notesFromAi);
		} else {
			const err = await response.text();

			alert(err);
		}
	};

	//Submit to Ai
	const handleSubmit = async (e) => {
		e.preventDefault();

		prompt = buildPrompt();
		console.log(prompt);
		submitToAi(prompt);
	};

	return (
		<div className='App'>
			<div className='Plugin'>
				<div className='Dropdowns'>
					<form onSubmit={handleSubmit}>
						<label>Key:</label>
						<select
							value={key}
							onChange={keyChange}
							className='Key'
						>
							<option
								selected
								value='Random'
							>
								Random
							</option>
							<option value='A'>A</option>
							<option value='A#'>A#</option>
							<option value='B'>B</option>
							<option value='C'>C</option>
							<option value='C#'>C#</option>
							<option value='D'>D</option>
							<option value='D#'>D#</option>
							<option value='E'>E</option>
							<option value='F'>F</option>
							<option value='F#'>F#</option>
							<option value='G'>G</option>
							<option value='G#'>G#</option>
						</select>
						<br />
						<label>Instrument:</label>
						<select
							value={instrument}
							onChange={instrumentChange}
							className='Instrument'
						>
							<option
								selected
								value='Bass'
							>
								Bass
							</option>
							<option value='Piano'>Piano</option>
							<option value='Guitar'>Guitar</option>
						</select>
						<br />
						<input
							type='submit'
							value='Submit'
						/>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
