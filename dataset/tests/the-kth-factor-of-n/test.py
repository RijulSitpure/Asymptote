class Solution:
    def kthFactor(self, n: int, k: int) -> int:
        for i in range(1, n + 1):
            if n % i == 0:
                k -= 1
                if k == 0:
                    return i
        return -1

def test():
    sol = Solution()
    assert sol.kthFactor(12, 3) == 3, "test 1 failed"
    assert sol.kthFactor(7, 2) == 7, "test 2 failed"
    assert sol.kthFactor(4, 4) == -1, "test 3 failed"
    print("✓ the-kth-factor-of-n passed")

if __name__ == "__main__":
    test()
