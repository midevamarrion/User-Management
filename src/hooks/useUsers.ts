import { useReducer } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

type State = {
  users: User[];
};

type Action =
  | { type: 'ADD_USER'; payload: Omit<User, 'id'> }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string };

const initialState: State = {
  users: [],
};

function usersReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_USER':
      const nextId = String(state.users.length + 1).padStart(3, '0');
      const newUser: User = {
        ...action.payload,
        id: nextId,
      };
      return { ...state, users: [...state.users, newUser] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    default:
      return state;
  }
}

export function useUsers() {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  const addUser = (user: Omit<User, 'id'>) => {
    dispatch({ type: 'ADD_USER', payload: user });
  };

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const deleteUser = (id: string) => {
    dispatch({ type: 'DELETE_USER', payload: id });
  };

  const isEmailUsed = (email: string, excludeUserId?: string) => {
    return state.users.some(user => user.email === email && user.id !== excludeUserId);
  };

  return {
    users: state.users,
    addUser,
    updateUser,
    deleteUser,
    isEmailUsed,
  };
}
