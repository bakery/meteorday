## Cross device checkin system

/ on device gives you a checkin screen
/ in browser gives you a list of checkins in the system

### Settings (put in settings.json)

```
{
	"cordova":{ 
	},
	
    "private" : {
        "twitter" : {
            "consumerKey" : "twitter-consumer-key",
            "secret"      : "twitter-secret-key"
        }
    }
}
```

### Running on emulator

```
meteor add-platform ios
meteor run ios --settings settings.json  
```

### Running on device

```
meteor run ios-device -p <local IP>:<local port>
```

### Build for device

```
meteor build <bundle path> -p <host>:<port>
```

This will generate a directory at <target bundle path> which includes a server deployment tarball, and the project source for each targeted mobile platform in the /ios/ and /android/ directories.

The <host> and <port> should be the <host> and <port> of the target server environment.

meteor build can also take a --settings argument, see settings section for details.
