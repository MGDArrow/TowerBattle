/* eslint-disable no-mixed-operators */
import { Ref, ref } from 'vue';

export class MyMath {
  //** Округление **//
  static round(value: number, round: number = 2): number {
    return +value.toFixed(round);
  }

  //** Округление к ближайшему**//
  static roundTo(num: number, multiple: number = 10): number {
    return Math.round(num / multiple) * multiple;
  }

  //** Рандом в диапазоне от min до max **//
  static random(min: number, max: number): number {
    return this.round(Math.random() * (max - min) + min);
  }

  //** Рандом ID **//
  static randomID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  //** Рандом первоначальной позиции за экраном **//
  static getStartPosition(size: number): [Ref<number>, Ref<number>] {
    const xExtreeme: boolean = Math.random() < 0.5;
    const signExtreeme: boolean = Math.random() < 0.5;
    const sceneWidth: number = window.innerHeight * 1.5;
    const sceneHeight: number = window.innerHeight;
    return xExtreeme
      ? [ref(signExtreeme ? 0 - size : sceneWidth + size), ref(this.random(0 - size, sceneHeight + size))]
      : [ref(this.random(0 - size, sceneWidth + size)), ref(signExtreeme ? 0 - size : sceneHeight + size)];
  }

  //** Числа в строки с E+10 нотацией  **//
  static toEText(value: number): string {
    return value.toPrecision(3);
  }

  //** Числа в строки с буквенной нотацией **//
  static toText(number: number, rounded: number = 2): string {
    if (number >= 1_000_000_000_000_000) {
      return `${this.round(number / 1_000_000_000_000_000, 1)}Q`;
    }
    if (number >= 1_000_000_000_000) {
      return `${this.round(number / 1_000_000_000_000, 1)}T`;
    }
    if (number >= 1_000_000_000) {
      return `${this.round(number / 1_000_000_000, 1)}B`;
    }
    if (number >= 1_000_000) {
      return `${this.round(number / 1_000_000, 1)}M`;
    }
    if (number >= 1000) {
      return `${this.round(number / 1_000, 1)}K`;
    }
    return `${this.round(number, rounded)}`;
  }

  //** Время в читаемом виде **//
  static toTime(ms: number): string {
    if (ms <1000) return `0c`;
    const days: number = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes: number = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((ms % (1000 * 60)) / 1000);
    let time = '';
    if (days) time += `${days}д. `;
    if (hours) time += `${hours}ч. `;
    if (minutes) time += `${minutes}м. `;
    if (seconds) time += `${seconds}с. `;
    return time;
  }
}

export class Rotate {
  //** Радианы в градусы **//
  static getDegInRad(rad: number): number {
    return (rad * 180) / Math.PI;
  }

  //** Градусы в радианы **//
  static getRadInDeg(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  //** Вращение объекта к цели **//
  static rotate(ABx: number, ABy: number, distance: number): number {
    const radY = this.getDegInRad(Math.acos(ABy / distance));
    return ABx < 0 ? radY : -radY;
  }

  //** Вращение объекта к цели обратной стороной**//
  static rotateReverse(ABx: number, ABy: number, distance: number): number {
    const radY = this.getDegInRad(Math.acos(ABy / distance));
    return ABx < 0 ? 180 + radY : 180 - radY;
  }

  //** Точное вращение объекта к цели (прилягание врагов к башне) **//
  static rotatePrecise(ABx: number, ABy: number, distance: number): number {
    const radX = this.getDegInRad(Math.acos(ABx / distance));
    const radY = this.getDegInRad(Math.acos(ABy / distance));

    if (radX < 45) {
      return radY <= 90 ? radX : -radX;
    }
    if (radX < 90) {
      return radY <= 90 ? -radY : 180 - radY;
    }
    if (radX < 135) {
      return radY <= 90 ? radY : (180 - radY) * -1;
    }
    return radY <= 90 ? (180 - radX) * -1 : 180 - radX;
  }
}

export class Vector {
  static getVector(Ax: number, Ay: number, Bx: number, By: number): [number, number] {
    return [Bx - Ax, By - Ay];
  }

  static getLength(ABx: number, ABy: number): number {
    return Math.sqrt(ABx ** 2 + ABy ** 2);
  }

  static getVectorLength(Ax: number, Ay: number, Bx: number, By: number): number {
    const [ABx, ABy] = this.getVector(Ax, Ay, Bx, By);
    return this.getLength(ABx, ABy);
  }

  static getNormalize(ABx: number, ABy: number, length: number): [number, number] {
    return [ABx / length, ABy / length];
  }

  static getVectorNormalize(Ax: number, Ay: number, Bx: number, By: number): [number, number] {
    const [ABx, ABy] = this.getVector(Ax, Ay, Bx, By);
    const length = this.getLength(ABx, ABy);
    return this.getNormalize(ABx, ABy, length);
  }

  static isCollision(ABx: number, ABy: number, Ar: number, Br: number): boolean {
    return (Ar + Br) ** 2 >= ABx ** 2 + ABy ** 2;
  }

  static isCollisionFast(Ax: number, Ay: number, Ar: number, Bx: number, By: number, Br: number): boolean {
    const [ABx, ABy] = this.getVector(Ax, Ay, Bx, By);
    return this.isCollision(ABx, ABy, Ar, Br);
  }
}
