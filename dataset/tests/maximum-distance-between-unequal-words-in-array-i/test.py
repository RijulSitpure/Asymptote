from typing import List

class Solution:
    def maxDistance(self, words: List[str]) -> int:
        n = len(words)
        max_dist = 0
        for i in range(n - 1, -1, -1):
            if words[i] != words[0]:
                max_dist = max(max_dist, i)
                break
        for i in range(n):
            if words[i] != words[n - 1]:
                max_dist = max(max_dist, n - 1 - i)
                break
        return max_dist

def run_tests():
    sol = Solution()
    assert sol.maxDistance(["cat", "dog", "cat", "bird"]) == 3 # 'cat' at 0 and 'bird' at 3
    assert sol.maxDistance(["a", "a", "a"]) == 0
    assert sol.maxDistance(["x", "y"]) == 1
    print("All tests passed for 3696.")

if __name__ == "__main__":
    run_tests()
