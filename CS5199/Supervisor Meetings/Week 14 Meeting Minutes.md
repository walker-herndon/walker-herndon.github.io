**December 12th**
- got matcher results working
	- use `unet_spots_patches.hdf5` model and `generate_spots_patched()`
	- spots now created correctly and matcher gives much better results
- created installation script which takes in a path, creates a venv, and installs the library
- still need to publish library so it can be downloaded from PyPI
- working on wrapper functions, what is the best way to have this work?
	- trickiest thing for me is figuring out the easiest way (from the user's perspective) to provide the list of images to match
<br>
- current implementation is reasonable, should have flexibility 