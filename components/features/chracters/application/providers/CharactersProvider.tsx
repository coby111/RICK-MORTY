import { createContext, ReactNode, FC, useReducer, useContext } from "react";
import Character from "../../domain/entities/Character";
import CharactersResult from "../../domain/entities/ChraceterResult";
import charactersRepositoryImp from '../../infraestructure/repositories/CharactersRepositoryImp';
import CharactersDatasourceImp from '../../infraestructure/datasources/CharactersDataSourceImp';

interface ContextDefinition {
  loading: boolean,
  page: number,
  totalPages: number,
  count: number,
  characters: Character[],
  getCharacters: (page: number) => void;
}

const CharactersContext = createContext({} as ContextDefinition);

interface CharactersState {
  loading: boolean,
  page: number,
  totalPages: number,
  count: number,
  characters: Character[],
}

type CharactersActionType =
  { type: 'Set Loading', payload: boolean }
  | { type: 'Set Data', payload: CharactersResult };

const initialState: CharactersState = {
  loading: false,
  page: 0,
  count: 0,
  totalPages: 0,
  characters: [],
}

function charactersReducer(
  state: CharactersState,
  action: CharactersActionType
) {
  switch (action.type) {
    case 'Set Loading':
      return { ...state, loading: action.payload };
    case 'Set Data':
      return {
        ...state,
        page: action.payload.page,
        count: action.payload.count,
        totalPages: action.payload.totalPages,
        characters: action.payload.characters,
        loading: false,
      };
    default:
      return state;
  }
}

type Props = {
  children?: ReactNode
}

const CharactersProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(charactersReducer, initialState);

  const getCharacters = async (page: number) => {
    const repository = new charactersRepositoryImp(
      new CharactersDatasourceImp()
    );

    dispatch({
      type: 'Set Loading',
      payload: true,
    });

    const apiResult = await repository.getCharacters(page);

    dispatch({
      type: 'Set Data',
      payload: apiResult,
    });
  }

  return (
    <CharactersContext.Provider
      value={{
        ...state,
        getCharacters,
      }}
    >
      {children}
    </CharactersContext.Provider>
  )
}
function useCharactersState() {
  const context = useContext(CharactersContext);
  if (context === undefined) {
    throw new Error("useCharactersState debe ser usado " +
      " con un CharactersProvider");
  }

  return context;
}

export { CharactersProvider, useCharactersState };
