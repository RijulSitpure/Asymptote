class Solution:
    def maxValue(self, n: int, index: int, maxSum: int) -> int:
        def calc(count: int, val: int) -> int:
            if count == 0:
                return 0
            if val >= count:
                return (2 * val - count + 1) * count // 2
            return val * (val + 1) // 2 + (count - val)

        low, high = 1, maxSum
        ans = 1
        while low <= high:
            mid = (low + high) // 2
            total = mid + calc(index, mid - 1) + calc(n - 1 - index, mid - 1)
            if total <= maxSum:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans

def test():
    sol = Solution()
    assert sol.maxValue(4, 2, 6) == 2
    assert sol.maxValue(6, 1, 10) == 3

if __name__ == '__main__':
    test()
