class Solution:
    def maxHeightOfTriangle(self, red: int, blue: int) -> int:
        def sim(r, b):
            h = 0
            need = 1
            while True:
                if h % 2 == 0:
                    if r < need: break
                    r -= need
                else:
                    if b < need: break
                    b -= need
                h += 1
                need += 1
            return h
            
        return max(sim(red, blue), sim(blue, red))