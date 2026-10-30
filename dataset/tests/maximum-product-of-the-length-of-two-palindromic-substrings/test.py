class Solution:
    def maxProduct(self, s: str) -> int:
        n = len(s)
        span = [0] * n
        l, r = 0, -1
        for i in range(n):
            k = 1 if i > r else min(span[l + r - i], r - i + 1)
            while 0 <= i - k and i + k < n and s[i - k] == s[i + k]:
                k += 1
            span[i] = k
            k -= 1
            if i + k > r:
                l = i - k
                r = i + k
                
        left = [1] * n
        right = [1] * n
        
        for i in range(n):
            left[i + span[i] - 1] = max(left[i + span[i] - 1], 2 * span[i] - 1)
            right[i - span[i] + 1] = max(right[i - span[i] + 1], 2 * span[i] - 1)
            
        for i in range(n - 2, -1, -1):
            left[i] = max(left[i], left[i + 1] - 2)
        for i in range(1, n):
            left[i] = max(left[i], left[i - 1])
            
        for i in range(1, n):
            right[i] = max(right[i], right[i - 1] - 2)
        for i in range(n - 2, -1, -1):
            right[i] = max(right[i], right[i + 1])
            
        ans = 0
        for i in range(n - 1):
            ans = max(ans, left[i] * right[i + 1])
        return ans

def test_max_product():
    sol = Solution()
    assert sol.maxProduct("ababbb") == 9
    assert sol.maxProduct("zaaaxbbby") == 9

