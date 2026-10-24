class Solution:
    def rotatedDigits(self, n: int) -> int:
        valid = {'0', '1', '8', '2', '5', '6', '9'}
        diff = {'2', '5', '6', '9'}
        count = 0
        for x in range(1, n + 1):
            s = str(x)
            if all(ch in valid for ch in s) and any(ch in diff for ch in s):
                count += 1
        return count

def test():
    sol = Solution()
    assert sol.rotatedDigits(10) == 4, "test 1 failed"
    assert sol.rotatedDigits(1) == 0, "test 2 failed"
    assert sol.rotatedDigits(2) == 1, "test 3 failed"
    print("✓ rotated-digits passed")

if __name__ == "__main__":
    test()
