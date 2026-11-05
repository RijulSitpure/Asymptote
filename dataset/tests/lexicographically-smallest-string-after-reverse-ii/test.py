class Solution:
    def smallestStringII(self, s: str) -> str:
        # Lexicographically smallest string after at most one reversal
        best = s
        n = len(s)
        # Find first index i that is greater than min(s[i:])
        for i in range(n):
            min_c = min(s[i:])
            if s[i] > min_c:
                # Find all positions j >= i with s[j] == min_c
                for j in range(i, n):
                    if s[j] == min_c:
                        cand = s[:i] + s[i:j+1][::-1] + s[j+1:]
                        if cand < best:
                            best = cand
                return best
        return best

def run_tests():
    sol = Solution()
    assert sol.smallestStringII("dcba") == "abcd"
    assert sol.smallestStringII("abba") == "aabb"
    assert sol.smallestStringII("a") == "a"
    print("All tests passed for 3735.")

if __name__ == "__main__":
    run_tests()