class Solution:
    def countDistinctIntegers(self, nums: list[int]) -> int:
        seen = set()
        for x in nums:
            s = str(x).replace('0', '')
            val = int(s) if s else 0
            seen.add(val)
        return len(seen)

def run_tests():
    sol = Solution()
    assert sol.countDistinctIntegers([10, 100, 1]) == 1 # all become 1
    assert sol.countDistinctIntegers([102, 120, 21]) == 2 # 12, 12, 21 -> 2 distinct
    assert sol.countDistinctIntegers([0]) == 1
    print("All tests passed for 3747.")

if __name__ == "__main__":
    run_tests()