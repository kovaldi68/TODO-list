const body = document.querySelector('body');
const themeToggle = document.querySelector('.theme-toggle');
const taskInput = document.querySelector('.new-task__input');
const tasksList = document.querySelector('.tasks__list');
const taskTemplate = document.querySelector('#task-template').content.querySelector('.tasks__item');
const clearCompletedButton = document.querySelector('.clear-button');

const ERROR_SHOW_TIME = 700;

const createTaskElement = (task) => {
    const clonedTask = taskTemplate.cloneNode(true);
    const newTaskCheckbox = clonedTask.querySelector('.checkbox');

    clonedTask.querySelector('.tasks__text').textContent = task.value;

    if (task.classList.contains('new-task__input--completed')) {
        clonedTask.classList.add('tasks__item--completed');
        clonedTask.classList.remove('tasks__item--active');
        newTaskCheckbox.checked = 'true';
    }

    return clonedTask;
}

const clearCompletedTasks = () => {
    const taskItems = document.querySelectorAll('.tasks__item');
    
    clearCompletedButton.addEventListener('click', () => {
        taskItems.forEach(element => {
            if (element.classList.contains('tasks__item--completed')) {
                element.remove();
            }
        });
    });
}

const themeToggleHandler = () => {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('page__body--dark-theme');
    })
}

const message = () => {
    const alert = document.createElement('p');

    alert.textContent = 'Самое время добавить задачу в список'
    alert.classList.add('tasks__alert');

    if (tasksList.children.length == 0) {
        tasksList.appendChild(alert);
    }
}

const deleteMessage = () => {
    const message = document.querySelector('.tasks__alarm');
    
    if (message) {
        message.remove();
    }
}

const onCloseButtonHandler = () => {
    const closeButtons = document.querySelectorAll('.close-button');

    closeButtons.forEach(element => {
        element.addEventListener('click', () => {
            const item = element.closest('li');
            item.remove();
            message();
        })
    });
}

const filterTasks = () => {
    const taskItems = document.querySelectorAll('.tasks__item');
    const filters = document.querySelectorAll('.filter');
    const filterOptions = document.querySelectorAll('.filter__item');

    filters.forEach(element => {
        element.addEventListener('click', event => {
            if (event.target.tagName !== 'LI') return false;

            const filterClass = event.target.textContent.toLowerCase();

            filterOptions.forEach(elem => {
                elem.classList.remove('filter__item--active');
            });
            
            event.target.classList.add('filter__item--active');

            taskItems.forEach(elem => {
                let itemClass = elem.classList.value;
                elem.classList.remove('visually-hidden');
                if (!itemClass.includes(filterClass) && filterClass != 'all') {
                    elem.classList.add('visually-hidden');
                }
            })
        });
    })
}

const onEnterHandler = (evt) => {
    if (evt.key === 'Enter') {
        if (taskInput.value == '') {
            showError();
        } else {
            tasksList.append(createTaskElement(taskInput));
            taskInput.value = '';
            taskInput.style.textDecorationLine = 'none';
            taskInput.style.color = '#9495a5';
            document.removeEventListener('keydown', onEnterHandler);
            onCloseButtonHandler();
            themeToggleHandler();
            completedTasks();
            clearCompletedTasks();
            filterTasks();
            deleteMessage();
        }
    }
}

const completedTasks = () => {
    const checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach(element => {
        element.addEventListener('click', () => {
            const taskItem = element.closest('li');
            const taskInput = element.nextElementSibling;
            
            if(taskItem) {
                if (element.checked) {
                    taskItem.classList.add('tasks__item--completed');
                    taskItem.classList.remove('tasks__item--active');                
                } else {
                    taskItem.classList.remove('tasks__item--completed');
                    taskItem.classList.add('tasks__item--active');
                }
            } else {
                if (element.checked) {
                    taskInput.classList.add('new-task__input--completed');
                    taskInput.classList.remove('tasks__item--active');            
                } else {
                    taskInput.classList.remove('new-task__input--completed');
                    taskInput.classList.add('tasks__item--active');
                }
            }
        })
    });
}

const showError = () => {
    const errorContainer = document.createElement('div');
    errorContainer.style.zIndex = 100;
    errorContainer.style.position = 'absolute';
    errorContainer.style.left = 0;
    errorContainer.style.top = 0;
    errorContainer.style.right = 0;
    errorContainer.style.color = '#3a7cfd';
    errorContainer.style.padding = '10px 10px';
    errorContainer.style.fontSize = '15px';
    errorContainer.style.textAlign = 'center';
    errorContainer.style.backgroundColor = 'white';
  
    errorContainer.textContent = 'Введите текст задачи';
  
    document.body.append(errorContainer);
  
    setTimeout(() => {
      errorContainer.remove();
    }, ERROR_SHOW_TIME);
}


filterTasks();
clearCompletedTasks();
themeToggleHandler();
completedTasks();
onCloseButtonHandler();
taskInput.addEventListener('keydown', onEnterHandler);