class Solution:
    def countOrders(self, n: int) -> int:
        MOD = 10**9 + 7
        ans = 1
        for i in range(1, n + 1):
            ans = (ans * i * (2 * i - 1)) % MOD
        return ans

def test():
    sol = Solution()
    assert sol.countOrders(1) == 1, "test 1 failed"
    assert sol.countOrders(2) == 6, "test 2 failed"
    assert sol.countOrders(3) == 90, "test 3 failed"
    print("✓ count-all-valid-pickup-and-delivery-options passed")

if __name__ == "__main__":
    test()
