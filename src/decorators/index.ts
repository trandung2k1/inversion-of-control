import 'reflect-metadata';

const SERVICE_METADATA_KEY = Symbol('SERVICE_METADATA_KEY');
const CONTROLLER_METADATA_KEY = Symbol('CONTROLLER_METADATA_KEY');
const REPOSITORY_METADATA_KEY = Symbol('REPOSITORY_METADATA_KEY');

export function Service() {
    return function (target: Function) {
        Reflect.defineMetadata(SERVICE_METADATA_KEY, true, target);
    };
}

export function Injectable() {
    return function (target: Function) {
        Reflect.defineMetadata(
            'design:paramtypes',
            Reflect.getMetadata('design:paramtypes', target) || [],
            target,
        );
    };
}

export function Controller() {
    return function (target: Function) {
        Reflect.defineMetadata(CONTROLLER_METADATA_KEY, true, target);
    };
}

export function Repository() {
    return function (target: Function) {
        Reflect.defineMetadata(REPOSITORY_METADATA_KEY, true, target);
    };
}

export function isService(target: Function): boolean {
    return Reflect.getMetadata(SERVICE_METADATA_KEY, target) === true;
}

export function isController(target: Function): boolean {
    return Reflect.getMetadata(CONTROLLER_METADATA_KEY, target) === true;
}

export function isRepository(target: Function): boolean {
    return Reflect.getMetadata(REPOSITORY_METADATA_KEY, target) === true;
}
