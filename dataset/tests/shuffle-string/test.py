class Solution:
    def restoreString(self, s: str, indices: list[int]) -> str:
        res = [None] * len(s)
        for ch, idx in zip(s, indices):
            res[idx] = ch
        return "".join(res)

def test():
    sol = Solution()
    assert sol.restoreString("codeleet", [4,5,6,7,0,2,1,3]) == "leetcode", "test 1 failed"
    assert sol.restoreString("abc", [0,1,2]) == "abc", "test 2 failed"
    print("✓ shuffle-string passed")

if __name__ == "__main__":
    test()
