# Creature's Sprite Util

Command line tools for parsing, compiling or converting Creatures sprite files

---

## Sub Commands:

**[compile](#compile)** - 
Sub command for converting raw images into a Creatures' sprite file Supports converting to all main formats, SPR, S16,
C16 and BLK

**[parse](#parse)** - 
Sub command for converting raw images into a Creatures' sprite file Supports converting to all main formats, SPR, S16,
C16 and BLK

**[convert-sprite](#convert-sprite)** - 
Sub command for converting raw images into a Creatures' sprite file.
Supports converting between the main formats: SPR, S16, and C16


**[convert-breed](#convert-breed)** - 
Sub command for converting a breed's images (and optionally its ATTs) 
from one game to another

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
    convert-sprite - Convert between sprite file formats

Options: 
    --help, -h -> 
        Usage info for base command `sprite-util --help`, 
        or child command. i.e. `sprite-util convert --help`
```

The **inputFiles** argument is a list of:

- Individual file names
- Directories
- Glob patterns. i.e. `./Frost-Grendel/*103.spr`

---

### Compile

Takes a series of images and combines them into a single sprite image. 
In the case of a BLK conversion, only one file can be used as input

Images can be PNGs or BMPs. 

With PNG images, black can be made non-transparent by using the `--keep-black` flag. Useful when working on images that 
support transparency, and when black may be used accidentally

```
Usage: sprite-util compile type output [options_list] inputFileNames
Arguments: 
    type -> sprite output type: [SPR, S16, C16, BLK]
    Output -> Output sprite file name
    images -> Image files or folders or glob patterns
Options: 
    --encoding, -c -> Sprite color encoding { Value should be one of [555, 565] }
    --force, --f -> Overwrite ouput file if it exists
    --skip-existing, -x -> Do not overwrite existing file
    --help, -h -> Usage info 
```

**Valid image files are BMP or PNG**

**Example usage**

`sprite-util compile C16 butterfly.c16 ./bufferfly/*` <br/>Produce a C16 called butterfly in the current working
directory using all image BMP and PNG files in the butterfly subdirectory

`sprite-util compile S16 theDarkness.s16 --keep-black ./darkness/*.png`
Create a sprite using PNG files in the darkness subfolder. With --keep-black it will keep all solid black pixels from
becoming transparent

**--keep-black, -b** is really only useful when working with transparent PNGs where blacks are not expected to be
transparent

`sprite-util compile SPR lemon.spr ./lemon000.png ./lemon001.png ./trellis.png`<br/>
Create a sprite using three explicitly defined sprites.<br/>
This would result in an SPR file with the images in the order they are defined

`sprite-util compile BLK fantasia.blk ./fantasia_metaroom.png` <br/>
This will produce a BLK with the given PNG. Only one image can be converted at a time

---

### Parse

Parses a sprite file, and outputs its frames as individual PNG images. 

If the `--keep-black` flag is not used, then pure black will be made transparent in the output images

For **BLK** files the parser creates a single unified PNG by default. 
Pass the `--nostitch` flag to output the individual frames  

```
Usage: sprite-util parse [options_list] inputFiles....
Arguments: 
    FileNames -> Sprite files to parse (supports some glob syntax) { String }
Options: 
    --output, -o -> Directory to output sprite images to
    --prefix, -p -> Output file name prefix
    --number-padding, -n -> Minimum number of digits for frame number in output file names
    --help, -h -> Usage info 
Flags:
    --progress -> Output parsing progress
    --nostitch, -s -> Do not stitch BLK sprite into a single PNG image, but output individual frames
    --keep-black, -b -> Keep black pixels black instead of making them transparent
```

**example usage**<br/>
`sprite-util parse -o ./a408 -n 3 -p "f-norn_" ./a408.spr` - produces the files

- `a408/f-norn_000.png`
- `a408/f-norn_001.png`
- `a408/f-norn_002.png`
- `a408/f-norn_00{n}.png`...

`sprite-util parse -n 3 -p "f-norn_" ./a4*.spr` - Produces the following in the current working directory

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

`sprite-util parse -o ./fantasia fantasia.blk` - Produces a set of numbered images for each frame of the BLK

`sprite-util parse --stitch -o ./fantasia.png fantasia.blk` - Produces a single PNG, stitching all frames in the BLK

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

### Convert-Sprite

Converts one game's sprites to that of another

```
usage: sprite-util convert-sprite type [options_list] inputFiles...
Arguments: 
    type -> Target output sprite type { Value should be one of [SPR, S16, C16, BLK] }
    files -> Image files or folders in glob format { String }
Options: 
    --encoding, -c [565] -> Sprite color encoding: [555, 565]
    --output, -o -> Output folder for the converted breed files { String }
    --help, -h -> Usage info 
Flags:
    --force, --f -> Overwrite existing files
    --skip-existing, -x -> Do not overwrite existing files 
    --ignore-errors, -e -> Ignore all compilation errors. Other errors will still cancel compile  
    --quiet, -q -> Only output error text 
    --keep-black, -b -> Prevent solid black from being transparent (shifts black to make it opaque) 
```

**example usage**<br/>
`sprite-util convert-sprite C16 -o ./conversions ./C2/images/zand.s16 ./C2/images/cact.s16` - produces the files

- `conversions/zand.c16`
- `conversions/cact.c16`

`sprite-util convert-sprite C16 -o ./conversions --force ./C2/images/zand.s16` - would overwrite `zand.c16` if it
existed

`sprite-util convert-sprite C16 -o ./conversions --skip-existing ./C2/images/zand.s16` - would skip converting and
writing `zand.c16` if the file already existed

---

### Convert-Breed

Converts a breed's sprites from one game to another and optionally its ATTs as well

For C1 -> C2 or C2e, tail files are created by default, and if the breed has tails, the parts are 
automatically reversed as is needed for C1 tails to the other games and vice-versa

```
Usage: sprite-util convert-breed target-game [options_list] inputFiles...
Arguments: 
    target-game -> Target game for breed files { Value should be one of [C1, C2, CV, C3, DS, SM] }
    sprites -> Image files or folders or glob pattern
Options: 
    --from, -> Input sprite's game variant (C1|C2|CV|C3|DS). Not really needed if extensions are correct
    --encoding, -c -> Sprite color encoding: [555, 565]
    --genus, -g -> The output genus: [n]orn, [g]rendel, [e]ttin, [s]hee, geat
    --breed, -b -> The output breed slot for these body parts char [0-9] for C1; Char [a-z] for all other games 
    --force, -f [false] -> Force overwrite of existing files (cannot be used with --skip-existing or -x)
    --skip-existing, -x [false] -> Skip existing files (cannot be used with force)
    --no-tail -> Do not create tail files (even if none are present) 
    --ignore-errors, -e [false] -> Ignore all compilation errors. Other errors will still cancel compile 
    --att-dir, -a -> The location of atts to convert if desired { String }
    --output, -o -> Output folder for the converted breed files { String }
    --help, -h -> Usage info 
```

**example usage**<br/>
`sprite-util convert-breed C3 --genus ettin --breed z --att-dir "./Body Data" ./Images/*0*8.spr ./Images/*4*8.spr` - 
Produces C3 compatible breed conversion from a C1 norn slot "8" to an ettin slot "z"
Empty tail sprite and ATT will be generated automatically, if the C1 breed does not have one defined

`sprite-util convert-breed C3 --genus ettin --breed z --no-tail --output-dir "Coversions/C3EZ" ./Images/*0*8.spr ./Images/*4*8.spr` - 
Converts only a C1 breed's sprites to C3 C16's and does not create a tail if none are present.
If breed does not include a tail, a tail will be selected by the game engine

