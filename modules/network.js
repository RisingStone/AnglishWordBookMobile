let server = 'anglish-server.herokuapp.com';
let wordAPI = '/api/words';
let commentAPI = '/api/comments';
let UserLoginAPI = '/users/login';
let UserLogoutAPI = '/users/logout';
let UserRegisterAPI = '/users/register';
let UserGetAPI = '/users/user';

var NetworkUtils = {
	fetchWord: function (word = 'language', getComments = 1) {
		return fetch(`https://${server}${wordAPI}?word=${word}&populate_comments=${getComments}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	},
	fetchCommentsByWordID: function (wordID) {
		return fetch(`https://${server}${commentAPI}/word/${wordID}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	},
	addCommentToWord: function (wordID, userId, comment, sessionToken) {
		return fetch(`https://${server}${commentAPI}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'sessionToken': sessionToken
			},
			body: JSON.stringify({
				word: wordID,
				user: userId,
				comment: comment
			})
		}).then((response) => response.json());
	},
	deleteCommentByID: function (commentID, sessionToken) {
		return fetch(`https://${server}${commentAPI}/comment/${commentID}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'sessionToken': sessionToken
			}
		}).then((response) => response.json());
	},
	addWord: function (word, sessionToken) {
		return fetch(`https://${server}${wordAPI}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'sessionToken': sessionToken
			},
			body: JSON.stringify(word)
		}).then((response) => response.json());
	},
	updateWord: function (word_id, word, sessionToken) {
		return fetch(`https://${server}${wordAPI}/${word_id}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'sessionToken': sessionToken
			},
			body: JSON.stringify(word)
		}).then((response) => response.json());
	},
	login: function (emailval, passwordval) {
		return fetch(`https://${server}${UserLoginAPI}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: emailval,
				password: passwordval
			})
		}).then((response) => response.json());
	},
	logout: function (sessionToken) {
		return fetch(`https://${server}${UserLogoutAPI}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'sessionToken': sessionToken
			}
		}).then((response) => response.json());
	},
	register: function (handleval, emailval, passwordval) {
		return fetch(`https://${server}${UserRegisterAPI}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				handle: handleval,
				email: emailval,
				password: passwordval
			})
		}).then((response) => {
			return response.json()
		});
	},
	updateUserPermissions: function (user, permissions, sessionToken) {
		user.permissions = permissions;
		return fetch(`https://${server}${UserGetAPI}/${user._id}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'sessionToken': sessionToken
			},
			body: JSON.stringify(user)
		}).then((response) => {
			return response.json()
		});
	},
	getUserByEmail: function (email) {
		return fetch(`https://${server}${UserGetAPI}/email?user=${email}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			return response.json()
		});
	},
	getUserByHandle: function (handle) {
		return fetch(`https://${server}${UserGetAPI}/handle/${handle}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			return response.json()
		});
	},
	getUserById: function (user_id) {
		return fetch(`https://${server}${UserGetAPI}/${user_id}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			return response.json()
		});
	}
}

export { NetworkUtils as default };