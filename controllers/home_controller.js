module.exports.homepage = async function(req, res){
        return res.render('sign_up', {
            title: "Being Social"                       //render title to signup page
    });
}