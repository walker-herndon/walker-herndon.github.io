[[CS5199]] ^f9acc9

**[GitHub Repo](https://github.com/walker-herndon/arctic-charr-packaged)**

This will serve as a record of the work I've been doing for future reference.
### Fixing formatting
Discussed in [[Week 7 Meeting Minutes]], did formatting fixes along with getting rid of any warnings and various other issues. Made PR linked in meeting minutes.
- [x] `algorithms.py`
- [x] `astroalign.py`
- [x] `astroalignMatch.py`
- [x] `DBUtil.py`
- [x] `grothMatcherCustom.py`
- [x] `LengthMatcher.py`
- [x] `Matcher.py`
- [x] `Patch.py`
- [x] `tester.py`
- [x] `UnetExtractor.py`
- [x] `util.py`

### Running Code
- downloaded images for 2019 June from Sharepoint
- don't have other images available but seem to range from 2012 June to 2019 August with only months each year being June and August
- file structure of  `all_images/2019_June/Cave[n]/` with images in each cave directory
- `tester.py` seems to be used for a test run of using the whole workflow
	- changed `prevDir` to `[2019, "June"]` and `currentDir` to `[2019, "Aug"]`, both were 2012 previously
	- changed for loop to only run one time, seems to normally run once per month and have only one month of data currently
		- seems like the matching shouldn't be able to be done with only 1 month of data since it needs to match across months? May need to ask for more images to test on

### Jupyter Notebook?
- Goal is to try to turn the code into a library that can be imported into a notebook
	- Then just use a few library functions to:
		- import your data sets
		- import your trained model
		- run a matching algorithm on the data
	- *Future Walker*: don't think I need to add endpoints. Probably already in a good place as far as this goes using the Matcher class as is.
- Might make sense to just make a separate branch on GitHub for the library as I should probably remove the training code from it but still want everything version controlled
- Tentatively using [this medium article](https://medium.com/analytics-vidhya/how-to-create-a-python-library-7d5aea80cc3f) as a guide, all below steps use this guide
- created new git branch `wh/convert-to-library`
- created `setup.py` for package `arctic_charr_matcher` (name not final)
- renamed `python_code/` to `arctic_charr_matcher/` (doesn't need to match package name afaik but just makes sense)
- added `__init__.py` to `arctic_charr_matcher/`
- fixed local imports to work with package (adding `__init__.py` makes the directory a package and messes the importing)
- updated some of the placeholder info in `setup.py`, some info still needs to be added
- added `tests` directory with placeholder test, added test info to `setup.py`
- commented out training functions in `UnetExtractor.py`
- added `install_requires` list (required packages), may need to be updated more
- **preliminary test:** made separate workspace with new venv, ran `pip install [wheelfile.whl]` and it successfully installed the library in the venv with all dependencies listed. Created `libtest.py` and imported library, successfully ran functions! <br>
- Got ssh sorted out and jupyter notebook running on gpu pc and tunneled to local machine. Installed library in workspace on gpu pc, created jupyter notebook there which imports it
- **notebook successfully uses matcher**
- had some bugs to work out for both the groth and astroalign matchers but all working now
- results aren't always great for groth matcher, but astroalign seems to have better top-5 accuracy
- still some issues with both matchers; some images cause a divide-by-zero and result in a match score of 0 even when they are a match and should succeed. Needs to be fixed
- <br>
- Still to do:
	- any other code not needed for matching part of library?
		- don't need any of `tester.py`, going to keep it around for now in case I want to reference it for anything (although it's in main if I ever need it)
	- add tests to `test_matcher.py`

### Improved Documentation
While working on turning into a library, started looking at improving documentation. Below notes are covering what different parts of the code are doing, some of which isn't currently documented but should be.

#### Basic Overall Documentation for Library Usage
![[Matcher Documentation]]

#### DBUtil.py
- Used to take image directories and turn into dictionary in Python
- dictionary called `images` indexed by `images[fileKey][key]`
	- `fileKey` of format:
	```python
	f"C{cave}-{year}-{month}-{fileName}"

	# actual code:
	fileKey = 
	f"C{cave}-{str(year)}-{months[monthIdx]}-{fileComponents[0]}"
	```
	- example: `"C21-2019-June-IMG_3652"`
	- `key` could be better named, basically key for various attributes of additional info for an image
	- values for `key`:
		- `img` - path to image file
		- `mask` - path to mask file
		- `maskLabel` - path to labelled mask file?
		- `spotsLabel` - path to labelled spot file?
		- `spots` - path to spot file
		- `spotsJson` - path to spot json file
		- `precomp` - path to cached astroalign data
		- `precompAA` - path to cached groth matcher data
	- values are initialized to `None` then set one by one by going through the files in `rootDirs`
- function will default to looking in `["../all_images/", "results"]` where `all_images` is the regular jpeg images and `results` are  the mask images, spot images, and spot json files.
- only looks at a single cave number at a time, this is set to 21 in `tester.py`, but could be any of the caves we have images for.

#### tester.py
- trying to sort out exactly what the tester file does
- seems like a lot of what this is doing is what `Matcher` does
- starts by defining an enum for `RANSIC_AFFINE` and `MODIFIED_GROTH`
- also defines a Json encoder which can handle some additional numpy values
- sets cave and algorithm
	- currently set to 21 and `RANSAC_AFFINE` respectively
- prints `resultFileName`
- sets `prevDir` and `currentDir` as `[year, month]`
- loops 15 times
	- uses `DBUtil` to get `testingImages` and `databaseImages`
		- `testingImages` come from cave previously set, `currentDir` year and month, and `rootDirs=["../all_images/", "patched/results"]`
		- `databaseImages` come from same cave, `years=range(2012, prevDir[0]+1` (year + 1), same `rootDirs`
	- also makes maps of fish tag to `keyPath` and reverse
		- `keyPath` is `"C{cave}-{year}-{month}-{fileName}"`
		- so for each `keyPath` there is one tag which is the tag for that fish
		- and for each fish there is a list of `keyPath` for each file which is of that fish
		- maps are made from same range as `databaseImages` uses (2012 to prev + 1)
	- loops for each image in `testingImages`
		- `potentialMatches` is a list of all images with the same tag as the current image in the loop
			- used to compare to match found for testing the success of the matcher
		- runs `findClosestMatch` from whatever algorithm is set (currently astroalign due to `RANSAC_AFFINE` being set)
		- prints time taken to match, matches found, and potential matches
	- prints time taken to process directory of images
	- iterates to next directory
- prints "Finished"

