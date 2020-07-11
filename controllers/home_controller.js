module.exports.homepage = async function (req, res) 
{
    return res.render('sign_up', {
        title: "Bootcamp"                       //render title to signup page
    });
}