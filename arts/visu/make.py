# make.py
from PIL import Image
import numpy as np
import seaborn as sns
import random

# perceptual uniform cmaps from matplotlib and seaborn
# I'll want to order these cool to warm at some point I think
CMPS = ["rocket", "mako", "flare", "crest", "viridis", "plasma", "inferno", "magma", "cividis"]

PIXS = 64

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
	
# map color maps from value array for all cmaps
def mcmp(vals):
	pxss = []
	for i in range(len(CMPS)):
		cmap = sns.color_palette(CMPS[i], as_cmap=True)
		pxls = [[[255 * c for c in cmap(vals[i][j])] for i in range(PIXS)] for j in range(PIXS)]
		pxss.append(pxls)
	return pxss
		
# creates tiles with regions of contiguous color
def tile():
	# we do distance squared to avoid a square root
	# we also wrap around
	def dist(pnt,ref):
		#ds = [print(abs(pnt[i]-ref[i]), abs((255+pnt[i])-ref[i])%255) for i in [0,1]]
		ds = [pnt[i]-ref[i] for i in [0,1]]
		return sum([d * d for d in ds]) 
	# nearest
	def near(x,y):
		i, d = 0, dist(xsys[0],[x,y])
		for indx in range(1,PIXS):
			newd = dist(xsys[indx],[x,y])
			if newd < d:
				i, d = indx, newd
		return i

	xsys = [random.randint(0,64) for _ in range(2 * PIXS * PIXS.bit_length())]
	xsys = sorted(xsys[:PIXS]) + xsys[PIXS:] # break up center clumping
	xsys = [xsys[i::PIXS] for i in range(PIXS)]
	clrs = [random.randint(0,255) for _ in range(PIXS)] # associate color with point
	vals = [[clrs[near(x,y)] for x in range(PIXS)] for y in range(PIXS)]
	savs("tile",mcmp(vals))

# hxbx("blue","00bfb2")
# hxbx("blak","000000")
tile()
