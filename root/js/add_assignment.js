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

    setParent(parent) {
        this._parentTask = parent;
    }

    addSubtask(subtask) {
        subtasks.setParent(this);
        this._subtasks.append(subtask);
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
