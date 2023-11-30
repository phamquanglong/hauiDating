import {useDispatch} from 'react-redux';
import {IAppDispatch} from '~store/index';

export const useAppDispatch: () => IAppDispatch = useDispatch;
