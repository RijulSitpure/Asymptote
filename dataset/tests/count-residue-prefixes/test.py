class Solution:
    def countResiduePrefixes(self, nums: list[int], k: int) -> int:
        pref_sum = 0
        count = 0
        for x in nums:
            pref_sum = (pref_sum + x) % k
            if pref_sum == (x % k):
                count += 1
        return count

def run_tests():
    sol = Solution()
    # nums = [5, 2, 8], k = 3
    # i=0: pref=2, x%3=2 -> match (count=1)
    # i=1: pref=(2+2)%3=1, x%3=2 -> no match
    # i=2: pref=(1+8)%3=0, x%3=2 -> no match
    assert sol.countResiduePrefixes([5, 2, 8], 3) == 1
    assert sol.countResiduePrefixes([3, 6, 9], 3) == 3
    print("All tests passed for 3803.")

if __name__ == "__main__":
    run_tests()
