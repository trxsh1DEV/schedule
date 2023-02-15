const Login = require('../models/LoginModel');

exports.index = (req,res) => {
    // console.log(req.session.user); mostrando o usuário logado
    if(req.session.user) return res.render('logged');
    return res.render('login');
};
exports.register = async (req,res) => {
    try{
        const login = new Login(req.body);
        await login.register();
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors); // Exibindo errors
            req.session.save(() => {
                return res.redirect('/login');
            }); // Salvando sessão antes de redirecionar o usuário
            return; // Esse retorno é pq se n qnd o return redirect fosse acionado o if ficaria em loop, então temos que usar o return aq tbm para sairmos do bloco if
        }
        req.flash('success', 'Your user has been created successfully'); // Exibindo errors
        req.session.save(() => {
            return res.redirect('/login');
        });

    } catch(e){
        console.log(e);
        return res.render('404');
    }
};

exports.login = async (req,res) => {
    try{
        const login = new Login(req.body);
        await login.logar();
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors); // Exibindo errors
            req.session.save(() => {
                return res.redirect('/login');
            }); // Salvando sessão antes de redirecionar o usuário
            return; // Esse retorno é pq se n qnd o return redirect fosse acionado o if ficaria em loop, então temos que usar o return aq tbm para sairmos do bloco if
        }
        req.flash('success', 'You logged in successfully'); // Exibindo errors
        req.session.user = login.user // pegando o usuário que logou e salvando a sessão dele no navegador usado
        req.session.save(() => {
            return res.redirect('back');
        });

    } catch(e){
        console.log(e);
        return res.render('404');
    }
};

exports.logout = (req,res) => {
    req.session.destroy(); // Deslogando o usuário
    res.redirect('/');
}