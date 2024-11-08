export default {

	defaultTab: 'Sign In',

	setDefaultTab: (newTab) => {
		this.defaultTab = newTab;
	},
	
	
	

	generatePasswordHash: async () => {
		return dcodeIO.bcrypt.hashSync(inp_registerPassword.text, 10);
	},

	//verifyHash: async (password, hash) => {
	//	return dcodeIO.bcrypt.compareSync(password, hash)
	//},
	
	verifyHash: async (password, hash) => {
return await dcodeIO.bcrypt.compare(password, hash);
},


	createToken: async (user) => {
		return jsonwebtoken.sign(user, 'secret', {expiresIn: 60*60});
	},

//	signIn: async () => {
//		const password = inp_password.text;

//		const [user] = await findUserByEmail.run();

//		if (user && this.verifyHash(password, user?.password_hash)) {
		
//			storeValue('token', await this.createToken(user))
//			storeValue('uzytkownik',inp_email.text )
		//		.then(() => updateLogin.run({
	//			id_user: user.id
	//		}))
//				.then(() => showAlert('zalogowano', 'success'))
				//.then(() => navigateTo('Klienci', {}, 'SAME_WINDOW'))	; 	
			  
//		} else {
//			return showAlert('Invalid emaill/password combination', 'error');
//		}
//	},
	
signIn: async () => {
const password = inp_password.text;
const [user] = await findUserByEmail.run();

if (user && await this.verifyHash(password, user?.password_hash)) {
await storeValue('token', await this.createToken(user));
await storeValue('uzytkownik',inp_email.text )
await updateLogin.run({ id: user.id });
showAlert('Zalogowano', 'success');
navigateTo('Klienci', {}, 'SAME_WINDOW');
} else {
showAlert('Błędny mail lub hasło', 'error');
}
},
	
signIn2: async () => {
const password = inp_password2.text;
const [user] = await findUserByEmail2.run();

if (user && await this.verifyHash(password, user?.password_hash)) {
await storeValue('token', await this.createToken(user));
await storeValue('uzytkownik',inp_email2.text )
await updateLogin.run({ id: user.id });
showAlert('Zalogowano', 'success');
navigateTo('Klienci-B2B', {}, 'SAME_WINDOW');
} else {
showAlert('Błędny mail lub hasło', 'error');
}
},	

	register: async () => {
		const passwordHash = await this.generatePasswordHash();
		const [user] = await createUser.run({passwordHash});
		if (user) {
			storeValue('token', await this.createToken(user))
			showAlert('Register Success', 'success');
		} else {
			return showAlert('Error creating new user', 'error');
		}
	},
}