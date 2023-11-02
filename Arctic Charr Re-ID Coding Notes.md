[[CS5199]]

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
	- Tentatively using [this medium article](https://medium.com/analytics-vidhya/how-to-create-a-python-library-7d5aea80cc3f) as a guide
		- created `setup.py` for package `arctic_charr_matcher` (name not final)
		- renamed `python_code/` to `arctic_charr_matcher/` (doesn't need to match package name afaik but just makes sense)
		- added `__init__.py` to `arctic_charr_matcher/`
		- fixed local imports to work with package (adding `__init__.py` makes the directory a package and messes the importing)
		- updated some of the placeholder info in `setup.py`, some info still needs to be added<br><br>
		- Still to do:
			- update more info in `setup.py` including testing info and dependencies
			- remove model training code and anything else unneeded for just matching **<-- currently working on**
			- create clear endpoints for use in the library
			- set up testing directory with some tests (can be inspired from `tester.py`)
			- follow rest of medium guide to create library