import 'reflect-metadata';
import { isController, isRepository, isService } from '../decorators';

interface IContainer {
    register<T>(name: string, cls: new (...args: any[]) => T): void;
    resolve<T>(name: string): T;
    resolveController<T>(name: string): T;
    resolveRepository<T>(name: string): T;
}

class DIContainer implements IContainer {
    private services = new Map<string, any>();
    private controllers = new Map<string, any>();
    private repositories = new Map<string, any>();

    public register<T>(name: string, cls: new (...args: any[]) => T): void {
        if (isController(cls)) {
            this.controllers.set(name, cls);
        } else if (isRepository(cls)) {
            this.repositories.set(name, cls);
        } else if (isService(cls)) {
            this.services.set(name, cls);
        } else {
            throw new Error(`Unknown class type: ${name}`);
        }
    }

    public resolve<T>(name: string): T {
        const cls = this.services.get(name);
        if (!cls) {
            throw new Error(`Service ${name} not found`);
        }
        return this._resolve(cls);
    }

    public resolveController<T>(name: string): T {
        const cls = this.controllers.get(name);
        if (!cls) {
            throw new Error(`Controller ${name} not found`);
        }
        return this._resolve(cls);
    }

    public resolveRepository<T>(name: string): T {
        const cls = this.repositories.get(name);
        if (!cls) {
            throw new Error(`Repository ${name} not found`);
        }
        return this._resolve(cls);
    }

    private _resolve<T>(cls: new (...args: any[]) => T): T {
        const paramTypes = Reflect.getMetadata('design:paramtypes', cls) || [];
        const params = paramTypes.map((paramType: any) => {
            const paramName = paramType.name;
            if (this.repositories.has(paramName)) {
                return this.resolveRepository(paramName);
            } else if (this.controllers.has(paramName)) {
                return this.resolveController(paramName);
            } else {
                return this.resolve(paramName);
            }
        });
        return new cls(...params);
    }
}

export default DIContainer;
