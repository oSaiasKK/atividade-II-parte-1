// Seleciona elementos do DOM
const app = document.querySelector('#app')
const input = app.querySelector('#task-input')
const addButton = app.querySelector('#add-button')
const list = app.querySelector('#list')
const itemTemplate = list.querySelector('template')

// Salva tarefas no armazenamento local
function saveToLocalStorage() {
  const tasks = []

  list.querySelectorAll('li').forEach(li => {
    const title = li.querySelector('.title').textContent
    tasks.push(title)
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Carrega tarefas do armazenamento local e adiciona à lista
function loadFromLocalStorage() {
  const tasks = JSON.parse(
    localStorage.getItem('tasks') || '[]'
  )

  tasks.forEach(title => {
    const task = createDomTask(title)
    list.appendChild(task)
  })
}

// Cria um elemento do DOM para uma tarefa
function createDomTask(title) {
  const task = itemTemplate.content.cloneNode(true)

  task.querySelector('.title').textContent = title

  task.querySelector('.bt-delete')
    .addEventListener('click', (e) => {

      e.target.closest('li').remove()

      saveToLocalStorage()
    })

  return task
}

// Cria uma nova tarefa e adiciona à lista
function createNewTask() {
  const title = input.value.trim()

  if (!title) return

  const task = createDomTask(title)

  list.appendChild(task)

  input.value = ''

  saveToLocalStorage()
}

// Ouvintes de eventos
addButton.addEventListener(
  'click',
  createNewTask
)

input.addEventListener('keypress', (e) =>
  (e.key === 'Enter'
    ? createNewTask()
    : null)
)

// Carrega tarefas do armazenamento local ao carregar a página
loadFromLocalStorage()