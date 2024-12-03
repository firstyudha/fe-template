import axios from 'axios';

const API_URL = 'http://188.166.231.97:8080/api/v1/leads';

// Fetch all todos
const getTodos = async () => {
  try {
    let token = sessionStorage.getItem("auth");
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Create a new todo
const createTodo = async (todoData) => {
    try {
      const response = await axios.post(`${API_URL}/add`, {
        todo: todoData.todo,          // Send just the todo text
        completed: false,
        userId: 1
      });
      
      // Transform the response to match our expected format
      return {
        id: response.data.id,
        todo: response.data.todo, // Make sure this is a string, not an object
        completed: response.data.completed,
        userId: response.data.userId
      };
    } catch (error) {
      console.error('Error creating todo:', error.response?.data || error.message);
      throw error;
    }
  };

// Delete a todo
const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    // Check if the deletion was successful
    if (response.data.isDeleted) {
      return { success: true, id };
    } else {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

// Update an existing todo
const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      completed: updatedTodo.completed
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Return the updated todo with the correct structure
    return {
      id: response.data.id,
      todo: response.data.todo,
      completed: response.data.completed,
      userId: response.data.userId
    };
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export { getTodos, createTodo, deleteTodo, updateTodo };