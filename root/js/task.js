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

    getAssesssment(assessmentName) {
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

    getAssesssment(){
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

let task = Object.assign(new Task(), JSON.parse(sessionStorage.getItem('editTask')));
task.setDueDate(new Date(task.getDueDate()));
task.setReminderDate(new Date(task.getReminderDate()));
let classes = JSON.parse(sessionStorage.getItem('classes'));
let selectedClass;

function initializeGUI() {
    document.getElementById('subheading').textContent = "Task Name: " + task.getName();
    document.getElementById('due-date').textContent = "Due Date: " + task.getFormattedDueDate();
    document.getElementById('reminder-date').textContent = "Reminder Date: " + task.getFormattedReminderDate();


    document.getElementById('due-month').placeholder = task.getDueDate().getMonth();
    document.getElementById('due-day').placeholder = task.getDueDate().getDay();
    document.getElementById('due-year').placeholder = task.getDueDate().getFullYear();
    document.getElementById('due-hour').placeholder = task.getDueDate().getHours();
    document.getElementById('due-minute').placeholder = task.getDueDate().getMinutes();
    
    document.getElementById('reminder-month').placeholder = task.getReminderDate().getMonth();
    document.getElementById('reminder-day').placeholder = task.getReminderDate().getDay();
    document.getElementById('reminder-year').placeholder = task.getReminderDate().getFullYear();
    document.getElementById('reminder-hour').placeholder = task.getReminderDate().getHours();
    document.getElementById('reminder-minute').placeholder = task.getReminderDate().getMinutes();

    addClasses();
    initializeSubtasks();
}

function initializeSubtasks() {
    let table = document.getElementById('subtasks');

    for (let subtask in task.getSubtasks()) {
        console.log(subtask);
        subtask = Object.assign(new Task(), subtask);

        let newRow = table.rows[1].cloneNode(true);
        let div = document.createElement('div');
        let markAsComplete = document.createElement('button');
    
        markAsComplete.textContent = "Mark Complete";
        markAsComplete.setAttribute('style', 'background-color: #008ecf')
    
        markAsComplete.onclick = function() {
            newRow.setAttribute('style', 'display: none');
            document.getElementById('completed-message').setAttribute('style', 'display: grid');
    
            setTimeout(function () {
                document.getElementById('completed-message').setAttribute('style', 'display: none');
            }, 2500);
        }
    
        div.appendChild(markAsComplete);
    
    
        newRow.cells[0].innerHTML = subtask.getName();
        console.log(subtask);
        newRow.cells[1].appendChild(div);
        table.appendChild(newRow);

        document.getElementById('subtask-container').setAttribute('style', 'display: grid');
        document.getElementById('no-subtasks').setAttribute('style', 'display: none');
    }
}

function addSubtask(name) {
    let newSubTask = new Task(name, task.getAssesssment(), false, task.getDueDate(), task.getReminderDate());
    let table = document.getElementById('subtasks');
    let newRow = table.rows[1].cloneNode(true);
    let div = document.createElement('div');
    let markAsComplete = document.createElement('button');

    markAsComplete.textContent = "Mark Complete";
    markAsComplete.setAttribute('style', 'background-color: #008ecf')

    markAsComplete.onclick = function() {
        newRow.setAttribute('style', 'display: none');
        document.getElementById('completed-message').setAttribute('style', 'display: grid');

        setTimeout(function () {
            document.getElementById('completed-message').setAttribute('style', 'display: none');
        }, 2500);
    }

    div.appendChild(markAsComplete);

    newRow.cells[0].innerHTML = name;
    newRow.cells[1].appendChild(div);
    table.appendChild(newRow);
    task.addSubtask(newSubTask);
}

function addClasses() {

    let dropdown = document.getElementById('class-dropdown');

    for (let c in classes) {
        let button = document.createElement("button");
        button.type = "button";
        button.textContent = c;
        button.onclick = function () {
            selectedClass = Object.assign(new Course(), classes[c]);
            addAssessments();
        }
        dropdown.appendChild(button);
    }
}

function addAssessments() {
    let dropdown = document.getElementById('assessment-dropdown');
    const syll = selectedClass.getSyllabus();
    
    for (let c in syll) {
        let button = document.createElement("button");
        button.type = "button";
        button.textContent = c;
        button.onclick = function () {
            selectedClass = classes[c];
            task.setAssessment = syll[c];
        }
        dropdown.appendChild(button);
    }
}


function saveChanges() {
    let dueMonth = document.getElementById('due-month').value;
    let dueDay = document.getElementById('due-day').value;
    let dueYear = document.getElementById('due-year').value;
    let dueHour = document.getElementById('due-hour').value;
    let dueMinute = document.getElementById('due-minute').value;

    let reminderMonth = document.getElementById('reminder-month').value;
    let reminderDay = document.getElementById('reminder-day').value;
    let reminderYear = document.getElementById('reminder-year').value;
    let reminderHour = document.getElementById('reminder-hour').value;
    let reminderMinute = document.getElementById('reminder-minute').value;

    let taskName = document.getElementById('task-name').value;

    // Makes sure that all inputs are valid
    if (!testValidDateEntry(dueMonth, 1, 12)) {
        alert("Invalid Due Date Month");
    } else if (!testValidDateEntry(dueDay, 1, 31)) {
        alert("Invalid Due Date Day");
    } else if (!testValidDateEntry(dueYear, 2022, 3000)) {
        alert("Invalid Due Date Year");
    } else if (!testValidDateEntry(dueHour, 1, 12)) {
        alert("Invalid Due Date Hour");
    } else if (!testValidDateEntry(dueMinute, 0, 59)) {
        alert("Invalid Due Date Minute");
    } else if (!testValidDateEntry(reminderMonth, 1, 12)) {
        alert("Invalid Reminder Date Month");
    } else if (!testValidDateEntry(reminderDay, 1, 31)) {
        alert("Invalid Reminder Date Day");
    } else if (!testValidDateEntry(reminderYear, 2022, 3000)) {
        alert("Invalid Reminder Date Year");
    } else if (!testValidDateEntry(reminderHour, 1, 12)) {
        alert("Invalid Reminder Date Hour");
    } else if (!testValidDateEntry(reminderMinute, 0, 59)) {
        alert("Invalid Reminder Date Minute");
    } else {
        dueMonth = parseInt(dueMonth);
        dueDay = parseInt(dueDay);
        reminderMonth = parseInt(reminderMonth);
        reminderDay = parseInt(reminderDay);

        //makes sure that the day is valid given the month
        if ((dueMonth == 4 || dueMonth == 6 || dueMonth == 9 || dueMonth == 11) && dueDay > 30) {
            alert("Invalid Due Date Day");

            //I am not going to bother with leap years
        } else if (dueMonth == 2 && dueDay > 28) {
            alert("Invalid Due Date Day");
        } else if ((reminderMonth == 4 || reminderMonth == 6 || reminderMonth == 9 || reminderMonth == 11) && reminderDay > 30) {
            alert("Invalid Due Date Day");
        } else if (reminderMonth == 2 && reminderDay > 28) {
            alert("Invalid Due Date Day");
        } else {
            dueYear = parseInt(dueYear);
            dueHour = parseInt(dueHour);
            dueMinute = parseInt(dueMinute);

            reminderYear = parseInt(reminderYear);
            reminderHour = parseInt(reminderHour);
            reminderMinute = parseInt(reminderMinute);

            let newDueDate = dueAm ? new Date(dueYear, dueMonth, dueDay, dueHour, dueMinute) : new Date(dueYear, dueMonth, dueDay, dueHour + 12, dueMinute);
            let newReminderDate = reminderAm ? new Date(reminderYear, reminderMonth, reminderDay, reminderHour, reminderMinute) : new Date(reminderYear, reminderMonth, reminderDay, reminderHour + 12, reminderMinute); 
            
            task.setDueDate(newDueDate);
            task.setReminderDate(newReminderDate);
            
            if (taskName) {
                task.setName(taskName);
            }

            makeTask.calculatePriority();

            sessionStorage.setItem('updatedTask', JSON.stringify(makeTask));
            sessionStorage.setItem('updatedTasks', true);
            location.href = "../index.html";
        }
    }
}

document.getElementById('adder').addEventListener("click", function() {
    let name = document.getElementById('subtask-name').value;
    if (name) {
        addSubtask(name);
        document.getElementById('subtask-name').value = "";
        document.getElementById('subtask-fields').setAttribute('style', 'display: none');
        document.getElementById('subtask-container').setAttribute('style', 'display: grid');
        document.getElementById('no-subtasks').setAttribute('style', 'display: none');
    } else {
        alert("Invalid Subtask Name");
    }
}, false);

document.getElementById('add-subtask').addEventListener("click", function() {
    document.getElementById('subtask-fields').setAttribute('style', 'display: grid');
}, false);

document.getElementById('discard').addEventListener("click", function() {
    sessionStorage.setItem('updatedTasks', false);
    location.href = "../index.html";
}, false);

initializeGUI();
