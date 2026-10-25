class Solution:
    def sumBase(self, n: int, k: int) -> int:
        ans = 0
        while n > 0:
            ans += n % k
            n //= k
        return ans

def test():
    sol = Solution()
    assert sol.sumBase(34, 6) == 9
    assert sol.sumBase(10, 10) == 1

if __name__ == '__main__':
    test()
