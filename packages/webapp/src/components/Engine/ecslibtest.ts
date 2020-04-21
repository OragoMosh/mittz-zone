import ECS, { Entity } from 'ecs-lib';
import ActorEntity from "./entity/ActorEntity";
import ActorSystem from "./system/ActorSystem";
import SpriteSystem from "./system/SpriteSystem";
import HopSystem from "./system/HopSystem";
import { HopComponent } from "./component/HopComponent";
import { SpeakComponent } from "./component/SpeakComponent";

// Benchmark results
// 30000 entities
// Hop every 50ms, Speak every 1000ms
// 60fps, ~2.2ms per frame, slimming down to ~1.5ms after ~2700 updates

function randomString(charSet: [number, number], length: number): string {
    let value: string = '';
    for(let i = 0; i < length; i++) {
        value += String.fromCharCode(Math.random() * (charSet[1] - charSet[0]) + charSet[0]);
    }
    return value;
}
const COLORS: number[] = [0x119922, 0x99ff22, 0x00ff22, 0xffff33, 0x992222, 0x44ff99];
function randomColor(): number {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}
function randomCoord(): number {
    return Math.round(Math.random() * 300 - 150);
}

export default class Ecslibtest {

    private readonly world: ECS;

    constructor() {
        this.world = new ECS();
        console.log('ECS world created!', this.world);
    }

    private updateCount: number = 0;
    private updateTimeSum: number = 0;
    private countStartTime: number = 0;

    private update() {
        if(this.updateCount % 200 === 0) {
            this.countStartTime = performance.now();
        }
        let preUpdateTime = performance.now();
        this.world.update();
        this.updateCount++;
        let now = performance.now();
        this.updateTimeSum += now - preUpdateTime;
        if(this.updateCount % 200 === 0) {
            console.log(this.updateCount,'FPS:',200 / ((now - this.countStartTime) / 1000),
                'MS per frame:', this.updateTimeSum / 200);
            this.updateTimeSum = 0;
        }
    }

    start(): void {
        const actorSystem = new ActorSystem();
        const spriteSystem = new SpriteSystem();
        const hopSystem = new HopSystem();
        this.world.addSystem(actorSystem);
        this.world.addSystem(spriteSystem);
        this.world.addSystem(hopSystem);

        for(let i = 0; i < 30000; i++) {
            let actorEntity: Entity = new ActorEntity(
                {
                    userID: randomString([48, 57], 18),
                    username: randomString([32, 126], Math.floor(Math.random() * 12) + 3),
                    color: randomColor()
                },
                {
                    x: randomCoord(),
                    y: randomCoord(),
                    z: 0
                })
            this.world.addEntity(actorEntity);
        }

        setInterval(() => this.update(), 1000/ 60); // Begin game loop

        setInterval(() => {
            let actorEntities = actorSystem.getEntities();
            if(actorEntities.length === 0) return;
            let actorEntity = actorEntities[Math.floor(actorEntities.length * Math.random())];
            if(HopComponent.oneFrom(actorEntity)) return;
            actorEntity.add(new HopComponent({
                x: 1,
                y: 0,
                z: 0
            }));
        }, 50);

        setInterval(() => {
            let actorEntities = actorSystem.getEntities();
            if(actorEntities.length === 0) return;
            let actorEntity = actorEntities[Math.floor(actorEntities.length * Math.random())];
            if(SpeakComponent.oneFrom(actorEntity)) return;
            actorEntity.add(new SpeakComponent({
                channel: '123123123123123123',
                message: 'Hello I am speaking now',
                timestamp: Date.now()
            }));
        }, 1000);
    }
}
