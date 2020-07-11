const User = require('../models/user');
const Photos = require('../models/photos');

module.exports.addphotos = async function (req, res)                                    //upload a photo
{
    if (req.user.id == req.params.id) 
    {
        try 
        {
            let user = await User.findById(req.params.id);                        //find user
            Photos.uploadedPhoto1(req, res, function (err) 
            {
                if (err)
                     req.flash('error', err);
                if (req.file) 
                {
                    let newphoto = Photos.create({                                //create a photo and store in uploads/photos
                        user: user,
                        name: Photos.PhotoPath + '/' + req.file.filename,
                        details:req.body.details
                    });
                    req.flash('success', 'Photo added');
                }
                return res.redirect('back');
            })
        }
        catch (err) 
        {
            req.flash('error', err);
            return res.redirect('back');
        }
    }
    else 
    {
        req.flash('error', 'Unauthorized');
    }
}

module.exports.destroy = async function (req, res)                      //delete a photo
{                                            
    try 
    {
        let photo = await Photos.findById(req.params.id);                               //find photo
        photo.remove();                                                     //remove photo

        req.flash('success', 'Photo deleted!');

        return res.redirect('back');

    } 
    catch (err) 
    {
        req.flash('error', err);
        return res.redirect('back');
    }

}
module.exports.rate = async function (req, res)                     //give ratings to a photo
{                                            
    try 
    {
        let photo = await Photos.findById(req.params.id);           //find photo
        photo.ratedBy=req.query.rater;
        photo.rating=req.body.rating;
        photo.save();                                             
        req.flash('success', 'Rated successfully!');
        return res.redirect('back');
    } 
    catch (err) 
    {
        req.flash('error', err);
        return res.redirect('back');
    }

}
