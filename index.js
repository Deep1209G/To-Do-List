async function addTask(){
    let input = document.getElementById("task");
    let task = input.value;

    if (task === "") return;

    // 🔥 send to backend (DATABASE)
    await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: task })
    });

    // UI same as before 👇
    let li = document.createElement("li");
    li.innerText = task;

    let btn = document.createElement("button");
    btn.innerText = "delete";

    btn.onclick = async function() {
        li.remove(); // UI remove

        // ❗ Note: DB delete not handled here yet
    };

    li.appendChild(btn);
    document.getElementById("list").appendChild(li);

    input.value = "";
}