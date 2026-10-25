class Solution:
    def findBuildings(self, heights: list[int]) -> list[int]:
        res = []
        max_h = 0
        for i in range(len(heights) - 1, -1, -1):
            if heights[i] > max_h:
                res.append(i)
                max_h = heights[i]
        return res[::-1]

def test():
    sol = Solution()
    assert sol.findBuildings([4,2,3,1]) == [0,2,3]
    assert sol.findBuildings([4,3,2,1]) == [0,1,2,3]
    assert sol.findBuildings([1,3,2,4]) == [3]

    print("✓ buildings-with-an-ocean-view passed")

if __name__ == '__main__':
    test()
