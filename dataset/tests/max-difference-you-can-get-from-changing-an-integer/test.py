class Solution:
    def maxDiff(self, num: int) -> int:
        s = str(num)
        # Maximize: replace first non-9 digit with 9
        max_s = s
        for ch in s:
            if ch != "9":
                max_s = s.replace(ch, "9")
                break
        # Minimize: if first digit > 1, replace with 1; else find first digit > 1 and not 0, replace with 0
        min_s = s
        if s[0] != "1":
            min_s = s.replace(s[0], "1")
        else:
            for ch in s[1:]:
                if ch != "0" and ch != "1":
                    min_s = s.replace(ch, "0")
                    break
        return int(max_s) - int(min_s)

def test():
    sol = Solution()
    assert sol.maxDiff(555) == 888, "test 1 failed"
    assert sol.maxDiff(9) == 8, "test 2 failed"
    assert sol.maxDiff(123456) == 820000, "test 3 failed"
    print("✓ max-difference-you-can-get-from-changing-an-integer passed")

if __name__ == "__main__":
    test()
