import React, { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Dropdowns() {
	const [instrument, setInstrument] = useState('Instrument');
	const [key, setKey] = useState('Key');

	// return (
	// 	<>
	// 		<Dropdown>
	// 			<Dropdown.Toggle
	// 				id='dropdown-button-dark-example1'
	// 				variant='secondary'
	// 			>
	// 				{instrument}
	// 			</Dropdown.Toggle>

	// 			<Dropdown.Menu variant='dark'>
	// 				<Dropdown.Item href='#/action-1'>Bass</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-2'>Guitar</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-3'>Piano</Dropdown.Item>
	// 			</Dropdown.Menu>
	// 		</Dropdown>
	// 		<Dropdown>
	// 			<Dropdown.Toggle
	// 				id='dropdown-button-dark-example1'
	// 				variant='secondary'
	// 			>
	// 				{key}
	// 			</Dropdown.Toggle>

	// 			<Dropdown.Menu variant='dark'>
	// 				<Dropdown.Item
	// 					as='button'
	// 					onClick={setKey('Random')}
	// 				>
	// 					Random
	// 				</Dropdown.Item>
	// 				<Dropdown.Divider />
	// 				<Dropdown.Item href='#/action-4'>A</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-2'>A#</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-3'>B</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-3'>C</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-3'>C#</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-3'>D</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-3'>D#</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-3'>E</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-3'>F</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-3'>F#</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-3'>G</Dropdown.Item>
	// 				<Dropdown.Item href='#/action-3'>G#</Dropdown.Item>
	// 			</Dropdown.Menu>
	// 		</Dropdown>
	// 	</>
	// );
}

export default Dropdowns;
