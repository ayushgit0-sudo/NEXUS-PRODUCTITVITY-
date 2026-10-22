// ==========================================
// NEXUS COMMAND CENTER
// ==========================================


// ==========================================
// DATE
// ==========================================

const dateElement = document.getElementById("date");

const today = new Date();

dateElement.textContent = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long"
});


// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

function showSection(section, button) {

    // Remove active from every sidebar button
    document.querySelectorAll(".nav-item").forEach(item => {

        item.classList.remove("active");

    });


    // Add active to clicked button
    button.classList.add("active");


    // Find destination
    let destination = null;


    if (section === "dashboard") {

        destination = document.getElementById("dashboard");

    }


    if (section === "tasks") {

        destination = document.getElementById("tasks");

    }


    if (section === "focus") {

        destination = document.getElementById("focus");

    }


    if (section === "performance") {

        destination = document.getElementById("performance");

    }


    // Smooth scroll
    if (destination) {

        destination.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// ==========================================
// TASK SYSTEM
// ==========================================

let tasks =
    JSON.parse(localStorage.getItem("nexusTasks")) || [];


const taskInput =
    document.getElementById("taskInput");


const taskList =
    document.getElementById("taskList");


function saveTasks() {

    localStorage.setItem(
        "nexusTasks",
        JSON.stringify(tasks)
    );

}


function renderTasks() {

    taskList.innerHTML = "";


    tasks.forEach((task, index) => {

        const taskElement =
            document.createElement("div");


        taskElement.className = "task";


        if (task.completed) {

            taskElement.classList.add("completed");

        }


        taskElement.innerHTML = `

            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="completeTask(${index})"
                >

                <span>
                    ${task.text}
                </span>

            </div>


            <button
                class="delete-task"
                onclick="deleteTask(${index})">

                ×

            </button>

        `;


        taskList.appendChild(taskElement);

    });


    updateStats();

}


function addTask() {

    const text =
        taskInput.value.trim();


    if (text === "") {

        return;

    }


    tasks.push({

        text: text,

        completed: false

    });


    taskInput.value = "";


    saveTasks();

    renderTasks();

}


function completeTask(index) {

    tasks[index].completed =
        !tasks[index].completed;


    saveTasks();

    renderTasks();

}


function deleteTask(index) {

    tasks.splice(index, 1);


    saveTasks();

    renderTasks();

}


// ==========================================
// ENTER KEY FOR TASK
// ==========================================

taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// ==========================================
// PRODUCTIVITY
// ==========================================

function updateStats() {

    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const total =
        tasks.length;


    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );

    }


    // Dashboard
    document.getElementById(
        "productivity"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "taskCount"
    ).textContent =
        completed;


    // Performance section
    document.getElementById(
        "performancePercentage"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "completedTasks"
    ).textContent =
        completed;


    document.getElementById(
        "totalTasks"
    ).textContent =
        total;


    document.getElementById(
        "progressBar"
    ).style.width =
        percentage + "%";

}


renderTasks();


// ==========================================
// ENERGY SYSTEM
// ==========================================

const energySlider =
    document.getElementById(
        "energySlider"
    );


const energyValue =
    document.getElementById(
        "energyValue"
    );


const energyMessage =
    document.getElementById(
        "energyMessage"
    );


energySlider.addEventListener(
    "input",
    function() {

        const value =
            this.value;


        energyValue.textContent =
            value;


        if (value < 30) {

            energyMessage.textContent =
                "Energy is low. Take a break and recover.";

        }

        else if (value < 60) {

            energyMessage.textContent =
                "Moderate energy. Start with smaller tasks.";

        }

        else if (value < 85) {

            energyMessage.textContent =
                "You're ready for deep work.";

        }

        else {

            energyMessage.textContent =
                "Peak energy. Attack your hardest task.";

        }

    }
);


// ==========================================
// FOCUS TIMER
// ==========================================

let timeLeft = 25 * 60;

let timerInterval = null;


const timerElement =
    document.getElementById("timer");


const focusDisplay =
    document.getElementById(
        "focusDisplay"
    );


function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);


    const seconds =
        timeLeft % 60;


    const formatted =

        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(seconds).padStart(2, "0");


    timerElement.textContent =
        formatted;


    focusDisplay.textContent =
        formatted;

}


function startTimer() {

    if (timerInterval !== null) {

        return;

    }


    timerInterval =
        setInterval(() => {

            if (timeLeft > 0) {

                timeLeft--;

                updateTimer();

            }

            else {

                clearInterval(
                    timerInterval
                );

                timerInterval = null;


                alert(
                    "Focus session complete. Excellent work!"
                );

            }

        }, 1000);

}


function pauseTimer() {

    clearInterval(
        timerInterval
    );


    timerInterval = null;

}


function resetTimer() {

    clearInterval(
        timerInterval
    );


    timerInterval = null;


    timeLeft =
        25 * 60;


    updateTimer();

}


updateTimer();


// ==========================================
// NOTES
// ==========================================

const notes =
    document.getElementById("notes");


notes.value =
    localStorage.getItem(
        "nexusNotes"
    ) || "";


function saveNotes() {

    localStorage.setItem(
        "nexusNotes",
        notes.value
    );


    const message =
        document.getElementById(
            "savedMessage"
        );


    message.textContent =
        "Note saved successfully.";


    setTimeout(() => {

        message.textContent = "";

    }, 2000);

}