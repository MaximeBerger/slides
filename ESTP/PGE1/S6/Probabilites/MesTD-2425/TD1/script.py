import numpy as np
 
def lagrange(points, x):
	n = len(points)
	pols = np.zeros(n)
	for i in range(n):
		num = 1
		denom = 1
		for j in range(n):
			if i != j:
				num *= x - points[j]
				denom *= points[i] - points[j]
		pols[i] = num / denom
	return pols
 
def fonction (f, points, x) :
    n = [points]
    l = lagrange(points, x)
    return sum([f(xi)*l[i] for i, xi in points.enumerate()])
 
lagrange([2,1,5,8], 1)
x =1
def f(x):
	return x**2 + 2
fonction(f, [2,1,5,8], 1)


points = [2,1,5,8]
for i in range(len(points)):
    print(f" la {i}ième case du tableau est {points[i]}")