const http = require('http');
class Resource {
    resourceType;
    baseUrl;
    type;
    constructor(resourceType, baseUrl){
        this.resourceType = resourceType;
        this.baseUrl = baseUrl;
        this.type = type;
    }    

    async createResource() {
        return new Promise(function(resolve, reject){
            const response = http.get(this.baseUrl + this.type + "/");
                if(response.status.code === 200){
                    resolve(response.data);
                }else{
                    console.log(response);
                    reject("unable to get data")
                }
            });
    }

    async deleteResource(id) {
        try{
          const response= await http.post(this.baseUrl +this.type +'/'+ id, {});

        }catch(err){

        }

        

    }

   async updateResource(){


        

    }

    async getResource(){


        

    }


}