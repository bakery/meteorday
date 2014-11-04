Based on [Waldo](http://thebakery.io/waldo)

## settings

```
{
    "cordova":{ 
    },

    "kadira": { 
        "appId": "your-app-id", 
        "appSecret": "secret"
    },
        
    "public" : {
        "foursquare" : {
            "clientId" : "client-id",
            "clientSecret" : "client-secret",
            "resultsLimit" : 20
        },

        "checkins": {
            "limit": 10
        },

        "map": {
            "checkinDestination": {
                "latitude": 37.7746896,
                "longitude": -122.4154627
            } 
        }
    },  
    
    "private" : {
        "facebook" : {
            "applicationId" : "app-id",
            "applicationSecret" : "app-secret"
        },

        "meteor" : {
            "clientId" : "app-id",
            "secret" : "app-secret"
        },

        "imugr" : {
            "apiKey" : "api-key"
        },

        "google" : {
            "apiKey" : "api-key-for-geolocation-api"
        }
    }
}
```