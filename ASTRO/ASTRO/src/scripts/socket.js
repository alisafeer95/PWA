import { io } from 'socket.io-client';
const socket = io(`${import.meta.env.PUBLIC_SERVER_URL}`)

socket.on('connect', () => {
	console.log('Socket connected successfully with ID:', socket.id);
	socket.on('product:update', (data) => {
		console.log('product updated!');
		console.log('socket updated data:',data);
	});
	
});