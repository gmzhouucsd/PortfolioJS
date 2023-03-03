window.addEventListener("DOMContentLoaded", () => {
    init()
})

const createButton = document.getElementsByTagName("button")[0];
const cancelButton = document.getElementsByTagName("button")[1];
const saveButton = document.getElementsByTagName("button")[2];
const cancelButton2 = document.getElementsByTagName("button")[3];
const confirmButton = document.getElementsByTagName("button")[4];
const cancelButton3 = document.getElementsByTagName("button")[5];
const saveButton2 = document.getElementsByTagName("button")[6];
const createDialog = document.getElementById("createDialog");
const editButton = document.getElementsByTagName("span")[0];
const deleteButton = document.getElementsByTagName("span")[1];
const confirmDialog = document.getElementById("confirmDialog");

let blogs = JSON.parse(localStorage.getItem("blog")) || [];
var i;

window.editBlog = editBlog;
window.deleteBlog = deleteBlog;

listBlogs();

function addBlog() {
    let title = document.getElementsByTagName("input")[0].value;
    let date = document.getElementsByTagName("input")[1].value;
    let summary = document.getElementsByTagName("input")[2].value;
    blogs.push({
        value: title,
        date: date,
        summary: summary
    });
    localStorage.setItem("blog", JSON.stringify(blogs));
    listBlogs();
}

function deleteBlog(index) {
    confirmDialog.showModal();
    i = index;
}

function editBlog(index) {
    editDialog.showModal();
    i = index;
    let blog = blogs[i];
    document.getElementsByTagName("input")[3].value = blog.value;
    document.getElementsByTagName("input")[4].value = blog.date;
    document.getElementsByTagName("input")[5].value = blog.summary;
}

function listBlogs() {
    let blog = "";
    for (let i = 0; i < blogs.length; i++) {
        blog += "<li>"
        blog += `${blogs[i].value} ${blogs[i].date} ${blogs[i].summary} `;
        blog += "<span onclick='editBlog(" + i + ")'>Edit </span>";
        blog += "<span onclick='deleteBlog(" + i + ")'>Delete</span></li>";
    }
    document.getElementById("blog").innerHTML = blog;
}

function init() {
    createButton.addEventListener("click", () => {
        createDialog.showModal();
    });
    cancelButton.addEventListener("click", () => {
        document.getElementsByTagName("input")[0].value = "";
        document.getElementsByTagName("input")[1].value = "";
        document.getElementsByTagName("input")[2].value = "";
        createDialog.close();
    });
    saveButton.addEventListener("click", () => {
        addBlog();
        document.getElementsByTagName("input")[0].value = "";
        document.getElementsByTagName("input")[1].value = "";
        document.getElementsByTagName("input")[2].value = "";
        createDialog.close();
    });

    confirmButton.addEventListener("click", () => {
        confirmDialog.close();
        blogs.splice(i, 1);
        localStorage.setItem("blog", JSON.stringify(blogs));
        listBlogs();
    })
    cancelButton2.addEventListener("click", () => {
        confirmDialog.close();
    })

    saveButton2.addEventListener("click", () => {
        let blog = blogs[i];
        blog.value = document.getElementsByTagName("input")[3].value;
        blog.date = document.getElementsByTagName("input")[4].value;
        blog.summary = document.getElementsByTagName("input")[5].value;
        editDialog.close();
        localStorage.setItem("blog", JSON.stringify(blogs));
        listBlogs()
    })

    cancelButton3.addEventListener("click", () => {
        editDialog.close();
    })
}
// export {showDialog, closeDialog, addBlog, editBlog, listBlogs};