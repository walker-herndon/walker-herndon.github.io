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
	- 

### Jupyter Notebook?
- Goal is to try to turn the code into a library that can be imported into a notebook
	- Then just use a few library functions to:
		- import your data sets
		- import your trained model
		- run a matching algorithm on the data
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
- **preliminary test:** made separate workspace with new venv, ran `pip install [wheelfile.whl]` and it successfully installed the library in the venv with all dependencies listed. Created `libtest.py` and imported library, successfully ran functions! <br><br>
- Still to do:
	- ensure there's nothing more to add to `setup.py`
	- any other code not needed for matching part of library?
		- don't need any of `tester.py
		- may not need some of `DBUtil`
	- **create clear endpoints for use in the library**
		- protect non-endpoint functions from use by end user?
	- add tests to `test_matcher.py` after making endpoints
	- further down the line but need some clear documentation for usage – currently image files need to have specific names and be in specifically named directories for stuff to work, which either needs to be changed or clearly documented
		- If changed, would basically involve rewriting much of `DBUtil.py`, so best solution is probably to just leave it as is and clearly document it unless I have lots of extra time in the end.

### Improved Documentation
While working on turning into a library, started looking at improving documentation.

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
	- example: `"C21-2019-June-_IMG_3652"`
	- `key` could be better named, basically key for various attributes of additional info for an image
	- possible values for `key`: _add info about each_
		- `img`
		- `mask` 
		- `maskLabel`
		- `spotsLabel`
		- `spots`
		- `spotsJson`
		- `precomp`
		- `precompAA`
	- values are initialized to `None` then one is set to the file path, rest are left as `None`
	- currently all images are jpegs and only `img` is set with rest left as `None`
	- This is a way of labeling what kind of image each file is
- function will default to looking in `["../all_images/", "results"]` where `all_images` is the regular jpeg images and results are presumably the masked images
- only looks at a single cave number at a time, this is set to 21 in `tester.py`

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

