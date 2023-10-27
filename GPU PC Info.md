[[CS5199]]

On eduroam run:
```zsh
ssh wjh1@gpu-pc-12.cs.st-andrews.ac.uk -i .ssh/cs_key
```

Otherwise need to use ssh jump service somehow? 
https://wiki.cs.st-andrews.ac.uk/index.php?title=SSH_Jump_Service

From CS Support:

You have been allocated the following GPU PC:  
**gpu-pc-12**.cs.st-andrews.ac.uk  
  
Please confirm that you can login using your SSH key.  
  
See the wiki for guidance on running GPU-accelerated workloads:  
https://wiki.cs.st-andrews.ac.uk/index.php?title=Lab_PCs#GPU_PCs  
  
GPU-accelerated workloads should be run in Docker using the pre-built NGC containers, although GPU-accelerated PyTorch can be run in a venv (as discussed in the link above). See:  
https://wiki.cs.st-andrews.ac.uk/index.php?title=Docker  
  
The GPU PCs do not mount your CS home directory as they only have a local home directory. You will need to ensure that you backup your work, either by copying to your CS network home directory on the teaching servers and/or copying to OneDrive. The easiest way to backup code to your CS network home directory is to use git:  
https://wiki.cs.st-andrews.ac.uk/index.php?title=Version_Control_Examples#Creating_a_Git_repository_for_remote_access  
  
Your home directory on the GPU PC is on the root volume SSD with just over 400GB of free capacity.   
  
There is also a HDD in the system with **3.4TB** of free space. The path /data/**wjh1** is on the HDD.