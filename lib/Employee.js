// TODO: Write code to define and export the Employee class

class Employee{
    constructor(...args) { // Input NAME, ID, EMAIL
        [this.name,this.id,this.email] = args;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    getRole(){
        return this.constructor.name
    }
}

module.exports = Employee