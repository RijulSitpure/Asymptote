def countPalindromicSubarraySums(nums: list[int]) -> int:
    def is_palindrome(x: int) -> bool:
        s = str(x)
        return s == s[::-1]

    n = len(nums)
    ans = 0
    for i in range(n):
        cur = 0
        for j in range(i, n):
            cur += nums[j]
            if cur >= 0 and is_palindrome(cur):
                ans += 1
    return ans