exports.myMiddleware = (req,res,next) => {
    res.locals.errors = req.flash('errors'); // Criando uma váriavel global e capturando as msgs de erro
    res.locals.success = req.flash('success'); // Criando uma váriavel global e capturando as msgs de success
    // console.log(req.session.user);
    res.locals.user = req.session.user; // pegando a sessão do meu usuário e deixando essa session do usuário logado como um middleware global pra ser acessado e usado pra fazer verificações, Ex: nav.ejs
    next();
}

exports.otherMiddleware = (req,res,next) => {
    console.log('Criando outro middleware global');
    next();
}

exports.checkCsrfErr = (err, req, res, next) => {
    // if(err && err.code === 'EBADCSRFTOKEN'){
    if(err){
        return res.render('404');
    };
    next();
};

exports.csrfMiddleware = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) => {
    if(!req.session.user){ //verificando se o usuário está logado
        req.flash('errors', 'You need are logged for add a contact');
        req.session.save(() => res.redirect('/')); // salvando sessão do usuário deslogado
        return;
    }
    next();
}