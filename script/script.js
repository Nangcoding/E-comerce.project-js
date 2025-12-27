const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


// === Registration Modal JS ===
const modal = document.getElementById("registerModal");
const openBtn = document.getElementById("openRegister");
const closeBtn = modal.querySelector(".close");

openBtn.onclick = () => { modal.style.display = "block"; }
closeBtn.onclick = () => { modal.style.display = "none"; }
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }