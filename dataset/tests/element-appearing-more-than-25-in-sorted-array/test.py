class Solution:
    def findSpecialInteger(self, arr: list[int]) -> int:
        span = len(arr) // 4
        for i in range(len(arr) - span):
            if arr[i] == arr[i + span]:
                return arr[i]
        return arr[0]

def test():
    sol = Solution()
    assert sol.findSpecialInteger([1,2,2,6,6,6,6,7,10]) == 6, "test 1 failed"
    assert sol.findSpecialInteger([1,1]) == 1, "test 2 failed"
    print("✓ element-appearing-more-than-25-in-sorted-array passed")

if __name__ == "__main__":
    test()
