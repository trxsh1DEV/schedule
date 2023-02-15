// Recursos para suportar async, await / Promise
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
// import './assets/images/test.jpg';

const login = new Login('.form-login');
const register = new Login('.form-register');
login.init();
register.init();

// n estamos usando esse css
import './assets/css/style.css';

