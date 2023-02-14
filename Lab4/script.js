note = document.getElementById('note');
savebtn = document.getElementById('save');
savebtn.addEventListener('click', save);
colors = document.getElementById('colors');
wall = document.getElementById('wall');
id = 0;
color = 'white';

colors.addEventListener('change', function () {
	color = document.querySelector('input[name="colors"]:checked').value;
	note.style.background = color;
	id = localStorage.getItem('currentId');
});

function save() {
	title = document.getElementById('title').value;
	content = document.getElementById('content').value;
	formid = document.getElementById('id').value;
	if (title == '' || content == '') {
		alert('Notatka pusta');
	} else {
		pinned = document.getElementById('pin').checked;
		newNote = {
			id: formid,
			title: title,
			content: content,
			color: color,
			pinned: pinned,
			date: getDate(),
		};
		storageName = 'id' + formid;
		localStorage.setItem(storageName, JSON.stringify(newNote));
		formid++;
		if (formid <= localStorage.getItem('currentId')) {
			document.getElementById('id').value = localStorage.getItem('currentId');
		} else {
			document.getElementById('id').value = formid;
			localStorage.setItem('currentId', formid);
		}
		document.getElementById('title').value = '';
		document.getElementById('content').value = '';

		loadNotes();
	}
}

function getDate() {
	return new Date().toLocaleString();
}

window.onload = function () {
	id = localStorage.getItem('currentId');
	if (id == null) {
		localStorage.setItem('currentId', 0);
	}
	id = localStorage.getItem('currentId');
	formid = document.getElementById('id');
	formid.value = id;
	loadNotes();
};

function loadNotes() {
	id = localStorage.getItem('currentId');
	wall.innerHTML = '';
	for (i = id; i > 0; i--) {
		id--;
		noteread = JSON.parse(localStorage.getItem('id' + id));
		if (noteread != null) {
			if (noteread.pinned == true) {
				temp = wall.innerHTML;
				wall.innerHTML =
					"<div id='note' style='background-color:" +
					noteread.color +
					"'><div><div style='float:left;padding-top:6px;'>" +
					noteread.date +
					"</div><div style='float:right;padding-bottom:6px;'>&#128204;</div></div><input type='text' id='title" +
					noteread.id +
					"' class='title' value='" +
					noteread.title +
					"' disabled><textarea  id='content" +
					noteread.id +
					"' disabled></textarea><input type='hidden' id='id'><div style='display:flex;align-items: center;justify-content: center;'><button style='color:red;'onClick='deleteNote(" +
					id +
					")'>Usuń</button><button style='color:blue;' onClick='editNote(" +
					id +
					")'>Edytuj</button></div>";
				wall.innerHTML = wall.innerHTML + temp;
			} else {
				wall.innerHTML =
					wall.innerHTML +
					"<div id='note' style='background-color:" +
					noteread.color +
					"'>" +
					noteread.date +
					"<input type='text' id='title" +
					noteread.id +
					"' class='title' value='" +
					noteread.title +
					"' disabled><textarea  id='content" +
					noteread.id +
					"' disabled></textarea><input type='hidden' id='id'><div style='display:flex;align-items: center;justify-content: center;'><button style='color:red;'onClick='deleteNote(" +
					id +
					")'>Usuń</button><button style='color:blue;' onClick='editNote(" +
					id +
					")'>Edytuj</button></div>";
			}
			document.getElementById('content' + id).innerHTML = noteread.content;
			document.getElementById('title' + id).innerHTML = noteread.content;
		}
	}
}
function deleteNote(x) {
	localStorage.removeItem('id' + x);
	loadNotes();
}
function editNote(x) {
	noteread = JSON.parse(localStorage.getItem('id' + x));
	document.getElementById('title').value = noteread.title;
	document.getElementById('content').value = noteread.content;
	document.getElementById('id').value = noteread.id;
	window.scrollTo({ top: 0, behavior: 'smooth' });
}
