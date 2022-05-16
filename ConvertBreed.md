# Convert Sprites and initial ATTs

## Download  

1. Download the sprite utility from [https://github.com/bedalton/creatures-sprite-util-node/releases/tag/Release](https://github.com/bedalton/creatures-sprite-util-node/releases/tag/Release)

**\*\*THIS IS A COMMAND LINE PROGRAM. DO NOT DOUBLE-CLICK IT****

2. Extract the sprite-util.exe program from the zip you download, and move it to a location that will be easy to access. This could be
    - To the folder with the breed assets you want to copy,
    - Your desktop where you can drag it into the CMD window
    - A folder with an easy to type path
    - Or somewhere you'll remember, as if you find it in explorer, you can drag it into the CMD window to run it

## Command line Basics

**You cannot move the cursor by clicking, you must use the arrow keys**


### Paths
Paths can be absolute or relative. 

**You can drag a folder or file from explorer into CMD and it will add the absolute path where the cursor is**

`..\\` - Means go up one folder. Used with relative paths  

**Paths with spaces must be surrounded in quotes**


### Paths: Globs
Paths can use "glob" syntax
- `?` = any one character
- `*` = any number of characters

**Example** 
For *Male norn slot E Images* the glob would be **?0?e.c16**
- `?` - matches a single letter or number, here it is the part letter
- `0` - matches only the number `0`, meaning male norn
- `?` - Matches a single letter or number, here it is life stage
- `e` - Matches the literal character `e`
- `.c16` - Is the extension.


## Converting the Breed: Step by Step
Running a command line program can seem like a lot, but take your time and you will get there. 

Though it seems like a lot of options, you will probably find you use the same ones

### Start CMD  

1. Go to start
2. Type `CMD`
3. Hit enter or click on CMD or command line in the results

### Change directory to breed files root

`cd` into the directory holding your breed files.

1. Type `cd ` (with space)
2. Enter path to breed file parent folder. To do so do any of the following
    - Drag the folder from explorer into CMD
    - copy and paste the path
    - Type the relative or absolute path by hand
3. Hit enter<br/>
*The path to the left of the cursor should now point to the correct folder*

### Enter command, subcommand and arguments

1. Enter the path to `sprite-util`.
	- If you copied `sprite-util.exe` to the current folder in CMD, simply type `sprite-util`
	- If it is somewhere else, drag it from explorer into CMD
2. Type ` convert-breed ` onto the same line (with leading and trailing space)
3. Type the **Target/TO** game value of **C1**, **C2**, or **C3** (for DS use `C3`)



### Options and Flags

Options and flags can go in any order, but the option's value must immediately follow that option

#### Options  

Options require another value directly after themselves

Options are
- `--encoding`, `-c` -> Sprite color encoding: [555, 565]
- `--genus`, `-g` -> The output genus: [n]orn, [g]rendel, [e]ttin, [s]hee, geat
- `--breed`, `-b` -> The output breed slot for these body parts. Should be a number 0-9 for C1 or a Letter [a-z] for all other games
- `--att-dir`, `-a` -> The location of atts to convert if desired. Requires a relative, absolute or glob path.
- `--output`, `-o` -> Output folder for the converted breed files. Requires absolute or relative folder. Folder will be created if it does not exist

#### Flags
Flags are used on their own with no other value or argument and in any order

- `--keep-ages` -> Do not shift ages to match target game. C1/C2 use different lifestages than C3DS. This shifts the values by one in the required direction
- `--force`, `-f` [false] -> Force overwrite of existing files (cannot be used with `--skip-existing` or `-x`)
- `--skip-existing`, `-x` -> Skip existing files (cannot be used with `--force`, `-f`)
- `--no-tail` -> Do not create tail files (even if none are present)  
- `--samesize` -> Make all body part frames the same size  
- `--progress` -> Output file conversion progress   
- `--quiet`, `-q` -> Silence non-essential output 

### Final arguments: Images
The source images or source folder. Can be relative, absolute and have [glob syntax](#Globs)

**Paths with spaces must be surrounded in quotes**

If listing out images or files by hand, separate them with spaces, quoting paths as needed


### Special Flag: --Help
`sprite-util convert-breed --help` - Shows all command arguments, flags and options
    	

### Examples:

#### Example 1
`sprite-util convert-breed C3 --att-dir "Body Data" --samesize --progressive --genus ettin --breed h --output C12DS-AlbianGreys sprites`

**Break Down**  
- `sprite-util` Command/Executable
- `convert-breed` (subcommand)
- `C3` (argument) - Convert **TO** C3
- `--att-dir "Body Data"` (option) - is the location of the ATT files
- `--samesize` - Use the same size for all images inside a given sprite
- `--progressive` (flag) - Use side view images to give front view arms more positions as C1e only has arms at its side
- `--genus ettin` - Convert **TO** ettin genus
- `--breed h` - Convert **TO** breed slot *h*
- `--output C12DS-AlbianGreys` - Write all images to the `C12DS-AlbianGreys` subfolder
- `sprites` (argument) - The folder where the images are, in this case "sprites", but the folder can have any name.

#### Example 2
`sprite-util convert-breed C1 --att-dir "Body Data/?[04]?i.att" --genus norn --breed 8 --output C3toC1-Zebra "images/?[04]?i.c16"`

**Break Down**  
- `sprite-util` Command/Executable
- `convert-breed` (subcommand)
- `C1` (argument) - Convert **TO**
- `--att-dir "Body Data/?[04]?i.att"` (option) - 
    - `?` can be any single character. Here it will most likely be [a-n]. 
    - `[04]` Means this character is either a `0` or a `4`, here that means male and female norn
    - `?` substitute another single character. Here it is lifestage [0-7]
    - `i` - match only i or the zebra breed
    - `.att` - the required extension
- `--genus norn` (option) - Output to norn genus
- `--breed 8` - Use slot 8 so with genus this is Norn slot 8
- `--output C3toC1-Zebra` - The destination for files which will be `C3toC1-Zebra` inside the folder we `cd`'d into earlier. 
    - If not sure where you are, look to the left of the command at the start of the line. The absolute path, followed by `>`
- `images/?[04]?i.c16` (argument) - Use images in the `images` folder matching the glob syntax: `?[04]?i.c16`
    - `?` can be any single character. Here it will most likely be [a-n]. 
    - `[04]` Means this character is either a `0` or a `4`, here that means male and female norn
    - `?` substitute another single character. Here it is lifestage [0-7]
    - `i` - match only i or the zebra breed
    - `.att` - the required extension

