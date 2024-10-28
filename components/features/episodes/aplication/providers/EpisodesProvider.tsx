import React, { createContext, FC, ReactNode, useContext, useReducer } from "react";
import Episode from "../../domain/entities/Episode";
import EpisodesResult from "../../domain/entities/EpisodesResult";
import EpisodesDatasourceImp from "../../infraestructure/datasources/EpisodesDatasourceImp";
import EpisodesRepositoryImp from "../../infraestructure/repositories/EpisodesRepositoryImp";

interface contextDefinition {
  loading: boolean,
  page: number,
  totalPages: number,
  count: number,
  episodes: Episode[],
  getEpisodes: (page: number) => void;
}

const EpisodesContext = createContext<contextDefinition>({} as contextDefinition);

interface EpisodesState {
  loading: boolean,
  page: number,
  totalPages: number,
  count: number,
  episodes: Episode[],
}

type EpisodesActionType =
  { type: 'Set Loading'; payload: boolean }
  | { type: 'Set Data'; payload: EpisodesResult };

const initialState: EpisodesState = {
  loading: false,
  page: 0,
  totalPages: 0,
  count: 0,
  episodes: [],
};

function episodesReducer(
  state: EpisodesState,
  action: EpisodesActionType
) {
  switch (action.type) {
    case 'Set Loading':
      return { ...state, loading: action.payload };
    case 'Set Data':
      return {
        ...state,
        page: action.payload.info.pages,
        count: action.payload.info.count,
        totalPages: action.payload.info.pages,
        episodes: action.payload.episode,
        loading: false,
      };
    default:
      return state;
  }
}

type Props = {
  children?: ReactNode;
}

const EpisodesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(episodesReducer, initialState);

  const getEpisodes = async (page: number) => {
    const repository = new EpisodesRepositoryImp(
      new EpisodesDatasourceImp()
    );

    dispatch({ type: 'Set Loading', payload: true });

    try {
      const apiResult = await repository.getEpisodes(page);
      if (apiResult && apiResult.info && apiResult.episodes) {
        dispatch({ type: 'Set Data', payload: apiResult });
      } else {
        throw new Error("Datos inesperados de la API");
      }
    } catch (error) {
      console.error("Error al obtener las ubicaciones:", error);
      dispatch({ type: 'Set Loading', payload: false });
    }
  };

  return (
    <EpisodesContext.Provider value={{ ...state, getEpisodes }}>
      {children}
    </EpisodesContext.Provider>
  );
}

function useEpisodeState() {
  const context = useContext(EpisodesContext);
  if (context === undefined) {
    throw new Error('useEpisodeState must be used within a EpisodesProvider');
  }
  return context;
}

export { EpisodesProvider, useEpisodeState };

