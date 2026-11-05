class Solution:
    def maxDistance(self, words: list[str]) -> int:
        n = len(words)
        max_dist = 0
        first = words[0]
        last = words[-1]
        for i in range(n):
            if words[i] != first:
                max_dist = max(max_dist, i)
            if words[i] != last:
                max_dist = max(max_dist, n - 1 - i)
        return max_dist

def run_tests():
    sol = Solution()
    assert sol.maxDistance(["apple", "banana", "apple"]) == 1 # 0 to 1 or 1 to 2
    assert sol.maxDistance(["a", "b", "c", "d"]) == 3 # 0 to 3
    assert sol.maxDistance(["a", "a", "a"]) == 0
    print("All tests passed for 3706.")

if __name__ == "__main__":
    run_tests()