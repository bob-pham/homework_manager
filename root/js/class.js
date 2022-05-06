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
        this._grades = {};
        this._name = "no name";
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
        return this._syllabus;
    }

    addAssessment(assessment) {
        this._syllabus[assessment.getName()] = assessment;
    }

    getAssessment(assessmentName) {
        return this._syllabus[assessmentName];
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
    _class; // parent course, is a string to avoid ciruclar references, gets the class from a global map of classes instead

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
        this.grades.push(grade);
        temp = 0;
        
        for (let marks in grades) {
            temp += marks;
        }

        grades = temp / this.grades.length;
    }

}

class Task {
    _name; // name of the task
    _grade; // current task grade
    _assessment; // assessment that the task belongs to
    _completed; // true if the assessment has been completed
    _subtasks; // array that contains a list of subtasks
    _reminderDate; // the date of the reminder
    _dueDate; // the due date of the reminder
    _forMarks; // true if the assignment is the task is being graded
    _priority; // the priority value of the task


    constructor(name, assessment, forMarks, dueDate, reminderDate) {
        this._name = name;
        this._assessment = assessment;
        this._completed = false;
        this._grade = 100;
        this._subtasks = [];
        this._forMarks = forMarks;
        this._dueDate = dueDate;
        this._reminderDate = reminderDate;
    }

    setName(name){
        this._name = name;
    }

    setGrade(grade){
        this._grade = grade;
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

    setDueDate(date) {
        this._dueDate = date;
    }

    setReminderDate(date) {
        this._reminderDate = date;
    }

    getName(){
        return this._name;     
    }

    getGrade(){
        return this._grade;     
    }

    getAssessment(){
        return this._assessment;
    }

    getSubtasks(){
        return this._subtasks;   
    }

    getPriority() {
        return this._priority;
    }

    getDueDate() {
        return this._dueDate;
    }

    getReminderDate() {
        return this._reminderDate;
    }

    getFormattedDueDate() {
        return this._dueDate.getFullYear() + "-" + this._dueDate.getMonth() + 1 + "-" + this._dueDate.getDate() + " " + this._dueDate.getHours() + ":" + this._dueDate.getMinutes();
    }

    getFormattedReminderDate() {
        return this._reminderDate.getFullYear() + "-" + this._reminderDate.getMonth() + 1 + "-" + this._reminderDate.getDate() + " " + this._reminderDate.getHours() + ":" + this._reminderDate.getMinutes();
    }
    
    /**
     * 
     * marks the task and all of its children as complete.
     * 
     */
    markComplete() {
        for (let child in children) {
            child.markComplete();
        }
        this._completed = true;

        if (forMarks) {
            this._assessment.calculateGrade(this._grade);
        }
    }

    addGrade(grade) {
        this._grade = grade;
    }

    addChildGrade(grade) {
        this._grade += grade / this._subtasks.length;
    }

    addSubtask(subtask) {
        this._subtasks.push(subtask);
    }

    /**
     * Calculates priority using the product of the assignment weight and the time until due date
     */
    calculatePriority() {
        const currentDate = new Date();
        let difference = (currentDate.getTime() - this._dueDate.getTime()) / (1000 * 60 * 60 * 24);
        difference *= this._assessment.getWeight();
        this._priority = difference;
    }
}


// Functions that run the page

// Global Variables
let classes = JSON.parse(sessionStorage.getItem('classes'));
let queue = JSON.parse(sessionStorage.getItem('priorityqueue'));
let selectedClass;
let currentWeight = 0;

function addClasses() {

    let dropdown = document.getElementById('class-dropdown');

    console.log(classes);

    for (let c in classes) {
        let button = document.createElement("button");
        button.type = "button";
        button.textContent = c;
        button.onclick = function () {
            const sheading = document.getElementById('subheading');
            sheading.textContent = "Class: " + c;
            sheading.setAttribute('style', 'display: grid; color: green');
            selectedClass = Object.assign(new Course(), classes[c]);
            loadClassDetails();
        }
        dropdown.appendChild(button);
    }
}

function loadClassDetails() {
    let syllabus = selectedClass.getSyllabus();
    let table = document.getElementById('syllabus-table');
    let taskTable = document.getElementById('task-table')

    for (let key in syllabus) {
        let newRow = table.rows[1].cloneNode(true);
        syllabus[key] = Object.assign(new Assessment(), syllabus[key]);

        newRow.cells[0].innerHTML = key;
        newRow.cells[1].innerHTML = syllabus[key].getWeight();
        currentWeight += syllabus[key].getWeight();

        table.appendChild(newRow);
    }

    for (let i = 0; i < queue.length; i++) {
        let newRow = taskTable.rows[1].cloneNode(true);
        let item = Object.assign(new Task(), queue[i]);
        item.setDueDate(new Date(item.getDueDate()));

        console.log(item);

        newRow.cells[0].innerHTML = item.getName();
        newRow.cells[1].innerHTML = item.getFormattedDueDate();

        taskTable.appendChild(newRow);
    }

    document.getElementById('class-details').setAttribute('style', 'display:grid');
}

function saveNewAssessment() {
    let assessmentName = document.getElementById("new-ass-name").value;
    const numbersRegex = /^\d+$/;

    if (assessmentName) {
        let assessmentWeight = document.getElementById("new-ass-weight").value;
        if (assessmentWeight && numbersRegex.test(assessmentWeight)) {
            assessmentWeight = parseInt(assessmentWeight);
            if (assessmentWeight + currentWeight > 100) {
                alert("Please enter valid assessment weight (too high!)");
            } else {
                let assessment = new Assessment();
                assessment.setName(assessmentName);
                assessment.setWeight(assessmentWeight);

                selectedClass.addAssessment(assessment);
                currentWeight += assessmentWeight;

                document.getElementById("new-ass-name").value = "";
                document.getElementById("new-ass-weight").value = "";

                let table = document.getElementById('syllabus-table');
                let newRow = table.rows[1].cloneNode(true);
        
                newRow.cells[0].innerHTML = assessmentName;
                newRow.cells[1].innerHTML = assessmentWeight;
        
                table.appendChild(newRow);

                document.getElementById('edit-assessment-container').setAttribute('style', 'display: none');
            }
        } else {
            alert("Please enter valid assessment weight (%)")
        }
    } else {
        alert("Please enter assessment name")
    }

}


function saveAndExit() {

    // chrome.storage.sync.set({classes : JSON.stringify(classes)}, function() {
    //     location.href = "../index";
    // });

    location.href = "../index.html";

}


function initialize() {
    chrome.storage.sync.get()
}


function tempInitialize() {
    addClasses();
}

document.getElementById('add-assessment').addEventListener("click", function() {
    document.getElementById('edit-assessment-container').setAttribute('style', 'display: grid');
}, false);

document.getElementById('save-new-assessment').addEventListener("click", saveNewAssessment, false);
document.getElementById('discard-new-assessment').addEventListener("click", function() {
    document.getElementById("new-ass-name").value = "";
    document.getElementById("new-ass-weight").value = "";
    document.getElementById('edit-assessment-container').setAttribute('style', 'display: none');
}, false);

document.getElementById('exit').addEventListener("click", saveAndExit, false);

tempInitialize();
// initialize();

