class Solution:
    def maxDistinctStartSubstrings(self, s: str) -> int:
        # Maximum number of non-empty substrings with distinct starting characters
        # Each distinct character appearing in s can serve as the unique start of at most one chosen substring
        return len(set(s))

def run_tests():
    sol = Solution()
    assert sol.maxDistinctStartSubstrings("abacaba") == 3 # 'a', 'b', 'c'
    assert sol.maxDistinctStartSubstrings("aaaa") == 1
    assert sol.maxDistinctStartSubstrings("xyz") == 3
    print("All tests passed for 3760.")

if __name__ == "__main__":
    run_tests()