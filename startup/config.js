const config=require('config');
module.exports=function()
{
    //jwtPrivateKey:
        // set value by: set 2723_jwtPrivateKey=1234
        if(!config.get('jwtPrivateKey'))
        {
            throw new Error('Error: jwtPrivateKey not found.');
        }
}