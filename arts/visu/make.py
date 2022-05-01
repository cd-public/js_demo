# make.py
from PIL import Image
import numpy as np
import seaborn as sns
import random

# perceptual uniform cmaps from matplotlib and seaborn
# I'll want to order these cool to warm at some point I think
CMPS = ["rocket", "mako", "flare", "crest", "viridis", "plasma", "inferno", "magma", "cividis"]

PIXS = 0x40

def save(name,pxls):
	aray = np.array(pxls, dtype=np.uint8)
	imag = Image.fromarray(aray)
	imag.save(name + ".png")
	
def savs(name,pxss):
	for i in range(len(CMPS)):
		save(CMPS[i][:4]+"/"+name,pxss[i])
		
# hex box
def hxbx(name, hval):
	colr = (int(hval[-6:-4],16), int(hval[-4:-2],16), int(hval[-2:],16))
	pxls = [[colr for _ in range(PIXS)] for _ in range(PIXS)]
	save(name,pxls)
	

def empt():
	save("empt",[[(0,0,0,0) for _ in range(PIXS)] for _ in range(PIXS)])
	
	
# map color maps from value array for all cmaps
def mcmp(vals):
	pxss = []
	for i in range(len(CMPS)):
		cmap = sns.color_palette(CMPS[i], as_cmap=True)
		pxls = [[[0x100 * c for c in cmap(vals[i][j])[:3]] for i in range(PIXS)] for j in range(PIXS)]
		print(pxls) # seemingly a load-bearing print
		pxss.append(pxls)
	return pxss


# we do distance squared to avoid a square root
def dist(pnt,ref):
	#ds = [print(abs(pnt[i]-ref[i]), abs((0x100+pnt[i])-ref[i])%0x100) for i in [0,1]]
	ds = [pnt[i]-ref[i] for i in [0,1]]
	return sum([d * d for d in ds]) 

# creates tiles with regions of contiguous color
def tile():

	# nearest
	def near(x,y):
		i, d = 0, dist(xsys[0],[x,y])
		for indx in range(1,PIXS):
			newd = dist(xsys[indx],[x,y])
			if newd < d:
				i, d = indx, newd
		return i

	xsys = [random.randint(0,PIXS) for _ in range(2 * PIXS * PIXS.bit_length())]
	xsys = sorted(xsys[:PIXS]) + xsys[PIXS:] # break up center clumping
	xsys = [xsys[i::PIXS] for i in range(PIXS)]
	clrs = [random.randint(0,0x100) for _ in range(PIXS)] # associate color with point
	vals = [[clrs[near(x,y)] for x in range(PIXS)] for y in range(PIXS)]
	savs("tile",mcmp(vals))

# entr exit together
def entr():
	# vals = [[dist([x,y],[PIXS // 2, PIXS // 2]) ** .5 for x in range(PIXS)] for y in range(PIXS)]
	vals = [[(abs(PIXS // 2 - x) + abs(PIXS // 2 - y)) // 0x8 * 0x800 // PIXS for x in range(PIXS)] for y in range(PIXS)]
	savs("entr",mcmp(vals))
	vals = [[0x100 - n for n in innr] for innr in vals]
	savs("exit",mcmp(vals))

def plyr():
	numf = 0x20 # number of frames
	for i in range(len(CMPS)):
		cmap = sns.color_palette(CMPS[i], as_cmap=True)
		frms = [[[dist([i,j],[PIXS//2,PIXS//2]) * fram // numf * PIXS // 0x100 for i in range(PIXS)] for j in range(PIXS)] for fram in range(numf)]
		frms = [[[[0x100 * c for c in cmap(val)][:3] for val in row] for row in fram] for fram in frms]
		arrs = [np.array(fram, dtype=np.uint8) for fram in frms]
		imgs = [Image.fromarray(aray) for aray in arrs]
		imag = imgs[numf//2]
		imgs = imgs[numf//2:] + imgs[:numf//2:-1]
		imag.save(CMPS[i][:4]+"/plyr.gif", save_all=True, append_images=imgs, loop=0)
		
empt()