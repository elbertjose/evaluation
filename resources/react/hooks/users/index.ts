import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import {AppDispatch, RootState} from "../../store";

// ✅ Hook tipado para `dispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// ✅ Hook tipado para `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
