import jwt from 'jsonwebtoken'

interface DATA_PROPS {
    admin: boolean
}

const password = process.env.PASSWORD_JWT as string

export function readToken(admin: string){
    try{
        return jwt.verify(admin, password)
    }catch(e){
        console.log(e)
        return false
    }
}

export function createToken(dataUser: DATA_PROPS){
    try{
        return jwt.sign({admin: dataUser.admin}, password);
    }catch(err){
        console.log(err)
       return false
    }
}