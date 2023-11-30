import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {IRootState} from '~store/index';

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
