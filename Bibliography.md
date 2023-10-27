[[CS5199]]

1. Arctic charr wikipedia for intro
2. Original arctic charr re-id diss
3. UI diss, look at how UI diss cites [2] for citing this since it's unpublished
4. past, present, and future approaches using computer vision for animal re-id from camera trap data (background history for animal re-id)
	- lots of other sources will come from the sources here
5. Computer Assisted Photo-Identification of Humpback Whales (computer vision animal re-id) 1990
6. Computer Assisted Individual Identification of Sperm Whale Flukes (similar to above, published together) 1990
	- Potentially one more like 6 and 7 for seals, but showing just a couple examples is likely enough, that's what the UI lit review does
7. Grey seal re-ID (first feature engineering approach, also in 1990) (page 57 or 65 digitally)
8. Identification of Individual Sperm Whales By Wavelet Transform of the Trailing Edge of the Flukes (Second feature engineering approach and start of a series of papers on them) 1998
	- There are another 9 feature engineering approaches on the timeline from [4], should pick like 2 more to cover
9. feature engineering 2 - cheetahs 2001
10. feature engineering 3 - tigers 2009
11. Investopedia neural network article
12. Automated marine turtle photograph identification using artificial neural networks, with application to green turtles (First animal re-ID using deep learning)
13. CNN for chimps (2016)
14. Siamese network for chimps, lemurs, and golden monkeys (2018)
15. Similarity learning networks for animal individual re-identification: an ecological perspective (more info on different deep learning approaches, specifically similarity/siamese networks)
	- This should come later – after the DB and FE stuff
	-  probably want some source for a deep learning background before the DL example sources (maybe multiple here actually? Pretty important component to the diss so some expansion on different forms of neural networks could be good, can look at [5] for more sources here)
**Existing Tools**
16. Manta Matcher: feature engineering tool for matching manta rays from huge database of images
17. SIFT paper https://www.cs.ubc.ca/~lowe/papers/iccv99.pdf
18.  Wild-ID: Seems to be pretty good, need to read the paper to see what holes it has
	- https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/j.2041-210X.2012.00212.x
19. Discovery: photo-identification data management system
	- Seems to be more of a data management platform, doesn't use any fancy computer vision stuff. Think it just searches using photo metadata or something? Makes re-ID easier cause everything is better organized but still up to a human to do the work
	- http://cetaecoresearch.com/research-software-discovery.html
Probably enough for existing tools to cover 3
**Existing Arctic Charr Work**
20. U-Net paper https://arxiv.org/abs/1505.04597
21. Groth matcher (cited in [2])
22. whale shark re-ID with Groth (cited in [2])
23. Astroalign matcher (cited in [2])
24. Django site (cited in [3])
**Application Distribution**
25. python packaging documentation
26. PEX
27. Anaconda
28. PyInstaller
29. Docker


original tool https://doi.org/10.1098/rsos.201768
past present future https://doi.org/10.1111/2041-210X.13133