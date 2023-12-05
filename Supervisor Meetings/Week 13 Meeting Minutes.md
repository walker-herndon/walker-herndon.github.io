**December 5th**
- further looked into problems with matching
	- some bugs with both astroalign and groth matchers
	- fixed bug with astroalign sometimes having multiple spots at the exact same point, which when drawing triangles caused some to have side lengths of 0 causing divide-by-zero errors which broke everything and made the match fail. Now removes duplicate spots before doing any matching
		- actually same bug exists in groth matcher, need to fix there too
	- groth matcher has some other issue sometimes causing the match to fail when it seems like it shouldn't
		- one issue is another divide-by-zero (may be caused by same thing as astroalign one with duplicate spots)
		- another is that it finds false negatives after seeming like it is matching at first
			- matcher has this loop where it finds matches in triangles, then runs again only on the matched set to narrow down matches (fuzzy on details but this is the high level of it), on the first round it will find tons of matches on a photo that is an actual match, but then the second round it finds only 1 and then results in 0 matches at the end. Goes something like 37500 --> 1 --> 0 where others go more like 7000 --> 20 --> 1 when they shouldn't match at all. When I comment out the code that makes it loop and match again the results seem better? But definitely needs more investigation before leaving it like this as it could have a pretty significant affect on results.
	- another strange bug exists that when running the matcher in jupyter notebook one of the matches often crashes on the first run due to some divide-by-zero, and the results don't seem to be exactly right, then when running immediately again it works fine and gives better results. Something wrong with the caching or something? Results should always be consistent.
	- regardless of bugs, astroalign is working now and seems to give better results than groth in general, especially the top-5 results.
- expanded documentation for installation
	- now has lots of detail on working with virtual environments and links to proper venv documentation for more info
	- mentions you need python and pip to start with and explains how to check you have them
	- gives more detailed explanation for using in jupyter notebook
	- still want to streamline the installation process with some sort of install script if possible and eventually potentially publish library to pip for easy access?
- working on building out wrapper functions for the matching
	- made some utility functions for converting from an image path to the key format used by the tool, or converting the key back to the image path (might not be needed)
	- need to figure out how exactly I want to approach wrapping the other functionality
		- some of this depends on exactly what I find the best workflow to be once the matcher algorithms are in a good place