
const jwt = require('jsonwebtoken');

var crypto = require("crypto");

module.exports = {
  

    jwtRefreshSign: async (payload) => {
        // eslint-disable-next-line no-useless-catch
        try {
            return jwt.sign(payload, process.env.jwtSecretKey, { expiresIn: '3000s'});
        } catch (error) {
            throw error;
        }
    },
    getServerCurrentTime : async () => {
        return Math.floor(new Date().getTime() / 1000);
    },
    isEmail : (value) => {
         let  re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(value).toLowerCase());
    },

    isPhone : (value) => {
       let intRegex = /[0-9 -()+]+$/;
       return intRegex.test(value);
    },

    generateRandom : (n) =>{
        var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    
        // if ( n > max ) {
        //         return generate(max) + generate(n - max);
        // }
    
        max        = Math.pow(10, n+add);
        var min    = max/10; // Math.pow(10, n) basically
        var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
        return ("" + number).substring(add); 
    },
    
   generateRandomString : (n) =>{
       return crypto.randomBytes(n).toString('hex');
    }

};
