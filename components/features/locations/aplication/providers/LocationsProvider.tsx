import React, { createContext, ReactNode, FC, useContext, useReducer } from "react";
import LocationsResult from "../../domain/entities/LocationReult";
import LocationsRepositoryImp from "../../infraestructure/repositories/LocationsRepositoryImp";
import LocationsDatasourceImp from "../../infraestructure/datasources/LocationsDatasourceImp";

// Definir la estructura del contexto
interface ContextDefinition {
  loading: boolean;
  page: number;
  totalPages: number;
  count: number;
  locations: Location[];
  getLocations: (page: number) => void;
}

// Crear el contexto
const LocationsContext = createContext<ContextDefinition>({} as ContextDefinition);

// Definir el estado y las acciones para el reducer
interface LocationsState {
  loading: boolean;
  page: number;
  totalPages: number;
  count: number;
  locations: Location[];
}

type LocationsActionType =
  | { type: 'Set Loading'; payload: boolean }
  | { type: 'Set Data'; payload: LocationsResult };

const initialState: LocationsState = {
  loading: false,
  page: 0,
  count: 0,
  totalPages: 0,
  locations: [],
};

function locationsReducer(state: LocationsState, action: LocationsActionType): LocationsState {
  switch (action.type) {
    case 'Set Loading':
      return { ...state, loading: action.payload };
    case 'Set Data':
      return {
        ...state,
        page: action.payload.info.pages,
        count: action.payload.info.count,
        totalPages: action.payload.info.pages,
        locations: action.payload.location,
        loading: false,
      };
    default:
      return state;
  }
}

type Props = {
  children?: ReactNode;
};

const LocationsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(locationsReducer, initialState);

  const getLocations = async (page: number) => {
    const repository = new LocationsRepositoryImp(new LocationsDatasourceImp());

    dispatch({ type: 'Set Loading', payload: true });

    try {
      const apiResult = await repository.getLocations(page);
      // Verificación del resultado de la API antes de despachar la acción
      if (apiResult && apiResult.info && apiResult.locations) {
        dispatch({ type: 'Set Data', payload: apiResult });
      } else {
        // Manejar casos donde la API no devuelve lo esperado
        throw new Error("Datos inesperados de la API");
      }
    } catch (error) {
      console.error("Error al obtener las ubicaciones:", error);
      dispatch({ type: 'Set Loading', payload: false });
    }
  };

  return (
    <LocationsContext.Provider value={{ ...state, getLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};

// Hook personalizado para usar el estado de ubicaciones
function useLocationsState() {
  const context = useContext(LocationsContext);
  if (context === undefined) {
    throw new Error("useLocationsState debe ser usado con un LocationsProvider");
  }

  return context;
}

export { LocationsProvider, useLocationsState };
