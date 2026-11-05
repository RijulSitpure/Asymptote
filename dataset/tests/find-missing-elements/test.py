class Solution:
    def findMissingElements(self, nums: list[int], m: int) -> list[int]:
        present = set(nums)
        return [x for x in range(1, m + 1) if x not in present]

def run_tests():
    sol = Solution()
    assert sol.findMissingElements([1, 4, 5], 5) == [2, 3]
    assert sol.findMissingElements([1, 2, 3], 3) == []
    assert sol.findMissingElements([], 3) == [1, 2, 3]
    print("All tests passed for 3731.")

if __name__ == "__main__":
    run_tests()