class Solution:
    def canConvertString(self, s: str, t: str, k: int) -> bool:
        if len(s) != len(t):
            return False
        counts = [0] * 26
        for c1, c2 in zip(s, t):
            diff = (ord(c2) - ord(c1)) % 26
            if diff > 0:
                needed_move = diff + 26 * counts[diff]
                if needed_move > k:
                    return False
                counts[diff] += 1
        return True

def test():
    sol = Solution()
    assert sol.canConvertString("input", "ouput", 9) == True, "test 1 failed"
    assert sol.canConvertString("abc", "bcd", 10) == False, "test 2 failed"
    assert sol.canConvertString("aab", "bbb", 27) == True, "test 3 failed"
    print("✓ can-convert-string-in-k-moves passed")

if __name__ == "__main__":
    test()
