### Install

```js
npm i inversion-of-control
```

### Example

1. Controller

```js
import { Controller, Injectable } from 'inversion-of-control';
import { UserService } from './services';

@Controller()
@Injectable()
export class UserController {
    constructor(private userService: UserService) {}

    public getUser(): string {
        return this.userService.getUser();
    }
}

```

2. Repository

```js
import { Injectable, Repository } from 'inversion-of-control';

@Repository()
@Injectable()
class UserRepository {
    public find(): string {
        return 'User data';
    }
}

export default UserRepository;

```

3. Service

```js
import { Injectable, Service } from 'inversion-of-control';
import UserRepository from './repositories';

@Service()
@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    public getUser(): string {
        return this.userRepository.find();
    }
}

```

4. Setup container and resolve

```js
import DIContainer from 'inversion-of-control';
import { UserController } from './controllers';
import UserRepository from './repositories';
import { UserService } from './services';

const container = new DIContainer();
container.register('UserRepository', UserRepository);
container.register('UserService', UserService);
container.register('UserController', UserController);

const userController = container.resolveController < UserController > 'UserController';
console.log(userController.getUser());
```
