class SimpleClass{

    constructor(){
        this.created = new Date();
    }

    theUtcTimestampString(){
        return new Date().toUTCString();
    }

    theCreated(){
        return this.created;
    }

}

module.exports = SimpleClass;