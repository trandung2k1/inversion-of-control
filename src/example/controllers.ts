import { Controller, Injectable } from '../decorators';
import { UserService } from './services';

@Controller()
@Injectable()
export class UserController {
    constructor(private userService: UserService) {}

    public getUser(): string {
        return this.userService.getUser();
    }
}
