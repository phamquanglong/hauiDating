interface IService {
  init: () => PVoid;
}
type Services = Record<string, IService>;
type PVoid = Promise<void>;
