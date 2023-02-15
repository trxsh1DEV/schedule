
// const express = require('express');
// const route = express.Router();
// const homeController = require('./src/controllers/homeController');
// const contactController = require('./src/controllers/contactController');
// route.get('/', homeController.pageInitial);
// route.post('/', homeController.treatPost);


// function myMiddleware(req,res,next){
//     console.log()
//     console.log('Passei no seu middleware');
//     console.log()
//     next();


// }
// route.get('/', myMiddleware,homeController.pageInitial);

// route.get('/contact', contactController.pageContact);

// module.exports = route;

// const express = require('express');
// const app = express();
// const routes = require('./routes');
// const path = require('path');
// const { otherMiddleware, myMiddleware } = require('./src/middleware/middlewareGlob');

// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.resolve(__dirname, 'public')));

// app.set('views', path.resolve(__dirname, 'src', 'views'));
// app.set('view engine', 'ejs');

// app.use(myMiddleware);
// app.use(otherMiddleware);
// app.use(routes)

// app.listen(3000, () => {
//     console.log('Acess http');
// });