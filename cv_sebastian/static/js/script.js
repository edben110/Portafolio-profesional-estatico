const sections = document.querySelectorAll("section")

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("show")

}

})

})

sections.forEach(section => {

section.classList.add("hidden")

observer.observe(section)

})

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger')
const navLinks = document.querySelector('.nav-links')

hamburger.addEventListener('click', () => {
hamburger.classList.toggle('active')
navLinks.classList.toggle('active')
})

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
link.addEventListener('click', () => {
hamburger.classList.remove('active')
navLinks.classList.remove('active')
})
})