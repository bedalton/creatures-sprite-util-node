# Creature's Sprite Util

Command line tools for parsing, compiling or converting Creatures sprite files

## Basic Information
This utility requires node to run.

To download node, visit [node's downloads page](https://nodejs.org/en/download/)

To use this utility, install it with node's npm.   
```console
npm install -g @bedalton/sprite-util
```  
The `sprite-util` utility allows for the following sub-commands:

**[compile](#compile)**  
Compile raw PNG and BMP images into a Creatures' sprite file. Supports SPR, S16, C16 and BLK

**[parse](#parse)**  
Output sprite image contents as PNG. Supports SPR,S16,C16, and BLK

**[convert-sprite](#convert-sprite)**  
Convert sprites between the main formats: SPR, S16, and C16

**[convert-breed](#convert-breed)**  
Convert a breed's images (and optionally its ATTs) from one game to another

---

### Base Command

```
Usage: 
    sprite-util parse [options_list] inputFiles...
    sprite-util compile [options_list] inputFiles...
    sprite-util convert-breed [options_list] inputFiles...
    sprite-util convert-sprite [options_list] inputFiles...
    
Subcommands: 
    parse - Parse sprite file to pngs
    compile - Compile images to sprite
    convert-breed - Convert breed files between game formats
    convert-sprite - Convert sprite between sprite file formats

Options: 
    --help, -h -> 
        Usage info for base command `sprite-util --help`, 
        or child command. i.e. `sprite-util convert --help`
```

### Input Files
The **inputFiles** argument contains one or any mix of the following:
- Individual file names
- Directories
- Glob patterns. i.e. `./Frost-Grendel/*.spr`

**Files are:**
- used in the order they are defined
- If input is a folder or glob, files are sorted in the following order
  - Folders
  - File name without leading or trailing numbers
  - Leading numbers
  - Trailing numbers
  
**Note** The numbers in the file name are **sorted numerically not by text**.    
So:
```
file-033
file-3
file-20
```
Would be sorted as
```
file-3
file-20
file-033
```
And: 
```
01-file-3
20-aFile-033
02-aFile-20
```
Would be sorted as
```
02-aFile-20
20-aFile-033
01-file-3
```
Because `aFile` comes before `file` when sorted by text, and is evaluated before leading number

---

## Compile

Takes a series of images and combines them into a single sprite image.
In the case of a BLK conversion, only one file can be used as input

Images can be PNGs or BMPs.

With PNG images, black can be made non-transparent by using the `--keep-black` flag. Useful when working on images that
support transparency, and when black may be used accidentally

```
Usage: sprite-util compile type output [options_list] inputFiles...
Arguments: 
    type -> sprite output type: [SPR, S16, C16, BLK]
    Output -> Output sprite file name
    images -> Image files or folders or glob patterns
Options: 
    --encoding, -c -> Sprite color encoding: [555, 565]
    --force, --f -> Overwrite ouput file if it exists
    --skip-existing, -x -> Do not overwrite existing file
    --help, -h -> Usage info 
Help:
    --help, -h -> Usage info 
```

**Valid image files are BMP or PNG**

### Example usage

**&num; Example 1: Basic compile**  
The following produces a C16 called butterfly in the current working
directory, using all image BMP and PNG files in the butterfly subdirectory
```console
sprite-util compile C16 butterfly.c16 ./bufferfly/*
``` 


**&num; Example 3: Keep Black**  
Create a sprite using PNG files where black is meant to be visible:
```console
sprite-util compile S16 theDarkness.s16 --keep-black ./darkness/*.png
```

The flag `--keep-black` it will keep all solid black pixels from becoming transparent  
`--keep-black, -b` is really only useful when working with transparent PNGs
where blacks are not expected to be transparent



```console
# To create a sprite using three explicitly defined sprites.<br/>
sprite-util compile SPR lemon.spr ./lemon000.png ./lemon001.png ./trellis.png
```


**&num; Example 4: BLK**  
This will produce a BLK with the given PNG.  *Note: Only one image can be converted at a time*

```console
sprite-util compile BLK fantasia.blk ./fantasia_metaroom.png
```


---

## Parse

Parses a sprite file, and outputs its frames as individual PNG images.

If the `--keep-black` flag is not used, then pure black will be made transparent in the output images

For **BLK** files the parser creates a single unified PNG by default.
Pass the `--nostitch` flag to output the individual frames

```
Usage: sprite-util parse [options_list] inputFiles....
Arguments: 
    FileNames -> Sprite files to parse (supports some glob syntax)
Options: 
    --output, -o -> Directory to output sprite images to
    --prefix, -p -> Output file name prefix
    --number-padding, -n -> Minimum number of digits for frame number in output file names
Flags:
    --progress -> Output parsing progress *-p is prefix here*
    --nostitch, -s -> Do not stitch BLK sprite into a single PNG image, but output individual frames
    --keep-black, -b -> Keep black pixels black instead of making them transparent
Help:
    --help, -h -> Usage info 
```

### Example usage

**&num; Example 1: Basic sprite parsing**  
To simply extract the contents of a sprite using its file name as the prefix use the following
```console
sprite-util parse butterfly.c16
```
This simple command will output all frames of the sprite into the current working directory in the format  
`butterfly-00.png`,`butterfly-01.png`,`butterfly-02.png`, etc.


**&num; Example 2: Custom Prefix**  
To use a custom prefix instead of the file name for each output image 
use the `--prefix,-p` flag followed by the text you want to use.  
To produce images from `a408.spr` as `f-norn_000, f-norn_001...`
instead of the default `a408-00, a408-01` you would use the following:  
```console
sprite-util parse -o ./a408 -n 3 -p "f-norn_" ./a408.spr
```

- `a408/f-norn_000.png`
- `a408/f-norn_001.png`
- `a408/f-norn_002.png`
- `a408/f-norn_00{n}.png`...


**&num; Example 3: Multiple files parse with glob**  
 The following produces a PNG for each frame in each file matching the glob pattern  
```console
sprite-util parse -n 3 -p "f-norn_" ./a4*.spr
```

For sprite a408.spr

- `a408/f-norn_a408-000.png`
- `a408/f-norn_a408-001.png`
- `a408/f-norn_a408-002.png`
- `a408/f-norn_a408-00{n}.png`...

For sprite a428.spr

- `a428/f-norn_a428-000.png`
- `a428/f-norn_a428-001.png`
- `a428/f-norn_a428-002.png`
- `a428/f-norn_a428-00{n}.png`...


**&num; Example 4: Keep Black**  
By default black becomes transparent in the output file. To prevent this, use the `--keep-black, -b` flag
```console
sprite-util --keep-black ./darkness.spr
```
This will output the PNG without transparency using black instead like the original source file


**&num; Example 5: Stitched BLK**  
To produce a single PNG from a BLK, simply specify the output and the name of the BLK
```console
sprite-util parse fantasia.blk
```

**&num; Example 6: Non-Stitched BLK**  
To output images for the individual frames of the BLK instead of one stitched PNG, use the `--nostitch` flag
```console
sprite-util parse --nostitch  fantasia.blk
```

#### Notes
***--prefix, -p***:<br/>- When using multiple files with a prefix, the output format
becomes:<br/>`${prefix}${sprite_name_without_extension}-{number}` (the dash after the filename is hardcoded)
<br/> - Prefix has no trailing characters*, so if you want the prefix to end with a dash, you must explicitly add it to the
prefix

***--number-padding, -n*** - This defines the minimum number of digits for the frame number in a filename
If there are more digits in the sprite than the minimum padding, the larger size wins<br/>
`--number-padding 1` with a file with 11 frames will have a padding of 2 not one.<br/>
By default the padding is at least 2 digits


---

## Convert-Sprite

Converts one game's sprites to that of another

```
usage: sprite-util convert-sprite type [options_list] inputFiles...
Arguments: 
    type -> Target output sprite type: [SPR, S16, C16, BLK]
    files -> Image files or folders in glob format
Options: 
    --encoding, -c [565] -> Sprite color encoding: [555, 565]
    --output, -o -> Output folder for the converted breed files
Flags:
    --force, --f -> Overwrite existing files
    --skip-existing, -x -> Do not overwrite existing files 
    --ignore-errors, -e -> Ignore all compilation errors. Other errors will still cancel compile
    --progress -> Output file conversion progress   
    --quiet, -q -> Only output error text 
    --keep-black, -b -> Prevent solid black from being transparent (shifts black to make it opaque) 
Help:
    --help, -h -> Usage info 
```

### Example usage

**&num; Example 1: Basic Conversion**  
To convert a file simply provide the desired file type in uppercase followed by a list of files to convert
```console
sprite-util C16 zand.s16
```

**# Example 2: Mutiple files conversion**  
You can convert multiple images by listing files, folders or globs.  
The following converts 1 S16 files named `zand.s16` along with every S16 sprites in the `images` folder to C16
```console
sprite-util convert-sprite C16 -o ./conversions ./zand.s16 ./images/*.s16
```
Depending on the files in the `images` folder, output would be something like 
- `conversions/zand.c16`
- `conversions/acrn.c16`
- `conversions/ball.c16`
- `conversions/cact.c16`

**&num; Example 3: Overwrite without prompt**  
The code below would overwrite `zand.c16` if it existed without asking first
```console
sprite-util convert-sprite C16 --force ./C2/images/zand.s16
```

**&num; Example 3: Skip files without prompt**  
The following would skip converting and writing `zand.c16` if the file already exists
```console
sprite-util convert-sprite C16 --skip-existing ./C2/images/zand.s16
```

---

## Convert-Breed

Converts a breed's sprites from one game to another and optionally its ATTs as well

For C1 <-> C2 or C2e if the breed has tails, the parts are
automatically reversed as is needed for C1 tails to the other games and vice-versa

**Missing Tails:** Empty tail sprite and optionally ATTs will be generated automatically 
if the C1 breed does not have one defined

**Note:** This utility does **not** support **Creatures Village/Adventure** in any direction

```
Usage: sprite-util convert-breed target-game [options_list] inputFiles...
Arguments: 
    target-game -> Target game for breed files: [C1, C2, C3, DS]
    sprites -> Image files or folders or glob pattern
Options: 
    --from, -> Input sprite's game variant [C1, C2, C3, DS]. Not really needed if extensions are correct
    --encoding, -c -> Sprite color encoding: [555, 565]
    --genus, -g -> The output genus: [n]orn, [g]rendel, [e]ttin, [s]hee, geat
    --breed, -b -> The output breed slot for these body parts char [0-9] for C1; Char [a-z] for all other games
    --att-dir, -a -> The location of atts to convert if desired
    --output, -o -> Output folder for the converted breed files
Flags: 
    --force, -f [false] -> Force overwrite of existing files (cannot be used with --skip-existing or -x)
    --skip-existing, -x -> Skip existing files (cannot be used with --force)
    --no-tail -> Do not create tail files (even if none are present) 
    --ignore-errors, -e -> Ignore all compilation errors. **Other errors will still cancel compile** 
    --progress -> Output file conversion progress   
    --quiet, -q -> Silence non-essential output 
Help:
    --help, -h -> Usage info 
```

### Example usage

**# Example 1: Convert a breed "simple"**
The following would convert a breed's sprites to C3, keeping the genus, age and breed slot the same
```console
sprite-util convert-breed C3 ./Images/*0*8.spr ./Images/*4*8.spr
```

**# Example 1: Change slot**
The following code would produce a C3 compatible breed sprites in `ettin slot z` from a `norn slot 8`  
```console
sprite-util convert-breed C3 --genus ettin --breed z ./Images/*0*8.spr ./Images/*4*8.spr
```

**# Example 3: Convert ATTs**
To convert ATTs in addition to sprites, use the `--att-dir, -a` option followed by the ATT directory
So to convert a norn slot 8 breed from C1 to C3 ettin z you would use:
```console
sprite-util convert-breed C3 --genus ettin --breed z --att-dir "./Body Data" ./Images/*0*8.spr ./Images/*4*8.spr
```

**NOTE** Despite the ATTs being converted automatically. 
Care should be taken to edit head and body sprites converted from C1/C2 as the 
tail, hair and ear positions will be set to `0,0`. This will be very noticeable when bread with other breeds

**# Example 4: Without tail**
The prior commands will produce tail sprites (and atts if --att-dir is set) 
by default if one does not exist for the breed.  
To prevent this, use the `--no-tail` flag.  
The following would produce norn sprites and ATTs for parts `a` to `l`, but not `m` or `n`.
```console
sprite-util convert-breed C3 --genus ettin --breed z --no-tail --att-dir "./Body Data" ./Images/*0*8.spr ./Images/*4*8.spr
```

**# Example 5: Remap a breed**  
You can technically remap a breed by passing in the same game as the one it is for, but with different slot information  
The following would create a copy of norn slot `a` into ettin slot `z`;
** Be sure to include the `--att-dir` flag or the body data will not be remapped
```console
sprite-util convert-breed C3 --genus ettin --breed z --att-dir "./Body Data" ./Images/*0*a.c16 ./Images/*4*a.c16
```
