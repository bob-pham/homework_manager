
class Assessment {
    _name;
    _weight;
    _class;

    constructor(name, weight, course) {
        this._name = name;
        this._weight = weight;
        this._class = course;
    }

    setName(name) {
        this._name = name;
    }

    setWeight(weight) {
        this._weight = weight;
    }

    setClass(course) {
        this._class = course;
    }

    getName(name) {
       return this._name;
    }

    getWeight(weight) {
       return this._weigh;
    }

    getClass(course) {
       return this._class;
    }
}