# 5app-coding-challenge

## The Challenge

Please create a webservice on a public URL which modifies an incoming JSON `POST` payload and returns a response. 

The response should be a JSON object with property `response` with an Array of items.

i.e...
```
{
   response: [{name, count, thumbnail}, ...]
}
```

- Where `name` and `count` match their respective properties from the payload
- The payload is filtered, so only items with a `count` greater than `1` are returned.
- The `thumbnail` is a `url` selected from the payload item's list of `logos` no larger than 128x128 but no smaller than 64x64.

Please see [/samples](/samples) for example request and response

### Submit

To submit your service please enter the details in https://fiveapp-coding-challenge.herokuapp.com

## The implementation

In order to respond to the challenge I implemented:
- An `express` route
- Tests run with `mocha`
- A validation module
- A *logic* module
- Code standardisation via `semistandard`

To run 
```
npm install
npm start
# server runs on port 8080
```


### Decisions

I decided not to use a framwork such as `swagger` as it seemed a bit overkill for the scope of a single route. The main advantage would have been in the validation of the request and description of the response via `swagger.yml`. If the scope was to grow, it would be easy to change.
