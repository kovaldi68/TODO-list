const body = document.querySelector('body');
const themeToggle = document.querySelector('.theme-toggle');
const taskInput = document.querySelector('.new-task__input');
const tasksList = document.querySelector('.tasks__list');
const filterOptions = document.querySelectorAll('.filter__name');
const taskTemplate = document.querySelector('#task-template').content.querySelector('.tasks__item');
const clearCompletedButton = document.querySelector('.clear-button');

const createTaskElement = (task) => {
    const clonedTask = taskTemplate.cloneNode(true);
    const newTaskCheckbox = clonedTask.querySelector('.checkbox');

    clonedTask.querySelector('.tasks__text').textContent = task.value;

    if (task.classList.contains('new-task__input--completed')) {
        clonedTask.classList.add('tasks__item--completed');
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

// не доделана фильтрация
const filtration = () => {
    filterOptions.forEach(element => {
        element.addEventListener('click', (evt) => {
            evt.preventDefault();
            element.classList.toggle('filter__name--active')
        })
    });
}

const themeToggleHandler = () => {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('page__body--dark-theme');
    })
}

const completedTasks = () => {
    const checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach(element => {
        element.addEventListener('click', () => {
            const taskItem = element.closest('li');
            const taskInput = element.nextElementSibling;

            if(taskItem) {
                if (element.checked) {
                    taskItem.classList.add('tasks__item--completed')                    
                } else {
                    taskItem.classList.remove('tasks__item--completed')
                }
            } else {
                if (element.checked) {
                    taskInput.classList.add('new-task__input--completed')                   
                } else {
                    taskInput.classList.remove('new-task__input--completed') 
                }
            }
        })
    });
}

const onEnterHandler = (evt) => {
    if (evt.key === 'Enter') {
        tasksList.append(createTaskElement(taskInput));
        taskInput.value = '';
        document.removeEventListener('keydown', onEnterHandler);
        onCloseButtonHandler();
        themeToggleHandler();
        completedTasks();
        clearCompletedTasks();
    }
}

const onCloseButtonHandler = () => {
    const closeButtons = document.querySelectorAll('.close-button');

    closeButtons.forEach(element => {
        element.addEventListener('click', () => {
            const item = element.closest('li');
            item.remove();
        })
    });
}

clearCompletedTasks();
filtration();
themeToggleHandler();
completedTasks();
onCloseButtonHandler();
taskInput.addEventListener('keydown', onEnterHandler);