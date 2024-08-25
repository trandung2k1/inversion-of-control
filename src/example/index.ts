import DIContainer from '../container';
import { UserController } from './controllers';
import UserRepository from './repositories';
import { UserService } from './services';

// Setup container and resolve
const container = new DIContainer();
container.register('UserRepository', UserRepository);
container.register('UserService', UserService);
container.register('UserController', UserController);

const userController = container.resolveController<UserController>('UserController');
console.log(userController.getUser());
