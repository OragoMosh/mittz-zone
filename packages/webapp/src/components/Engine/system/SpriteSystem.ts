import { Entity, System } from 'ecs-lib';
import { TransformComponent} from "../component/TransformComponent";
import { SpriteComponent } from '../component/SpriteComponent';

export default class HopSystem extends System {

    constructor() {
        super([
            TransformComponent.type,
            SpriteComponent.type,
        ]);
    }

    enter(entity: Entity): void {
        let transform = TransformComponent.oneFrom(entity);
        let sprite = SpriteComponent.oneFrom(entity);
        // console.log(entity, 'entered sprite system');
        // Add to renderer
    }
}
