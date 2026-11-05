class Solution:
    def maximumPossibleSize(self, nums: list[int]) -> int:
        ans = 0
        prev = 0
        for num in nums:
            if num >= prev:
                prev = num
                ans += 1
        return ans

def run_tests():
    s = Solution()
    assert s.maximumPossibleSize([4, 2, 5, 3, 5]) == 3
    assert s.maximumPossibleSize([1, 2, 3]) == 3
    print("All tests passed for make-array-non-decreasing")

if __name__ == '__main__':
    run_tests()
