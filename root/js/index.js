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
        this._priority = 1 / difference;
    }
}

class PriorityQueue {
    _values;

    constructor() {
        this._values = [];
    }

    setQueue(queue) {
        this._values = queue;
    }

    getQueue() {
        return this._values;
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
          if(leftChild.getPriority() < element.getPriority()) {
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
        this._values[index] = this._values[swap];
        this._values[swap] = element;
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

//End of Classes

// Global Variables
let pq;
let classes;
const TASKS_TO_SHOW = 5; //only show the 5 Tasks with the most priority


//Code that runs everything

function initialize() {
    pq = new PriorityQueue();

    chrome.storage.sync.get(['queue'], function(result) {
        if (result) {
            pq.setQueue(JSON.parse(result));
            initializeTasks();
        }
    });

}

function initializeTasks() {
    let hasNewTask = sessionStorage.getItem('hasNewTask');

    if (hasNewTask) {
        let tempQueue = new PriorityQueue();
        let tempArray = [];
        let oldArray = pq.getQueue();
        let count = 0;
        let table = document.getElementById('upcoming-tasks');

        if (hasNewTask == "true") {
            let newTask = JSON.parse(sessionStorage.getItem('newTask'));
            pq.enqueue(newTask);
        }
        
        for (let i = 0; i < oldArray.length; i++) {
            tempArray[i] = oldArray[i];
        }

        tempQueue.setQueue(tempArray);

        while (!tempQueue.isEmpty() && count < TASKS_TO_SHOW) {
            let tempTask = tempQueue.dequeue();
            let newRow = table.rows[1].cloneNode(true);
            let div  = document.createElement('div');
            let markAsComplete = document.createElement('button');
            let edit = document.createElement('button');

            markAsComplete.textContent = "Mark Complete";
            markAsComplete.setAttribute('style', 'background-color: #008ecf')

            markAsComplete.onclick = function() {
            newRow.setAttribute('style', 'display: none');
            document.getElementById('completed-message').setAttribute('style', 'display: grid');

            setTimeout(function () {
                document.getElementById('completed-message').setAttribute('style', 'display: none');
            }, 2500);
            }

            edit.textContent = "Edit Task";
            edit.setAttribute('style', 'background-color:#282b30');

            edit.onclick = function() {
            sessionStorage.setItem('editTask', JSON.stringify(tempTask));
            location.href = 'pages/task.html';
            }

            div.appendChild(markAsComplete);
            div.appendChild(edit);

            newRow.cells[0].innerHTML = tempTask.getClass().getName();
            newRow.cells[1].innerHTML = tempTask.getName();
            newRow.cells[2].innerHTML = tempTask.getFormattedDueDate();
            newRow.cells[3].appendChild(div);
    
            table.appendChild(newRow);

        }         
    }
}

/**
 * Loads all the classes, reinitializes them as class objects, if there are none then classes is an empty map
 */
function tempInitializeClasses() {
    classes = localStorage.getItem("classes");
    
    if (classes) {
        classes = JSON.parse(classes);
        
        //reinitializes the course as a course object
        for (let key in classes) {
            classes[key] = Object.assign(new Course(), classes[key]);
            let syllabus = classes[key].getSyllabus();

            //makes nested Assessment objects in syllabus Assessment objects 
            for (let a in syllabus) {
                syllabus[a] = Object.assign(new Assessment(), syllabus[a]);
            }
        }
    } else {
        classes = {};
    }
}


/**
 * Loads all saved tasks, reinitializes them as task objects, if there are none then priority queue is empty
 */
function tempInitializeTasks() {
    let tempArray = localStorage.getItem('queue');
    let sesh = sessionStorage.getItem('hasNewTask')
    pq = new PriorityQueue();

    if (tempArray) {
        tempArray = JSON.parse(tempArray);

        // reinitialize all as a Task object
        for (let i = 0; i < tempArray.length; i++) {
            tempArray[i] = Object.assign(new Task(), tempArray[i]);
            tempArray[i].setAssessment(Object.assign(new Assessment(), tempArray[i].getAssessment()));
            tempArray[i].setDueDate(new Date(tempArray[i].getDueDate()));
            tempArray[i].setReminderDate(new Date(tempArray[i].getReminderDate()));
        }

        pq.setQueue(tempArray);
    }

    //checks if a new task was added, if it was then add it to the priority queue.
    if (sesh && sesh == "true") {
        let newTask = Object.assign(new Task(), JSON.parse(sessionStorage.getItem("newTask")));
        pq.enqueue(newTask);
        sessionStorage.setItem('hasNewTask', "false");
    }

}


function tempInitialize() {
    tempInitializeClasses();
    tempInitializeTasks();

    let table = document.getElementById('upcoming');
    let count = 0;
    let tempQueue = new PriorityQueue();
    let tempArray = [];
    const priorityArray = pq.getQueue();

    //create copy of array (needs to be a separate object)
    for (let i = 0; i < priorityArray.length; i++) {
        tempArray[i] = priorityArray[i];
        tempArray[i] = Object.assign(new Task(), tempArray[i]);
        tempArray[i].setAssessment(Object.assign(new Assessment(), tempArray[i].getAssessment()));
        tempArray[i].setDueDate(new Date(tempArray[i].getDueDate()));
        tempArray[i].setReminderDate(new Date(tempArray[i].getReminderDate()));
    }
    
    //we will use this queue to get the top 5 Priority items.
    tempQueue.setQueue(tempArray);

    while (!tempQueue.isEmpty() && count < TASKS_TO_SHOW) {
        count++;

        let tempTask = tempQueue.dequeue();
        let newRow = table.rows[1].cloneNode(true);
        let div  = document.createElement('div');
        let markAsComplete = document.createElement('button');
        let edit = document.createElement('button');

        markAsComplete.textContent = "Mark Complete";
        markAsComplete.setAttribute('style', 'background-color: #008ecf')

        markAsComplete.onclick = function() {
            newRow.setAttribute('style', 'display: none');
            document.getElementById('completed-message').setAttribute('style', 'display: grid');

            setTimeout(function () {
                document.getElementById('completed-message').setAttribute('style', 'display: none');
            }, 2500);
        }

        edit.textContent = "Edit Task";
        edit.setAttribute('style', 'background-color:#282b30');

        edit.onclick = function() {
            sessionStorage.setItem('editTask', JSON.stringify(tempTask));
            sessionStorage.setItem('classes', JSON.stringify(classes));
            location.href = 'pages/task.html';
        }

        div.appendChild(markAsComplete);
        div.appendChild(edit);

        console.log(tempTask);

        newRow.cells[0].innerHTML = tempTask._assessment._class;
        newRow.cells[1].innerHTML = tempTask.getName();
        newRow.cells[2].innerHTML = tempTask.getFormattedDueDate();
        newRow.cells[3].appendChild(div);
    
        table.appendChild(newRow);
    }

    if (Object.keys(classes).length) {
        localStorage.setItem("classes", JSON.stringify(classes));
    }

    if (pq.getQueue()) {
        localStorage.setItem("queue", JSON.stringify(pq.getQueue()));
    }

}


// initialize();
tempInitialize();