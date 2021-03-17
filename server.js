//Get the framework for hapi.js
const Hapi = require('hapi');

// Store the hosting server and the port 
const host = 'localhost';
const port = 3000; 

// Lets create the server here
const server = Hapi.Server({
    host: host,
    port: port
});

server.route({
    method: 'POST',
    path: '/',
    handler: function (request, h) {
        console.log(request)
        var payload = request.payload.payload;
        let filterData = payload.filter(item => {
            return item.drm && item.episodeCount >0
            }) 
        var newArray = [];
        if (filterData && typeof filterData === 'object') {
            
            filterData.map((item, index) =>{
                
                var image = item.image
                console.log(image)
                newArray[index] = {
                    "image": item.image.showImage,
                    "slug": item.slug,
                    "title": item.title
                };
            });
            let newJason= JSON.stringify({respones:newArray},null,"\t");
            return newJason;

        } else {
            var data = {
                message: 'Could not decode request: JSON parsing failed'
            };
            console.log(data)
            return data;
        }
        

        
    }
});

// Create an init method to start the server. 
const init = async () => {

    await server.start();
    console.log("Server up and running at port: " + port);

}

// Call the init method.
init();