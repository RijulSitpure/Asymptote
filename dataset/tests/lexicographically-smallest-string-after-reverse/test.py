class Solution:
    def smallestString(self, s: str) -> str:
        # Reverse any single substring at most once to make s lexicographically smallest
        best = s
        n = len(s)
        # Find first index i where reversing can help:
        for i in range(n):
            for j in range(i + 1, n):
                cand = s[:i] + s[i:j+1][::-1] + s[j+1:]
                if cand < best:
                    best = cand
        return best

def run_tests():
    sol = Solution()
    assert sol.smallestString("dcba") == "abcd" # reverse whole string
    assert sol.smallestString("a") == "a"
    assert sol.smallestString("bac") == "abc" # reverse [0..1]
    print("All tests passed for 3722.")

if __name__ == "__main__":
    run_tests()