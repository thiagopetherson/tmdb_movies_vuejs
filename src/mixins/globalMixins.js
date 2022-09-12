const globalMixins = {    
    methods: {       
        createObjectUser: function(obj) {
            let user = new Object()
            user.id = obj.data.user[0].id
            user.name = obj.data.user[0].name
            user.email = obj.data.user[0].email
            user.surname = obj.data.user[0].user_profile.surname
            user.alias = obj.data.user[0].user_profile.alias
            user.gender = obj.data.user[0].user_profile.gender
            user.birth_date = obj.data.user[0].user_profile.birth_date
            user.telephone = obj.data.user[0].user_profile.telephone
            user.profession = obj.data.user[0].user_profile.profession
            user.profile_phrase = obj.data.user[0].user_profile.profile_phrase
            user.biography = obj.data.user[0].user_profile.biography
            user.avatar = obj.data.user[0].user_profile.avatar
            user.active = obj.data.user[0].user_profile.active
            user.created_at = obj.data.user[0].created_at

            return user
        },
        randomNumber: function(min, max) {
            // Número aleatório entre dois valores
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        },
        brazilianDate: function(date) {
            let d = new Date(date)

            let year = d.getUTCFullYear() 
            let month = (d.getUTCMonth() + 1).toString().padStart(2, '0')
            let day = (d.getUTCDate()).toString().padStart(2, '0')            
        
            return day+"/"+month+"/"+year
        }
    }
}

export default globalMixins