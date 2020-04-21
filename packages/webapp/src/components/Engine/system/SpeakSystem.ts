import { Entity, System } from 'ecs-lib';
import { SpeakComponent } from '../component/SpeakComponent';

export default class SpeakSystem extends System {

    constructor() {
        super([
            SpeakComponent.type
        ]);
    }

    update(time: number, delta: number, entity: Entity): void {
        let speak = SpeakComponent.oneFrom(entity);

        if(speak.attr.progress >= 1) {
            entity.remove(speak);
            return;
        }

        speak.attr.progress += delta / (1000 / 60) / 200;
    }

    enter(entity: Entity): void {
        let speak = SpeakComponent.oneFrom(entity);
        speak.attr.progress = 0;
    }
}
