<img src="doc/img/responsediff-logo_320x160.png" alt="ResponseDiff"/>

# What is responsediff-demo?

This project provides a simple REST interface to illustrate the [ResponseDiff](https://github.com/kreutzr/responsediff) regression test software in action.

You may run separate webservers (for reference, control and candidate) on different ports (e.g., 3000, 3001, 3002) with each the identical directory structure as shown in this example:
```
responsediff-demo/
├── server.js
├── package.json
└── public/
    ├──my-tool
    │  ├── person.json
    │  └── person.png
    └── text.txt
```

or use only one single webserver as follows:
```
responsediff-demo/
├── server.js
├── package.json
└── public/
    ├── v1.0.0                 # reference
    │    ├── my-tool
    │    │   ├── person.json
    │    │   └── person.png
    │    └── text.txt
    ├── v1.0.0-control         # control (optional)
    │    ├── my-tool
    │    │   ├── person.json
    │    │   └── person.png
    │    └── text.txt
    └── v2.0.0-control         # candidate
         ├── my-tool
         │   ├── person.json
         │   └── person.png
         └── text.txt
```

You will find a ready setup single webserver example in folder `regression`.


To simulate a login, this service provides a "/login" POST endpoint which will return a response as JSON (e.g., "{ 'uuid': '2869e288-eb05-4e16-be22-0af3c2308469' }").
The `login` endpoint is provided on root and first level.
```
curl -v -X POST http://localhost:3000/login
curl -v -X POST http://localhost:3000/v1.0.0/login
```

# How to get started
## Start the server
### Using Docker
The easiest way to get this demo started is to run the latest Docker image (see "https://hub.docker.com/repository/docker/rkreutz67/responsediff-demo/general"):
```
docker run -p 3000:3000 rkreutz67/responsediff-demo:latest
```

To access the logs of this container call:
```
docker ps
docker logs <CONTAINER ID>
```

### Using node.js
With having node.js installed alternatively call:
```
node server.js
```

## Start ResponseDiff
With the running demo now run ResponseDiff against this webserver(s) from another console.
Check the ResponseDiff documentation on how to start it.
HINT: There should be an example script `doc/start-responsediff` to get started where you may have to adjustment the path to the ResponseDiff JAR file in the java command only.

To stop the webserver(s) just press `Ctrl+C`.



Enjoy!
