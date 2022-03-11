type Nullable<T> = T | null | undefined


type MultiPassCallback = (pass: number, index: number, total: number) => Nullable<boolean>;
type SinglePassCallback = (index: number, total: number) => boolean;
type ShouldOverwriteCallback = (fileName: string) => Promise<boolean>;

// Allows overwriting
export var shouldOverwriteOverride: Nullable<ShouldOverwriteCallback>;

export function setShouldOverwriteCallback(callback: ShouldOverwriteCallback);

export function runWithCLIString(args: String);

export function runCliWithArray(args: Array<String>);

export function setLogger(logger:(level: string, message: string)=>void)

type Encoding = "555"|"565";
type SpriteType = "SPR"|"S16"|"C16"|"BLK";
type Game = "C1"|"C2"|"CV"|"C3"|"DS";

export interface ITuple<T1, T2> {
    readonly first: T1;
    readonly second: T2;
}

export class Compiler {
    private constructor();
    addImage(fileName: string, bytes: Int8Array): Compiler;
    compile(formatIn: Nullable<SpriteType>): Int8Array;
}

export function createSpriteCompiler(
    format: SpriteType,
    encoding: Nullable<Encoding>
): Compiler;

export function compileBLK(
    filename: string,
    backgroundBytes: Int8Array
): Int8Array;

export function convertSprite(
    byteArray: Int8Array,
    fromSpriteTypeString: SpriteType,
    toSpriteTypeString: SpriteType,
    keepBlack: Nullable<boolean>,
    colorEncodingString: Nullable<Encoding>,
    callback: Nullable<MultiPassCallback>
): Int8Array;

export function convertBodyPart(
    fileName: string,
    byteArray: Int8Array,
    toGameIn: Game,
    fromGameIn: Nullable<Game>,
    genusIn: Nullable<string>,
    breedSlotIn: Nullable<string>,
    colorEncoding: Nullable<Encoding>,
    callback: Nullable<MultiPassCallback>
): ITuple<string, Int8Array>;

export function parseSpriteWithTransparency(
    fileName: string,
    bytes: Int8Array,
    progressCallback: Nullable<SinglePassCallback>
): Array<Int8Array>;

export function parseSpriteKeepingBlack(
    fileName: string,
    bytes: Int8Array,
    progressCallback: Nullable<SinglePassCallback>
): Array<Int8Array>;

export function stitchBlkToPng(
    blkBytes: Int8Array,
    progressCallback: Nullable<MultiPassCallback>
): Int8Array;


export interface ILoggerObject {
    log(replace: boolean, message: string)
    info(replace: boolean, message: string)
    warning(message: string)
    error(message: string)
    logMemory()
   readonly prependLogType: Nullable<boolean>
}