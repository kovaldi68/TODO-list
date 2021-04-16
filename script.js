const checkbox = document.querySelector('.checkbox');
const taskInput = document.querySelector('.new-task__input');
const tasksList = document.querySelector('.tasks__list');
const taskItem = document.querySelector('tasks__item');
const filterSttring = document.querySelector('.filter__name');
const taskTemplate = document.querySelector('#task-template').content.querySelector('.tasks__item');

const isEnterEvent = (evt) => {
    return evt.key === 'Enter';
};

const createTaskElement = (task) => {
    const clonedTask = taskTemplate.cloneNode(true);

    clonedTask.querySelector('.tasks__text').textContent = task.value;

    return clonedTask;
}

const onEnterHandler = () => {
    if (isEnterEvent) {
        console.log(isEnterEvent);
        tasksList.append(createTaskElement(taskInput));
        taskInput.value = '';
        document.removeEventListener('keydown', onEnterHandler);
    }
}

taskInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
        tasksList.append(createTaskElement(taskInput));
        taskInput.value = '';
    }
});