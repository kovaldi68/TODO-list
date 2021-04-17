const body = document.querySelector('body');
const themeToggle = document.querySelector('.theme-toggle');
const checkboxes = document.querySelectorAll('.checkbox');
const taskInput = document.querySelector('.new-task__input');
const tasksList = document.querySelector('.tasks__list');
const taskItem = document.querySelector('.tasks__item');
const filterSttring = document.querySelector('.filter__name');
const taskTemplate = document.querySelector('#task-template').content.querySelector('.tasks__item');

const createTaskElement = (task) => {
    const clonedTask = taskTemplate.cloneNode(true);

    clonedTask.querySelector('.tasks__text').textContent = task.value;

    return clonedTask;
}

const themeToggleHandler = () => {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('page__body--dark-theme');
    })
}

const completedTasks = () => {
    checkboxes.forEach(element => {
        element.addEventListener('click', () => {
            var task = element.closest('li');
            if (body.classList.contains('page__body--dark-theme')) {
                if (element.checked) {
                    task.style.textDecoration = 'line-through';
                    task.style.color = '#4d5067';
                } else {
                    task.style.textDecoration = 'none';
                    task.style.color = '#c8cbe7';
                }
            } else {
                if (element.checked) {
                    task.style.textDecoration = 'line-through';
                    task.style.color = '#d1d2da';
                } else {
                    task.style.textDecoration = 'none';
                    task.style.color = '#494c6b';
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
themeToggleHandler();
completedTasks();
onCloseButtonHandler();
taskInput.addEventListener('keydown', onEnterHandler);