type Nullable<T> = T | null | undefined
export namespace bedalton.creatures.geometry {
    interface IPoint {
        readonly x: number;
        readonly y: number;
    }
    interface IRect {
        readonly top: number;
        readonly bottom: number;
        readonly left: number;
        readonly right: number;
    }
}
export namespace bedalton.creatures.structs {
    interface ITuple<T1, T2> {
        readonly first: T1;
        readonly second: T2;
    }
    interface IMutableTuple<T1, T2> {
        first: T1;
        second: T2;
    }
}
export namespace bedalton.creatures.bytes {
    class JsByteReader {
        constructor(bytes: Int8Array);
        static fromString(byteString: string): bedalton.creatures.bytes.JsByteReader;
        readonly uInt8: number;
        readonly uInt16: number;
        readonly uInt32: number;
        readonly peakUInt8: Nullable<number>;
        readonly size: number;
        seek(newPosition: number): void;
    }
}
export namespace kotlinx.atomicfu {
    function atomic$ref$<T>(initial: T, trace: kotlinx.atomicfu.TraceBase): kotlinx.atomicfu.AtomicRef<T>;
    function atomic$boolean$(initial: boolean, trace: kotlinx.atomicfu.TraceBase): kotlinx.atomicfu.AtomicBoolean;
    function atomic$int$(initial: number, trace: kotlinx.atomicfu.TraceBase): kotlinx.atomicfu.AtomicInt;
    function atomic$long$(initial: kotlin.Long, trace: kotlinx.atomicfu.TraceBase): kotlinx.atomicfu.AtomicLong;
}
export function createSpriteCompiler(format: string, encoding: Nullable<string>): Compiler;
export class Compiler {
    private constructor();
    addImage(fileName: string, bytes: Int8Array): Compiler;
    compile(formatIn: Nullable<string>): Int8Array;
    copy(format: any /*Class bedalton.creatures.sprite.util.SpriteType with kind: ENUM_CLASS*/, encoding: Nullable<any /*Class bedalton.creatures.sprite.util.ColorEncoding with kind: ENUM_CLASS*/>): Compiler;
    toString(): string;
    hashCode(): number;
    equals(other: Nullable<any>): boolean;
}
export function compileBLK(filename: string, backgroundBytes: Int8Array): Int8Array;
export function convertSprite(byteArray: Int8Array, fromSpriteTypeString: string, toSpriteTypeString: string, keepBlack: Nullable<boolean>, colorEncodingString: Nullable<string>, callback: Nullable<(p0: number, p1: number, p2: number) => Nullable<boolean>>): Int8Array;
export function convertBodyPart(fileName: string, byteArray: Int8Array, toGameIn: string, fromGameIn: Nullable<string>, genusIn: Nullable<string>, breedSlotIn: Nullable<string>, colorEncoding: Nullable<string>, callback: Nullable<(p0: number, p1: number, p2: number) => Nullable<boolean>>): bedalton.creatures.structs.ITuple<string, Int8Array>;
export function parseSpriteWithTransparency(fileName: string, bytes: Int8Array, progressCallback: Nullable<(p0: number, p1: number) => boolean>): Array<Int8Array>;
export function parseSpriteKeepingBlack(fileName: string, bytes: Int8Array, progressCallback: Nullable<(p0: number, p1: number) => boolean>): Array<Int8Array>;
export function stitchBlkToPng(blkBytes: Int8Array, progressCallback: Nullable<(p0: number, p1: number, p2: number) => Nullable<boolean>>): Int8Array;
export namespace bedalton.creatures.sprite.cli {
    function runWhenReady(): void;
}