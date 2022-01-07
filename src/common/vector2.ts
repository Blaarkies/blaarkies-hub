import { Common } from './common';

export class Vector2 {

  static readonly zero = new Vector2(0, 0);

  get length(): number {
    return this.distance(Vector2.zero);
  }

  constructor(public x: number = null,
              public y: number = null) {
  }

  static fromList(xy: number[]): Vector2 {
    return new Vector2(xy[0], xy[1]);
  }

  static fromDirection(angle: number, distance: number = 1): Vector2 {
    return new Vector2(Math.cos(angle) * distance, Math.sin(angle) * distance);
  }

  set(xy: number[]): Vector2 {
    [this.x, this.y] = xy;
    return this;
  }

  setVector2(other: Vector2): Vector2 {
    this.x = other.x;
    this.y = other.y;
    return this;
  }

  distance(other: Vector2): number {
    return Math.hypot(this.x - other.x, this.y - other.y);
  }

  add(x: number, y: number = x): Vector2 {
    this.x += x;
    this.y += y;
    return this;
  }

  addVector2(other: Vector2): Vector2 {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  addVector2Clone(other: Vector2): Vector2 {
    return this.clone().addVector2(other);
  }

  subtract(x: number, y: number): Vector2 {
    this.x -= x;
    this.y -= y;
    return this;
  }

  subtractVector2(other: Vector2): Vector2 {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  subtractVector2Clone(other: Vector2): Vector2 {
    return this.clone().subtractVector2(other);
  }

  multiply(factor: number): Vector2 {
    this.x *= factor;
    this.y *= factor;
    return this;
  }

  multiplyVector2(factor: Vector2): Vector2 {
    this.x *= factor.x;
    this.y *= factor.y;
    return this;
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  lerp(other: Vector2, ratio: number = .5): Vector2 {
    this.x = Common.lerp(this.x, other.x, ratio);
    this.y = Common.lerp(this.y, other.y, ratio);
    return this;
  }

  lerpClone(other: Vector2, ratio: number = .5): Vector2 {
    return this.clone().lerp(other, ratio);
  }

  toString(): string {
    return `${this.x} ${this.y}`;
  }

  direction(other: Vector2): number {
    return Math.atan2(other.y - this.y, other.x - this.x);
  }

  toList(): number[] {
    return [this.x, this.y];
  }

  normalize() {
    let length = this.length
    this.x = this.x / length;
    this.y = this.y / length;
    return this;
  }

  rotate(angle: number): Vector2 {
    let x = this.x;
    let y = this.y;

    this.x = x * Math.cos(angle) - y * Math.sin(angle)
    this.y = x * Math.sin(angle) + y * Math.cos(angle)
    return this;
  }

  rotateByDistance(circumferenceToRotate: number): Vector2 {
    let PI2 = Math.PI * 2;
    let r = this.length;
    let perimeter = PI2 * r;
    let ratioOfChange = circumferenceToRotate / perimeter
    let angleOfChange = ratioOfChange * PI2
    return this.rotate(angleOfChange)
  }

}
