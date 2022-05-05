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
        this._syllabus.push(assessment);
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

    // getName() {
    //    return this._name;
    // }

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
    _parentTask; // parent task
    _subtasks; // array that contains a list of subtasks
    _reminderDate; // the date of the reminder
    _dueDate; // the due date of the reminder
    _forMarks; // true if the assignment is the task is being graded
    _priority; // the priority value of the task


    constructor(name, course, assessment, forMarks) {
        this._name = name;
        this._class = course;
        this._assessment = assessment;
        this._completed = false;
        this._grade = 100;
        this._parentTask = null;
        this._subtasks = [];
        this._forMarks = forMarks;
    }

    setName(name){
        this._name = name;
    }

    setGrade(grade){
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

    // getName(){
    //     return this._name;     
    // }

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

    getPriority() {
        return this._priority;
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
        if (this._parentTask) {
            this._parentTask.addChildGrade(grade);
        }
        this._grade = grade;
    }

    addChildGrade(grade) {
        this._grade += grade / this._subtasks.length;
    }

    set Parent(parent) {
        this._parentTask = parent;
    }

    addSubtask(subtask) {
        subtasks.setParent(this);
        this._subtasks.push(subtask);
    }
}

class PriorityQueue {
    _values;

    constructor() {
        this._values = [];
    }

    
 dequeue() {
    // store the root node to return at end
    const min = this._values[0];
    // pop the last node in array and set as the new head
    const end = this._values.pop();
    if(this._values.length > 0) {
      this._values[0] = end;
      
      // store variables we will use to check
      let index = 0;
      const length = this._values.length;
      const element = this._values[0];
      
      while(true) {
        let leftIndex = 2 * index + 1;
        let rightIndex = 2 * index + 2;
        let leftChild, rightChild;
        let swap = null;

        // check if there is a left child
        if(leftIndex < length) {
          leftChild = this._values[leftIndex];
          // compare the priority level of the left child
          if(leftChild.getPriority() < element._getPriority()) {
            swap = leftIndex;
          }
        }
        
        // check if there is a right child
        if(rightIndex < length) {
          rightChild = this._values[rightIndex];
          // compare the priority level of the right child
          if((swap === null && rightChild.getPriority() < element.getPriority()) || (swap !== null && rightChild.getPriority() < leftChild.getPriority())) {
            swap = rightIndex;
          }
        }
        
        // if no swaps were done, we will break out of the while loop
        if(swap === null) break;
        this.values[index] = this.values[swap];
        this.values[swap] = element;
        index = swap;
      }
    }
    return min;
  }
  
   enqueue(node) {
    // push the new node into the values array
    this._values.push(node);

    // store the index and the node of the new node
    let index = this._values.length - 1;
    const element = this._values[index];
    
    // initialize a while loop to run while inserted node is not at the root
    while(index > 0) {
      // store the index and node of the parent
      let parentIndex = Math.floor((index - 1) / 2);
      const parent = this._values[parentIndex];
      
      // compare the priority of the inserted and parent
      if(element.getPriority() >= parent.getPriority()) break;
      this._values[parentIndex] = element;
      this._values[index] = parent;
      index = parentIndex;
    }
    return this._values;
  }

  isEmpty() {
      return this._values.length == 0;
  }

} 

let currentAssessment;
let classes = {};
let classNames = [];
const numbersRegex = /^\d+$/;

let selectedClass;

let temp = ["CPSC 213", "CPSC 210", "CPSC 221", "CPSC 110"];


function addClass() {

    let dropdown = document.getElementById('class-dropdown');

    for (let i = 0; i < classNames.length; i++) {
        let button = document.createElement("button");
        button.type = "button";
        button.textContent = classNames[i];
        button.onclick = function() {
            selectedClass = classes[classNames[i]];
            document.getElementById('assessments').setAttribute('style', 'display: inline');
            document.getElementById('class-name').textContent = "Class: " + classNames[i];
            document.getElementById('class-name').setAttribute('style', 'display: inline');
            chooseAssessment();
        }

        dropdown.appendChild(button);
    }
}


/**
 * Based on selected classes will add the buttons for different asssessments found in the class
 */
function chooseAssessment() {
    let dropdown = document.getElementById('assessment-dropdown');
    let syllabus = selectedClass.getSyllabus();

    for (let key in syllabus) {
        let button = document.createElement("button");
        button.type = "button";
        button.textContent = key;
        button.onclick = function() {
            document.getElementById('due-date-selection').setAttribute('style', 'display: grid');
            document.getElementById('reminder-date-selection').setAttribute('style', 'display: grid');
            document.getElementById('assessment-name').textContent = "Assessment: " + key + "   : Weight: " + syllabus[key];
            document.getElementById('assessment-name').setAttribute('style', 'display: grid');
        }

        dropdown.appendChild(button);
    }
}

function insertAssessment() {
    let assessmentName = document.getElementById("new-ass-name").value;
    
    if (assessmentName) {
        let assessmentWeight = document.getElementById("assessment-weight").value;
        if (assessmentWeight && numbersRegex.test(assessmentWeight)) {
            assessmentWeight = parseInt(assessmentWeight);
            if (assessmentWeight > 100) {
                alert("Please enter valid assessment weight (too high!)");
            } else {
                currentWeight += assessmentWeight;
                let assessment = new Assessment();
                assessment.setName(assessmentName);
                assessment.setWeight(assessmentWeight);
    
                selectedClass.addAssessment(assessment);
    
                document.getElementById("new-ass-name").value = "";
                document.getElementById("new-ass-weight").value = "";
                
                document.getElementById('create_ass_form').setAttribute('style', 'display: none');
            }
        } else {
            alert("Please enter valid assessment weight (%)")
        }
    } else {
        alert("Please enter assessment name")
    }
}


function initializeClasses() {
    //currently temporary since no memory
    for (let i = 0; i < temp.length; i++) {
        let item = new Course();
        item.setName(temp[i]);
        let tempMap = {ahhh: "ahhhh"};
        item._syllabus = tempMap;
        classes[temp[i]] = item;
        classNames.push(temp[i]); 
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
    if (!taskName) {
        alert("Please Enter Task Name");
    } else if (!testValidDateEntry(dueMonth, 1, 12)) {
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

            
        }
    }
}

function testValidDateEntry(entry, boundlower, boundupper) {
    return entry && numbersRegex.test(entry) && parseInt(entry) >= boundlower && parseInt(entry) <= boundupper;
}


initializeClasses();
addClass();

document.getElementById('add-new-assessment').addEventListener("click", function() {
    document.getElementById('create_ass_form').setAttribute('style', 'display: block');
}, false);

document.getElementById('save-new-assessment').addEventListener("click", insertAssessment, false);

document.getElementById('discard-new-assessment').addEventListener("click", function() {
    document.getElementById("new-ass-name").value = "";
    document.getElementById("new-ass-weight").value = "";
    document.getElementById('create_ass_form').setAttribute('style', 'display: none');
}, false);

document.getElementById('discard').addEventListener("click", function() {
    location.href = "../index.html";
}, false);