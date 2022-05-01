

class Course {
    _name; // {string}, name of course
    _grades; // {dict[string: array]}, string is assessment name, array is an array of tasks from asssessment
    _numerator; // {double}, current grade in the course
    _denominator;
    _syllabus; // {dict[string:Assessment]}, syllabus with assessment name and how much the assessment is worth

    /**
     * @param  {string} name
     * @param  {dict[string:Assessment]} syllabus
     */
    constructor(name, syllabus) {
        this._name = name;
        this._syllabus = syllabus;
        this.grades = {};
    }

    setName(name) {
        this._name = name;
    }

    setSyllabus(syllabus) {
        this._syllabus = syllabus;
    }

    setGrades(grades) {
        this._grades = grades;
    }

    getName() {
        return this._name;
    }
 
    getSyllabus() {
        return this.syllabus;
    }

    addAssessment(assessment) {
        this._syllabus.push(assessment);
    }

    getCurrentGrade() {
        return 100 * this._numerator / this._denominator;
    }

    /**
     * @param  {string} name
     * @param  {double} score
     */
    addScore(name, score) {
        if (name in this._syllabus) {
            if (name in this._grades) {
                temp = this._syllabus[name];
                
                _currentGrade -= temp.getGrade();
                weight = temp.getWeight;

                this._grades[name] = this._grades[name].push(score);

                temp_array = this.grades[name];
                temp_score = 0;

                for (let x in temp_array) {
                    temp_score += x;
                }

                temp_score /= temp_array.length;

                this._syllabus[name].setGrade(temp_score);
                this._currentGrade += temp_score * this._syllabus[name].getWeight();
            } else {
                this._syllabus[name].setGrade(score);
                this._grades[name] = [score];
                this._currentGrade += score * this.syllabus[name].getWeight;
            }
        } else {
            throw "not in syllabus"
        }
    }


}

class Assessment {
    _name; // {string}, name of the assessment
    _weight; // {double}, weight of the assessment
    _accounted_for; //{boolean}, true if the assessment has been accounted for, false otherwise
    _grade;
    _class; // parent class

    constructor(name, weight, course) {
        this._name = name;
        this._weight = weight;
        this._class = course;
        this._grade = 0;
        this._accounted_for = false;
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

    setAccountedFor(bool) {
        this._accounted_for = bool;
    }

    setGrade(grade) {
        this._grade = grade;
    }

    getGrade() {
        return this._grade;
    }

    isAccountedFor() {
        return this._accounted_for;
    }

    getName() {
       return this._name;
    }

    getWeight() {
       return this._weight;
    }

    getClass() {
       return this._class;
    }
}

class Task {
    _name;
    _grade;
    _class;
    _assessment;
    _completed;
    _parentTask;
    _subtasks;
    _reminderDate;
    _dueDate;

    constructor(name, course, assessment) {
        this._name = name;
        this._class = course;
        this._assessment;
        this._completed = false;
        this._parentTask = null;
        this._subtasks = [];
    }

    setName(name){
        this._name = name;
    }

    setgrade(grade){
        this._grade = grade;
    }

    setClass(course){
        this._class = course;
    }

    setAssessment(assessment){
        this._assessment = assessment;
    }

    setCompleted(completed){
        this._completed = completed;
    }

    setSubtasks(subtasks){
        this._subtasks = subtasks;
    }

    setParent(parent) {
        this._parentTask = parent;
    }

    getName(){
        return this._name;     
    }

    getGrade(){
        return this._grade;     
    }

    getClass(){
        return this._class;     
    }

    getAssesssment(){
        return this._assessment;
    }

    getSubtasks(){
        return this._subtasks;   
    }

    getParent(){
        return this._parentTask;     
    }

    markComplete() {
        for (let child in children) {
            child.markComplete();
        }
        this._completed = true;
    }

    addChildGrade(grade) {
        this._grade += grade / this._subtasks.length();
    }

    //TODO assessment and class grade calculation

}