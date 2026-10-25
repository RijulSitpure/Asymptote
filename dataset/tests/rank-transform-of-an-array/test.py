class Solution:
    def arrayRankTransform(self, arr: list[int]) -> list[int]:
        ranks = {val: rank + 1 for rank, val in enumerate(sorted(set(arr)))}
        return [ranks[x] for x in arr]

def test():
    sol = Solution()
    assert sol.arrayRankTransform([40,10,20,30]) == [4,1,2,3], "test 1 failed"
    assert sol.arrayRankTransform([100,100,100]) == [1,1,1], "test 2 failed"
    assert sol.arrayRankTransform([37,12,28,9,100,56,80,5,12]) == [5,3,4,2,8,6,7,1,3], "test 3 failed"
    print("✓ rank-transform-of-an-array passed")

if __name__ == "__main__":
    test()
