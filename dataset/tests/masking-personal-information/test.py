class Solution:
    def maskPII(self, s: str) -> str:
        if '@' in s:
            name, domain = s.lower().split('@')
            return f"{name[0]}*****{name[-1]}@{domain}"
        digits = [ch for ch in s if ch.isdigit()]
        local = "".join(digits[-4:])
        n = len(digits)
        if n == 10:
            return f"***-***-{local}"
        prefix = '*' * (n - 10)
        return f"+{prefix}-***-***-{local}"

def test():
    sol = Solution()
    assert sol.maskPII("LeetCode@LeetCode.com") == "l*****e@leetcode.com", "test 1 failed"
    assert sol.maskPII("AB@qq.com") == "a*****b@qq.com", "test 2 failed"
    assert sol.maskPII("1(234)567-890") == "***-***-7890", "test 3 failed"
    print("✓ masking-personal-information passed")

if __name__ == "__main__":
    test()
