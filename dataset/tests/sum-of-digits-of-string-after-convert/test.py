class Solution:
    def getLucky(self, s: str, k: int) -> int:
        s_digits = "".join(str(ord(c) - ord("a") + 1) for c in s)
        val = sum(int(ch) for ch in s_digits)
        for _ in range(k - 1):
            val = sum(int(ch) for ch in str(val))
        return val

def test_get_lucky():
    sol = Solution()
    assert sol.getLucky("iiii", 1) == 36
    assert sol.getLucky("leetcode", 2) == 6
    assert sol.getLucky("zbax", 2) == 8

