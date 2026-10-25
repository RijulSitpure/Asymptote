class Solution:
    def largestAltitude(self, gain: list[int]) -> int:
        curr = 0
        mx = 0
        for g in gain:
            curr += g
            if curr > mx:
                mx = curr
        return mx

def test():
    sol = Solution()
    assert sol.largestAltitude([-5,1,5,0,-7]) == 1
    assert sol.largestAltitude([-4,-3,-2,-1,4,3,2]) == 0

    print("✓ find-the-highest-altitude passed")

if __name__ == '__main__':
    test()
