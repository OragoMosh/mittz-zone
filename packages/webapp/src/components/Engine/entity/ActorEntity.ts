import { Entity } from 'ecs-lib';
import { Actor, ActorComponent } from "../component/ActorComponent";
import { Transform, TransformComponent } from "../component/TransformComponent";
import { SpriteComponent } from "../component/SpriteComponent";

export default class ActorEntity extends Entity {

    constructor(actor: Actor, transform: Transform) {
        super();

        this.add(new ActorComponent(actor));
        this.add(new TransformComponent(transform));
        this.add(new SpriteComponent({
            x: -8,
            y: -8,
            width: 16,
            height: 16,
            sheet: 'actor',
            sheetX: 0,
            sheetY: 0
        }));
    }
}
