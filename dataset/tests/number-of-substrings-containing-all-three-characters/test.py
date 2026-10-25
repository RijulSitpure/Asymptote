class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        last = {"a": -1, "b": -1, "c": -1}
        ans = 0
        for i, ch in enumerate(s):
            last[ch] = i
            ans += 1 + min(last["a"], last["b"], last["c"])
        return ans

def test():
    sol = Solution()
    assert sol.numberOfSubstrings("abcabc") == 10, "test 1 failed"
    assert sol.numberOfSubstrings("aaacb") == 3, "test 2 failed"
    assert sol.numberOfSubstrings("abc") == 1, "test 3 failed"
    print("✓ number-of-substrings-containing-all-three-characters passed")

if __name__ == "__main__":
    test()
