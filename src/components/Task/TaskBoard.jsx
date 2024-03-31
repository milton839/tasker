import { useState } from "react"
import SearchTask from "./SearchTask"
import TaskAction from "./TaskAction"
import TaskLists from "./TaskLists"
import AddTaskModal from "./AddTaskModal"
import NoTaskFound from "./NoTaskFound"

const TaskBoard = () => {
    const defaultTask = {
        'id': crypto.randomUUID(),
        'title': "Learn React",
        'description': "lorem impsum is a dummy text",
        'tags': ["web", "react", "js"],
        'priority': "High",
        'isFavourite': true
    }
    const [tasks, setTasks] = useState([defaultTask])
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null)

    const handleAddEditTask = (newTask, isAdd) => {
        if (isAdd) {
            setTasks([
                ...tasks,
                newTask
            ])
        }
        else {
            setTasks(
                tasks.map((task) => {
                    if (task.id === newTask.id) {
                        return newTask;
                    }
                    return task;
                })
            )
        }

        setShowAddModal(false);
    }

    const handleEditTask = (task) => {
        setTaskToUpdate(task)
        setShowAddModal(true)
    }

    const handleCloseModal = () => {
        setShowAddModal(false)
        setTaskToUpdate(null)
    }

    const handleTaskDelete = (taskId) => {
        const tasksAfterDelete = tasks.filter(task => task.id !== taskId)
        setTasks(tasksAfterDelete)
    }

    const handleDeleteAll = () => {
        tasks.length = 0;
        setTasks([...tasks])
    }

    const handleFav = (taskId) => {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        const newTasks = [...tasks]
        newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite;
        setTasks(newTasks)
    }

    const handleSearch = (searchTasks) => {
        const filteredTask = tasks.filter((task) => task.title.toLowerCase().includes(searchTasks.toLowerCase()))
        if (filteredTask) {
            setTasks([...filteredTask])
        }

    }
    return (
        <section className="mb-20" id="tasks">
            {
                showAddModal && <AddTaskModal
                    handleCloseModal={handleCloseModal}
                    onSave={handleAddEditTask}
                    taskToUpdate={taskToUpdate} />
            }
            <div className="container">

                <div className="p-2 flex justify-end">
                    <SearchTask onSearch={handleSearch} />
                </div>

                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskAction
                        handleAddTask={() => setShowAddModal(true)}
                        onDeleteAll={handleDeleteAll} />
                    {
                        tasks.length > 0 ?
                            (
                                <TaskLists
                                    tasks={tasks}
                                    onEdit={handleEditTask}
                                    onDelete={handleTaskDelete}
                                    onFav={handleFav} />
                            ) : <NoTaskFound />
                    }
                </div>
            </div>
        </section>
    )
}

export default TaskBoard