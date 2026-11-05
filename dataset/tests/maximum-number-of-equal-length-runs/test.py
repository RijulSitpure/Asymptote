from collections import Counter

class Solution:
    def maxEqualLengthRuns(self, s: str) -> int:
        if not s:
            return 0
        
        runs = []
        cur_len = 1
        for i in range(1, len(s)):
            if s[i] == s[i - 1]:
                cur_len += 1
            else:
                runs.append(cur_len)
                cur_len = 1
        runs.append(cur_len)
        
        counts = Counter(runs)
        return max(counts.values())

def run_tests():
    sol = Solution()
    assert sol.maxEqualLengthRuns("aabbcc") == 3 # runs of length 2 appear 3 times
    assert sol.maxEqualLengthRuns("aaabbbcccc") == 2 # length 3 appears 2 times
    assert sol.maxEqualLengthRuns("a") == 1
    print("All tests passed for 3773.")

if __name__ == "__main__":
    run_tests()
