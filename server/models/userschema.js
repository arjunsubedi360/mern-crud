const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    gender:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    
    tokens:[
        {
           token:{
               type:String,
               required:true
           } 
        }
    ]
})


// we are hashing password

 userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 12);
     
       
 }  
 next();
});

//JWT token promise we are generating Token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    }catch(err){
        console.log(err)
    }
}

const User =new mongoose.model('USER', userSchema);
module.exports = User;