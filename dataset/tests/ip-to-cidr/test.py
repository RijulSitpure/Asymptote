from typing import List

class Solution:
    def ipToCIDR(self, ip: str, n: int) -> List[str]:
        def ip_to_int(s: str) -> int:
            ans = 0
            for octet in s.split("."):
                ans = (ans << 8) + int(octet)
            return ans

        def int_to_ip(val: int) -> str:
            return f"{(val >> 24) & 255}.{(val >> 16) & 255}.{(val >> 8) & 255}.{val & 255}"

        cur = ip_to_int(ip)
        res = []

        while n > 0:
            lowbit = cur & -cur if cur > 0 else (1 << 32)
            while lowbit > n:
                lowbit //= 2
            mask = 32 - (lowbit.bit_length() - 1)
            res.append(f"{int_to_ip(cur)}/{mask}")
            cur += lowbit
            n -= lowbit

        return res

def test():
    sol = Solution()
    assert sol.ipToCIDR("255.0.0.7", 10) == ["255.0.0.7/32", "255.0.0.8/29", "255.0.0.16/32"], "test 1 failed"
    assert sol.ipToCIDR("0.0.0.0", 1) == ["0.0.0.0/32"], "test 2 failed"
    print("✓ ip-to-cidr passed")

if __name__ == "__main__":
    test()
