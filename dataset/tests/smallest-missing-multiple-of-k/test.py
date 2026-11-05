class Solution:
    def findSmallestMissingMultiple(self, nums: list[int], k: int) -> int:
        present = set(nums)
        candidate = k
        while candidate in present:
            candidate += k
        return candidate

def run_tests():
    sol = Solution()
    assert sol.findSmallestMissingMultiple([3, 6, 12, 15], 3) == 9 # 3, 6 are present, 9 is missing
    assert sol.findSmallestMissingMultiple([1, 2, 4], 5) == 5 # 5 is missing
    assert sol.findSmallestMissingMultiple([10, 20, 30], 10) == 40
    print("All tests passed for 3718.")

if __name__ == "__main__":
    run_tests()