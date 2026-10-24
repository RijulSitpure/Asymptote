class Solution:
    def smallestRepunitDivByK(self, k: int) -> int:
        if k % 2 == 0 or k % 5 == 0:
            return -1
        rem = 0
        for length in range(1, k + 1):
            rem = (rem * 10 + 1) % k
            if rem == 0:
                return length
        return -1

def test():
    sol = Solution()
    assert sol.smallestRepunitDivByK(1) == 1, "test 1 failed"
    assert sol.smallestRepunitDivByK(2) == -1, "test 2 failed"
    assert sol.smallestRepunitDivByK(3) == 3, "test 3 failed"
    print("✓ smallest-integer-divisible-by-k passed")

if __name__ == "__main__":
    test()
