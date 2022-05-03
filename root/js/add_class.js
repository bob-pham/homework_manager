class Course {
    _name; // {string}, name of course
    _grades; // {dict[string: array]}, string is assessment name, array is an array of tasks from asssessment
    _numerator; // {double}, current numerator grade in the course
    _denominator; // {double}, current demoninator grae of the course
    _syllabus; // {dict[string:Assessment]}, syllabus with assessment name and how much the assessment is worth

    /**
     * @param  {string} name
     * @param  {dict[string:Assessment]} syllabus
     */

    constructor() {
        this._syllabus = {};
        this.grade = {};
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
        this._syllabus[assessment.getName()] = assessment.getWeight();
    }

    getCurrentGrade() {
        return 100 * this._numerator / this._denominator;
    }

    /**
     * @param  {string} name
     * @param  {double} score
     * 
     *  adds the score to the current classes grade, throws an exception if attempting to add to a grade that is not 
     *  a part of the syllabus
     * 
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
    _grade; // current overall Assessment grade
    _grades; // array of grades from completed tasks that were from this Assessment 
    _class; // parent class

    constructor(name, weight, course) {
        this._name = name;
        this._weight = weight;
        this._class = course;
        this._grade = 0;
        this.grades = [];
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
    /**
     * @param  {double} grade
     * 
     *  adds grade to list of grades, the recalculates the overall grade from the average
     * 
     */
    calculateGrade(grade) {
        this.grades.append(grade);
        temp = 0;
        
        for (let marks in grades) {
            temp += marks;
        }

        grades = temp / this.grades.length;
    }

}

let newClass = new Course();
let classes;
const numbersRegex = new RegExp('^[0-9]+');


/**
 * 
 * Sets the class name if it is valid, alerts the user if it is not valid
 * 
 */
function saveClassName() {
    let name = document.getElementById("name").value;
    
    if (name) {
        newClass.setName(name);
    } else {
        alert("Please enter class name");
    }    
}

function setAssignment() {
    let assessmentName = document.getElementById("assessment-name").value;
    let assessmentWeight = document.getElementById("assessment-weight").value;

    if (assessmentName) {
        if (assessmentWeight && numbersRegex.test(assessmentWeight)) {
            let assessment = new Assessment();
            assessment.setName(assessmentName);
            assessment.setWeight(assessmentWeight);

            newClass.addAssessment(assessment);

            console.log("success!")
            document.getElementById("assessment-name").value = "";
            document.getElementById("assessment-weight").value = "";
            //TODO add this to the GUI

        } else {
            alert("Please enter valid assessment weight (%)")
        }
    } else {
        alert("Please enter assessment name")
    }
}

function saveChanges() {
    chrome.storagte.sync.set({"classes" : classes});
    
    location.href = "../index.html";
}

function discardClass() {
    newClass = new Course();

    document.getElementById("name").value = "";
    document.getElementById("assessment-name").value = "";
    document.getElementById("assessment-weight").value = "";

    location.href = "../index.html";
}

document.getElementById("save-class-name").addEventListener("click", saveClassName, false);
document.getElementById("add-assessment").addEventListener("click", setAssignment, false);
document.getElementById("discard-changes").addEventListener("click", discardClass, false);
chrome.storage.sync.get(["classes"], function(result) {
    classes = result;
});