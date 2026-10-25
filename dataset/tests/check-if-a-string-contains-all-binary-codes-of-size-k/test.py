class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        needed = 1 << k
        seen = {s[i:i + k] for i in range(len(s) - k + 1)}
        return len(seen) == needed

def test():
    sol = Solution()
    assert sol.hasAllCodes("00110110", 2) == True, "test 1 failed"
    assert sol.hasAllCodes("0110", 1) == True, "test 2 failed"
    assert sol.hasAllCodes("0110", 2) == False, "test 3 failed"
    print("✓ check-if-a-string-contains-all-binary-codes-of-size-k passed")

if __name__ == "__main__":
    test()
