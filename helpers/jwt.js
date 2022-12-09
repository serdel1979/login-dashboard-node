const jwt = require('jsonwebtoken')

const generarJwt = ( uid, name, email)=>{

    const payload = { uid, name, email};

    return new Promise((resove, reject)=>{

        jwt.sign(payload, process.env.JWT_SEED,{
            expiresIn: '24h'
        },(err,token)=>{
    
            if(err){
                console.log(err);
                reject(err);
            }else{
                resove(token);
            }
    
        })

    });


}

module.exports={
    generarJwt
}